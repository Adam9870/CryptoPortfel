package backendstrategy.indicator.trend;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

// to jest zwykla srednia kroczaca wyobraz sobie ze bierzesz ceny z ostatnich kilku dni sumujesz je i dzielisz przez ich ilosc dzieki temu widzisz glowny kierunek w jakim idzie cena bez przejmowania sie malymi skokami w gore czy w dol
// technicznie dziala tak ze trzyma liste ostatnich cen i za kazdym razem jak wpada nowa swieczka to odrzuca najstarsza z konca listy dodaje najnowsza na poczatek liczy sume wszystkiego w srodku i zwraca z tego srednia matematyczna proste jak drut ale sprawdza sie zeby wylapac dlugi trend
public class SMA implements Indicator {

    private int period;
    private List<Double> values = new ArrayList<>();

    public SMA(int period) {
        this.period = period;
    }

    @Override
    public void calculate(List<Candle> candles) {

        values.clear();

        for (int i = 0; i < candles.size(); i++) {

            if (i < period - 1) {
                values.add(null);
                continue;
            }

            double sum = 0;

            for (int j = i - period + 1; j <= i; j++) {
                sum += candles.get(j).getClose();
            }

            values.add(sum / period);
        }
    }

    @Override
    public List<Double> getValues() {
        return values;
    }

    @Override
    public String getName() {
        return "SMA(" + period + ")";
    }
}


