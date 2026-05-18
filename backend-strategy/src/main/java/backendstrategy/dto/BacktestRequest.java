package backendstrategy.dto;

// zwykly dto czyli worek na dane ktore przylatuja do nas z frontendu
import java.util.List;

public class BacktestRequest {

    public BacktestRequest() {}


    private String strategy;

    private int rsiPeriod;
    private int smaFast;
    private int smaSlow;

    private int macdFast;
    private int macdSlow;
    private int macdSignal;

    private List<CandleDto> candles;

    private double commissionPercent;
    private double stopLossPercent;
    private double takeProfitPercent;

    public String getStrategy() {
        return strategy;
    }

    public int getRsiPeriod() {
        return rsiPeriod;
    }

    public int getSmaFast() {
        return smaFast;
    }

    public int getSmaSlow() {
        return smaSlow;
    }

    public int getMacdFast() {
        return macdFast;
    }

    public int getMacdSlow() {
        return macdSlow;
    }

    public int getMacdSignal() {
        return macdSignal;
    }

    public List<CandleDto> getCandles() {
        return candles;
    }

    public double getCommissionPercent() {
        return commissionPercent;
    }

    public double getStopLossPercent() {
        return stopLossPercent;
    }

    public double getTakeProfitPercent() {
        return takeProfitPercent;
    }
}
