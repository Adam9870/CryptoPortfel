package backendstrategy.indicator.momentum;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

// rsi mowi nam czy rynek nie przesadzil z kupowaniem albo sprzedawaniem wartosc skacze od 0 do 100 jak jest powyzej 70 to znaczy ze wszyscy juz kupili i zaraz moga zaczac wyprzedawac a jak spada ponizej 30 to znaczy ze jest panika i moze to byc swietny moment zeby tanio kupic
// silnik rsi robi cos takiego ze patrzy osobno na dni w ktorych cena rosla i osobno na dni w ktorych cena spadala w wybranym okresie np 14 dni potem liczy srednia z tych wzrostow dzieli to przez srednia ze spadkow zeby zobaczyc kto wygrywa byki czy niedzwiedzie i wrzuca do prostego wzoru zeby zrobic z tego skale do stu
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
