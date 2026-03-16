package strategy;

import model.Signal;
import model.StrategyContext;

public interface TradingStrategy {
    Signal generateSignal(StrategyContext context);
}
