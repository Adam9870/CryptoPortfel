package backendstrategy.indicator;

// wspolny interfejs dla kazdego wskaznika zeby silnik mogl je liczyc w jednej petli
import java.util.List;
import backendstrategy.model.Candle;

public interface Indicator {

    String getName();

    void calculate(List<Candle> candles);


    List<Double> getValues();
}
