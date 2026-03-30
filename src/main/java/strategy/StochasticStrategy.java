package strategy;

import indicator.momentum.Stochastic;
import model.Signal;
import model.StrategyContext;

public class StochasticStrategy implements TradingStrategy {

    private Stochastic stochastic;

    public StochasticStrategy(Stochastic stochastic) {
        this.stochastic = stochastic;
    }

    @Override
    public Signal generateSignal(StrategyContext ctx) {

        int i = ctx.getIndex();

        if (i == 0)
            return Signal.HOLD;

        Double kPrev = stochastic.getKValues().get(i - 1);
        Double kNow = stochastic.getKValues().get(i);

        Double dPrev = stochastic.getDValues().get(i - 1);
        Double dNow = stochastic.getDValues().get(i);

        if (kPrev == null || kNow == null || dPrev == null || dNow == null)
            return Signal.HOLD;

        if (kPrev < dPrev && kNow > dNow && kNow < 20)
            return Signal.BUY;

        if (kPrev > dPrev && kNow < dNow && kNow > 80)
            return Signal.SELL;

        return Signal.HOLD;
    }
}