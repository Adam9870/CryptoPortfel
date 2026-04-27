package backendstrategy.indicator.trend;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

public class HMA implements Indicator {

    private int period;
    private List<Double> values = new ArrayList<>();

    public HMA(int period) {
        this.period = period;
    }

    @Override
    public void calculate(List<Candle> candles) {

        values.clear();

        List<Double> closes = new ArrayList<>();

        for (Candle c : candles) {
            closes.add(c.getClose());
        }

        List<Double> wmaHalf = calculateWMA(closes, period / 2);
        List<Double> wmaFull = calculateWMA(closes, period);

        List<Double> diff = new ArrayList<>();

        for (int i = 0; i < closes.size(); i++) {

            double val = (2 * wmaHalf.get(i)) - wmaFull.get(i);
            diff.add(val);
        }

        int sqrtPeriod = (int) Math.sqrt(period);

        values = calculateWMA(diff, sqrtPeriod);
    }

    private List<Double> calculateWMA(List<Double> data, int period) {

        List<Double> result = new ArrayList<>();

        int denominator = period * (period + 1) / 2;

        for (int i = 0; i < data.size(); i++) {

            if (i < period - 1) {
                result.add(null);
                continue;
            }

            double sum = 0;

            int weight = 1;

            for (int j = i - period + 1; j <= i; j++) {

                sum += data.get(j) * weight;
                weight++;
            }

            result.add(sum / denominator);
        }

        return result;
    }

    @Override
    public String getName() {
        return "HMA(" + period + ")";
    }

    @Override
    public List<Double> getValues() {
        return values;
    }
}
