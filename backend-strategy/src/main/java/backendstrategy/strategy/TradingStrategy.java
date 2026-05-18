package backendstrategy.strategy;

import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

// wzorzec strategy pozwala nam na ladowanie roznych logik handlowych do engine'a bez robienia miliona ifow w samym silniku
public interface TradingStrategy {
    Signal generateSignal(StrategyContext context);
}

