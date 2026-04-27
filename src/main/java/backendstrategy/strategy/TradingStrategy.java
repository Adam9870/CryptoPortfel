package backendstrategy.strategy;

import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

public interface TradingStrategy {
    Signal generateSignal(StrategyContext context);
}

