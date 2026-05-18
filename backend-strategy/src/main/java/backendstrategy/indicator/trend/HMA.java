package backendstrategy.indicator.trend;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

// srednia hulla to taki wynalazek ktory stara sie calkowicie usunac opoznienie ktore maja zwykle srednie dziala bardzo szybko i gladko podaza za cena wiec mega latwo wylapac momenty w ktorych trend nagle zawraca
// pod maska jest to sprytne bo hull wzial dwie wazone srednie kroczace jedna liczona dla pelnego okresu a druga dla polowy i odjal jedna od drugiej to dalo mu zerowe opoznienie ale wykres byl strasznie postrzepiony wiec na sam koniec puscil to znowu przez trzecia srednia zeby to wszystko wygladzic i zrobic ladny luk
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

            Double half = wmaHalf.get(i);
            Double full = wmaFull.get(i);

            if (half == null || full == null) {
                diff.add(null);
            } else {
                double val = (2 * half) - full;
                diff.add(val);
            }
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
            boolean hasNull = false;

            for (int j = i - period + 1; j <= i; j++) {

                if (data.get(j) == null) {
                    hasNull = true;
                    break;
                }

                sum += data.get(j) * weight;
                weight++;
            }

            if (hasNull) {
                result.add(null);
            } else {
                result.add(sum / denominator);
            }
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
