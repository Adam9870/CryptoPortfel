package factory;

import indicator.Indicator;
import indicator.momentum.MACD;
import indicator.momentum.RSI;
import indicator.momentum.Stochastic;
import indicator.trend.HMA;
import indicator.trend.SMA;
import strategy.*;

import java.util.ArrayList;
import java.util.List;

public class StrategyFactory {

    public static StrategyBundle create(String name, dto.BacktestRequest req) {

        List<Indicator> indicators = new ArrayList<>();

        TradingStrategy strategy;

        switch (name.toLowerCase()) {

            case "rsi": {
                RSI rsi = new RSI(req.getRsiPeriod());
                indicators.add(rsi);

                strategy = new RSIStrategy(rsi);
                break;
            }

            case "macd": {
                MACD macd = new MACD(
                        req.getMacdFast(),
                        req.getMacdSlow(),
                        req.getMacdSignal()
                );

                indicators.add(macd);

                strategy = new MACDStrategy(macd);
                break;
            }

            case "stochastic": {
                Stochastic stoch = new Stochastic(14, 3);

                indicators.add(stoch);

                strategy = new StochasticStrategy(stoch);
                break;
            }

            case "ma_cross": {
                SMA fast = new SMA(req.getSmaFast());
                SMA slow = new SMA(req.getSmaSlow());

                indicators.add(fast);
                indicators.add(slow);

                strategy = new MovingAverageCrossStrategy(fast, slow);
                break;
            }

            case "multi": {
                HMA hma = new HMA(20);
                RSI rsi = new RSI(req.getRsiPeriod());
                MACD macd = new MACD(
                        req.getMacdFast(),
                        req.getMacdSlow(),
                        req.getMacdSignal()
                );

                indicators.add(hma);
                indicators.add(rsi);
                indicators.add(macd);

                strategy = new MultiIndicatorStrategy(hma, rsi, macd);
                break;
            }

            default:
                throw new IllegalArgumentException("Unknown strategy: " + name);
        }

        return new StrategyBundle(strategy, indicators);
    }
}