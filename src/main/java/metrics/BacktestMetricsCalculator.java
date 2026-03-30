package metrics;

import model.BackTestResult;
import model.Trade;

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

        return new BackTestResult(
                roi,
                maxDrawdown,
                winRate,
                profitFactor,
                equity,
                trades
        );
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