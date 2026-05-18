package backendstrategy.engine;

import backendstrategy.indicator.Indicator;
import backendstrategy.metrics.BacktestMetricsCalculator;
import backendstrategy.model.Candle;
import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;
import backendstrategy.model.Trade;
import backendstrategy.strategy.TradingStrategy;
import backendstrategy.model.BackTestResult;

import java.util.ArrayList;
import java.util.List;

public class BacktestEngine {

    private double initialBalance = 10000.0;

    public BackTestResult run(
            List<Candle> candles,
            List<Indicator> indicators,
            TradingStrategy strategy,
            double commissionPercent,
            double stopLossPercent,
            double takeProfitPercent
    ) {

        for (Indicator ind : indicators) {
            ind.calculate(candles);
        }

        double balance = initialBalance;
        double position = 0;

        List<Double> equityCurve = new ArrayList<>();
        List<Trade> trades = new ArrayList<>();

        boolean inPosition = false;
        double entryPrice = 0;

        // glowna petla silnika iterujemy po swiecach i sprawdzamy czy strategia generuje sygnal
        for (int i = 0; i < candles.size(); i++) {

            StrategyContext ctx = new StrategyContext(candles, indicators, i);

            Signal signal = strategy.generateSignal(ctx);

            double price = candles.get(i).getClose();

            if (inPosition) {
                double currentHigh = candles.get(i).getHigh();
                double currentLow = candles.get(i).getLow();

                boolean slHit = stopLossPercent > 0 && currentLow <= entryPrice * (1 - stopLossPercent / 100);
                boolean tpHit = takeProfitPercent > 0 && currentHigh >= entryPrice * (1 + takeProfitPercent / 100);

                if (slHit || tpHit) {
                    double exitPrice = slHit ? entryPrice * (1 - stopLossPercent / 100) : entryPrice * (1 + takeProfitPercent / 100);
                    double gross = position * exitPrice;
                    double fee = gross * (commissionPercent / 100);
                    balance = gross - fee;
                    position = 0;
                    inPosition = false;

                    String reason = slHit ? "SELL (SL)" : "SELL (TP)";
                    trades.add(new Trade(reason, exitPrice, i));
                    backendstrategy.observer.TradeNotifier.getInstance().notifyTradeExecuted(reason, exitPrice, i);
                    
                    signal = Signal.HOLD; // Prevent immediate re-entry/double-exit in the same candle
                }
            }

            if (signal == Signal.BUY && !inPosition) {
                double fee = balance * (commissionPercent / 100);
                position = (balance - fee) / price;
                entryPrice = price;
                balance = 0;

                inPosition = true;

                trades.add(new Trade("BUY", price, i));
                backendstrategy.observer.TradeNotifier.getInstance().notifyTradeExecuted("BUY", price, i);
            }

            else if (signal == Signal.SELL && inPosition) {

                double gross = position * price;
                double fee = gross * (commissionPercent / 100);
                balance = gross - fee;
                position = 0;

                inPosition = false;

                trades.add(new Trade("SELL", price, i));
                backendstrategy.observer.TradeNotifier.getInstance().notifyTradeExecuted("SELL", price, i);
            }

            double equity = balance;

            if (inPosition) {
                equity = position * price;
            }

            equityCurve.add(equity);
        }

        if (inPosition) {
            double lastPrice = candles.get(candles.size() - 1).getClose();
            balance = position * lastPrice;
        }

        backendstrategy.observer.TradeNotifier.getInstance().notifyBacktestCompleted(balance);

        return BacktestMetricsCalculator.calculate(
                initialBalance,
                balance,
                equityCurve,
                trades
        );
    }
}
