package indicator;

import java.util.List;
import model.Candle;

public interface Indicator {

    String getName();

    void calculate(List<Candle> candles);


    List<Double> getValues();
}