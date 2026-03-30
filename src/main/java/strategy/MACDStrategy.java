package strategy;

import indicator.momentum.MACD;
import model.Signal;
import model.StrategyContext;

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

        double macdPrev = macd.getMacdLine().get(i - 1);
        double macdNow = macd.getMacdLine().get(i);

        double signalPrev = macd.getSignalLine().get(i - 1);
        double signalNow = macd.getSignalLine().get(i);

        if (macdPrev < signalPrev && macdNow > signalNow)
            return Signal.BUY;

        if (macdPrev > signalPrev && macdNow < signalNow)
            return Signal.SELL;

        return Signal.HOLD;
    }
}