package backendstrategy.indicator;

import java.util.List;
import backendstrategy.model.Candle;

public interface Indicator {

    String getName();

    void calculate(List<Candle> candles);


    List<Double> getValues();
}
