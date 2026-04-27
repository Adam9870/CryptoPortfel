package backendstrategy.factory;

import backendstrategy.indicator.Indicator;
import backendstrategy.strategy.TradingStrategy;

import java.util.List;

public class StrategyBundle {

    private TradingStrategy strategy;
    private List<Indicator> indicators;

    public StrategyBundle(TradingStrategy strategy, List<Indicator> indicators) {
        this.strategy = strategy;
        this.indicators = indicators;
    }

    public TradingStrategy getStrategy() {
        return strategy;
    }

    public List<Indicator> getIndicators() {
        return indicators;
    }
}
