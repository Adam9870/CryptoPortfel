package backendstrategy.strategy;

import backendstrategy.indicator.momentum.MACD;
import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

public class MACDStrategy implements TradingStrategy {

    private MACD macd;

    public MACDStrategy(MACD macd) {
        this.macd = macd;
    }

    @Override
    public Signal generateSignal(StrategyContext ctx) {

        int i = ctx.getIndex();

        if (i == 0)
            return Signal.HOLD;

        Double macdPrev = macd.getMacdLine().get(i - 1);
        Double macdNow = macd.getMacdLine().get(i);

        Double signalPrev = macd.getSignalLine().get(i - 1);
        Double signalNow = macd.getSignalLine().get(i);

        if (macdPrev == null || macdNow == null || signalPrev == null || signalNow == null)
            return Signal.HOLD;

        if (macdPrev < signalPrev && macdNow > signalNow)
            return Signal.BUY;

        if (macdPrev > signalPrev && macdNow < signalNow)
            return Signal.SELL;

        return Signal.HOLD;
    }
}
