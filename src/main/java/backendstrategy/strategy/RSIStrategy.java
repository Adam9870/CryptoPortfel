package backendstrategy.strategy;

import backendstrategy.indicator.momentum.RSI;
import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

public class RSIStrategy implements TradingStrategy {

    private RSI rsi;

    public RSIStrategy(RSI rsi) {
        this.rsi = rsi;
    }

    @Override
    public Signal generateSignal(StrategyContext ctx) {

        int i = ctx.getIndex();

        Double value = rsi.getValues().get(i);

        if (value == null)
            return Signal.HOLD;

        if (value < 30)
            return Signal.BUY;

        if (value > 70)
            return Signal.SELL;

        return Signal.HOLD;
    }
}
