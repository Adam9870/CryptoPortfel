package backendstrategy.indicator.momentum;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

public class Stochastic implements Indicator {

    private int kPeriod;
    private int dPeriod;

    //%K = (Close - LowestLow) / (HighestHigh - LowestLow) * 100
    //%D = SMA(%K, 3)

    private List<Double> kValues = new ArrayList<>();
    private List<Double> dValues = new ArrayList<>();

    public Stochastic(int kPeriod, int dPeriod) {
        this.kPeriod = kPeriod;
        this.dPeriod = dPeriod;
    }


    @Override
    public void calculate(List<Candle> candles) {

        kValues.clear();
        dValues.clear();

        for (int i = 0; i < candles.size(); i++) {

            if (i < kPeriod - 1) {
                kValues.add(null);
                dValues.add(null);
                continue;
            }

            double highestHigh = Double.MIN_VALUE;
            double lowestLow = Double.MAX_VALUE;

            for (int j = i - kPeriod + 1; j <= i; j++) {

                highestHigh = Math.max(highestHigh, candles.get(j).getHigh());
                lowestLow = Math.min(lowestLow, candles.get(j).getLow());
            }

            double close = candles.get(i).getClose();

            double k = ((close - lowestLow) / (highestHigh - lowestLow)) * 100;

            kValues.add(k);

            // obliczanie %D
            if (kValues.size() < dPeriod || kValues.get(i) == null) {
                dValues.add(null);
                continue;
            }

            double sum = 0;
            int count = 0;

            for (int j = i - dPeriod + 1; j <= i; j++) {

                Double val = kValues.get(j);

                if (val != null) {
                    sum += val;
                    count++;
                }
            }

            if (count == dPeriod)
                dValues.add(sum / dPeriod);
            else
                dValues.add(null);
        }
    }

    public List<Double> getKValues() {
        return kValues;
    }

    public List<Double> getDValues() {
        return dValues;
    }

    @Override
    public List<Double> getValues() {
        return kValues;
    }

    @Override
    public String getName() {
        return "Stochastic(" + kPeriod + "," + dPeriod + ")";
    }
}
