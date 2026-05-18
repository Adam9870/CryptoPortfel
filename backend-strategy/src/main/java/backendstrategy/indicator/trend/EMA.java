package backendstrategy.indicator.trend;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

// to tez jest srednia kroczaca ale sprytniejsza dziala jak zwykla srednia ale daje znacznie wieksza wage dzisiejszej cenie niz tej sprzed tygodnia dzieki temu o wiele szybciej reaguje jak na rynku cos zaczyna sie dziac
// liczymy to tak ze najpierw bierzemy stala mnoznika zalezy od dlugosci okresu i pozniej nowa cena jest mnozona przez ten staly ulamek a reszta z tego ulamka leci na stara srednia wiec im swiezsza cena tym wazniejsza a wplyw tych starych wygasa sobie powoli do zera z kazdym dniem
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
