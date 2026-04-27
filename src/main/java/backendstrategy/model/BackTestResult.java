package backendstrategy.model;

import java.util.List;

public class BackTestResult {

    private double roi;
    private double maxDrawdown;
    private double winRate;
    private double profitFactor;

    private List<Double> equityCurve;
    private List<Trade> tradeHistory;

    public BackTestResult(
            double roi,
            double maxDrawdown,
            double winRate,
            double profitFactor,
            List<Double> equityCurve,
            List<Trade> tradeHistory
    ) {
        this.roi = roi;
        this.maxDrawdown = maxDrawdown;
        this.winRate = winRate;
        this.profitFactor = profitFactor;
        this.equityCurve = equityCurve;
        this.tradeHistory = tradeHistory;
    }

    public double getRoi() {
        return roi;
    }

    public double getMaxDrawdown() {
        return maxDrawdown;
    }

    public double getWinRate() {
        return winRate;
    }

    public double getProfitFactor() {
        return profitFactor;
    }

    public List<Double> getEquityCurve() {
        return equityCurve;
    }

    public List<Trade> getTradeHistory() {
        return tradeHistory;
    }
}
