package engine;

import indicator.Indicator;
import metrics.BacktestMetricsCalculator;
import model.Candle;
import model.Signal;
import model.StrategyContext;
import model.Trade;
import strategy.TradingStrategy;
import model.BackTestResult;

import java.util.ArrayList;
import java.util.List;

public class BacktestEngine {

    private double initialBalance = 10000.0;

    public BackTestResult run(
            List<Candle> candles,
            List<Indicator> indicators,
            TradingStrategy strategy
    ) {

        // 1. Liczenie wskaźników
        for (Indicator ind : indicators) {
            ind.calculate(candles);
        }

        double balance = initialBalance;
        double position = 0; // ile aktywa posiadamy

        List<Double> equityCurve = new ArrayList<>();
        List<Trade> trades = new ArrayList<>();

        boolean inPosition = false;
        double entryPrice = 0;

        // 2. Główna pętla
        for (int i = 0; i < candles.size(); i++) {

            StrategyContext ctx = new StrategyContext(candles, indicators, i);

            Signal signal = strategy.generateSignal(ctx);

            double price = candles.get(i).getClose();

            // BUY
            if (signal == Signal.BUY && !inPosition) {

                position = balance / price;
                entryPrice = price;
                balance = 0;

                inPosition = true;

                trades.add(new Trade("BUY", price, i));
            }

            // SELL
            else if (signal == Signal.SELL && inPosition) {

                balance = position * price;
                position = 0;

                inPosition = false;

                trades.add(new Trade("SELL", price, i));
            }

            // wartość konta
            double equity = balance;

            if (inPosition) {
                equity = position * price;
            }

            equityCurve.add(equity);
        }

        // zamknięcie pozycji na końcu
        if (inPosition) {
            double lastPrice = candles.get(candles.size() - 1).getClose();
            balance = position * lastPrice;
        }

        // 3. Metryki
        return BacktestMetricsCalculator.calculate(
                initialBalance,
                balance,
                equityCurve,
                trades
        );
    }
}