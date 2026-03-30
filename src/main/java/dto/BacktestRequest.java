package dto;

import java.util.List;

public class BacktestRequest {

    private String strategy;

    // parametry strategii
    private int rsiPeriod;
    private int smaFast;
    private int smaSlow;

    private int macdFast;
    private int macdSlow;
    private int macdSignal;

    // dane świec
    private List<CandleDto> candles;

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
}