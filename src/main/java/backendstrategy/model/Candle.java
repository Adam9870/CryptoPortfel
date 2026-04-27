package backendstrategy.model;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Candle {
    private long timestamp;
    private double open;
    private double high;
    private double low;
    private double close;
    private double volume;


}

