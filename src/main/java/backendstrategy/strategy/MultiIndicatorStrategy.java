package backendstrategy.strategy;

import backendstrategy.indicator.momentum.MACD;
import backendstrategy.indicator.momentum.RSI;
import backendstrategy.indicator.trend.HMA;
import backendstrategy.model.Candle;
import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

import java.util.List;

public class MultiIndicatorStrategy implements TradingStrategy {

    private HMA hma;
    private RSI rsi;
    private MACD macd;

    //logika
    //BUY gdy
    //price > HMA
    //RSI < 40
    //MACD cross up
    //
    //SELL gdy
    //price < HMA
    //RSI > 60
    //MACD cross down

    public MultiIndicatorStrategy(HMA hma, RSI rsi, MACD macd) {
        this.hma = hma;
        this.rsi = rsi;
        this.macd = macd;
    }

    @Override
    public Signal generateSignal(StrategyContext ctx) {

        int i = ctx.getIndex();

        if (i == 0)
            return Signal.HOLD;

        List<Candle> candles = ctx.getCandles();

        double price = candles.get(i).getClose();

        Double hmaValue = hma.getValues().get(i);
        Double rsiValue = rsi.getValues().get(i);

        if (hmaValue == null || rsiValue == null)
            return Signal.HOLD;

        Double macdPrev = macd.getMacdLine().get(i - 1);
        Double macdNow = macd.getMacdLine().get(i);

        Double signalPrev = macd.getSignalLine().get(i - 1);
        Double signalNow = macd.getSignalLine().get(i);

        if (macdPrev == null || macdNow == null || signalPrev == null || signalNow == null)
            return Signal.HOLD;

        boolean macdCrossUp = macdPrev < signalPrev && macdNow > signalNow;
        boolean macdCrossDown = macdPrev > signalPrev && macdNow < signalNow;

        if (price > hmaValue && rsiValue < 40 && macdCrossUp)
            return Signal.BUY;

        if (price < hmaValue && rsiValue > 60 && macdCrossDown)
            return Signal.SELL;

        return Signal.HOLD;
    }
}
