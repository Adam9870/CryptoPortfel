package backendstrategy.dto;

// dto do odbierania pojedynczej swieczki zeby mozna bylo ja sparsowac z jsona
public class CandleDto {

    public CandleDto() {}


    private double open;
    private double high;
    private double low;
    private double close;

    public double getOpen() { return open; }
    public double getHigh() { return high; }
    public double getLow() { return low; }
    public double getClose() { return close; }
}
