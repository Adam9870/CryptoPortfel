package indicator.momentum;

import indicator.Indicator;
import model.Candle;

import java.util.ArrayList;
import java.util.List;

public class RSI implements Indicator {

    private int period;
    private List<Double> values = new ArrayList<>();

    public RSI(int period) {
        this.period = period;
    }

    @Override
    public void calculate(List<Candle> candles) {

        values.clear();

        for (int i = 0; i < candles.size(); i++) {

            if (i < period) {
                values.add(null);
                continue;
            }

            double gain = 0;
            double loss = 0;

            for (int j = i - period + 1; j <= i; j++) {

                double change = candles.get(j).getClose() - candles.get(j - 1).getClose();

                if (change > 0) gain += change;
                else loss -= change;
            }

            double rs = gain / loss;

            double rsi = 100 - (100 / (1 + rs));

            values.add(rsi);
        }
    }

    @Override
    public String getName() {
        return "RSI(" + period + ")";
    }

    @Override
    public List<Double> getValues() {
        return values;
    }
}