package backendstrategy.builder;

import backendstrategy.model.BackTestResult;
import backendstrategy.model.Trade;
import java.util.List;

// zwykly builder zeby tworzenie obiektu z wynikami nie wygladalo jak potwor z setkami parametrow w konstruktorze
public class BackTestResultBuilder {
    private double roi;
    private double maxDrawdown;
    private double winRate;
    private double profitFactor;
    private List<Double> equityCurve;
    private List<Trade> tradeHistory;

    public BackTestResultBuilder setRoi(double roi) {
        this.roi = roi;
        return this;
    }

    public BackTestResultBuilder setMaxDrawdown(double maxDrawdown) {
        this.maxDrawdown = maxDrawdown;
        return this;
    }

    public BackTestResultBuilder setWinRate(double winRate) {
        this.winRate = winRate;
        return this;
    }

    public BackTestResultBuilder setProfitFactor(double profitFactor) {
        this.profitFactor = profitFactor;
        return this;
    }

    public BackTestResultBuilder setEquityCurve(List<Double> equityCurve) {
        this.equityCurve = equityCurve;
        return this;
    }

    public BackTestResultBuilder setTradeHistory(List<Trade> tradeHistory) {
        this.tradeHistory = tradeHistory;
        return this;
    }

    public BackTestResult build() {
        return new BackTestResult(roi, maxDrawdown, winRate, profitFactor, equityCurve, tradeHistory);
    }
}
