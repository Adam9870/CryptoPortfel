package backendstrategy.metrics;

// klasa wyciagnieta osobno zeby liczyc procenty i statystyki bez zasmiecania silnika
import backendstrategy.model.BackTestResult;
import backendstrategy.model.Trade;

import java.util.List;

public class BacktestMetricsCalculator {

    public static BackTestResult calculate(
            double initial,
            double finalBalance,
            List<Double> equity,
            List<Trade> trades
    ) {

        double roi = (finalBalance - initial) / initial * 100;

        double maxDrawdown = calculateMaxDrawdown(equity);

        double winRate = 0;
        double profitFactor = 1;
        
        int winningTrades = 0;
        int totalClosedTrades = 0;
        double grossProfit = 0;
        double grossLoss = 0;
        
        for (int i = 0; i < trades.size() - 1; i += 2) {
            Trade entry = trades.get(i);
            Trade exit = trades.get(i+1);
            if (entry.getType().equals("BUY") && exit.getType().startsWith("SELL")) {
                totalClosedTrades++;
                double diff = exit.getPrice() - entry.getPrice();
                if (diff > 0) {
                    winningTrades++;
                    grossProfit += diff;
                } else if (diff < 0) {
                    grossLoss += Math.abs(diff);
                }
            }
        }
        
        if (totalClosedTrades > 0) {
            winRate = ((double) winningTrades / totalClosedTrades) * 100;
        }
        
        if (grossLoss > 0) {
            profitFactor = grossProfit / grossLoss;
        } else if (grossProfit > 0) {
            profitFactor = 999.0;
        }

        return new backendstrategy.builder.BackTestResultBuilder()
                .setRoi(roi)
                .setMaxDrawdown(maxDrawdown)
                .setWinRate(winRate)
                .setProfitFactor(profitFactor)
                .setEquityCurve(equity)
                .setTradeHistory(trades)
                .build();
    }

    private static double calculateMaxDrawdown(List<Double> equity) {

        double peak = equity.get(0);
        double maxDd = 0;

        for (double val : equity) {

            if (val > peak)
                peak = val;

            double dd = (peak - val) / peak;

            if (dd > maxDd)
                maxDd = dd;
        }

        return maxDd * 100;
    }
}
