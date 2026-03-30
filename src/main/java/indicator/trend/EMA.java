package indicator.trend;

import indicator.Indicator;
import model.Candle;

import java.util.ArrayList;
import java.util.List;

public class EMA implements Indicator {

    private int period;
    private List<Double> values = new ArrayList<>();

    public EMA(int period) {
        this.period = period;
    }

    @Override
    public void calculate(List<Candle> candles) {

        values.clear();

        double multiplier = 2.0 / (period + 1);

        double previousEma = candles.get(0).getClose();
        values.add(previousEma);

        for (int i = 1; i < candles.size(); i++) {

            double close = candles.get(i).getClose();

            double ema = ((close - previousEma) * multiplier) + previousEma;

            values.add(ema);

            previousEma = ema;
        }
    }

    @Override
    public List<Double> getValues() {
        return values;
    }

    @Override
    public String getName() {
        return "EMA(" + period + ")";
    }
}