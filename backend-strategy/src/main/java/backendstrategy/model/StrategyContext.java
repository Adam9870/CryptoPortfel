package backendstrategy.model;

// kontekst czyli wszystko co strategia musi wiedziec w danej chwili zeby podjac decyzje
import backendstrategy.indicator.Indicator;
import java.util.List;

public class StrategyContext {

    private List<Candle> candles;
    private List<Indicator> indicators;
    private int index;

    public StrategyContext(List<Candle> candles, List<Indicator> indicators, int index) {
        this.candles = candles;
        this.indicators = indicators;
        this.index = index;
    }

    public List<Candle> getCandles() {
        return candles;
    }

    public List<Indicator> getIndicators() {
        return indicators;
    }

    public int getIndex() {
        return index;
    }
}
