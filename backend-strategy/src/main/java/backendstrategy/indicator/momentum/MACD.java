package backendstrategy.indicator.momentum;

import backendstrategy.indicator.Indicator;
import backendstrategy.model.Candle;

import java.util.ArrayList;
import java.util.List;

// macd to taki bystry wskaznik ktory patrzy na dwie rozne srednie cenowe i sprawdza jak daleko od siebie uciekaja jak jedna przecina druga z dolu do gory to mamy fajny sygnal ze trend wlasnie przyspiesza i bedzie rosnac dziala to super do wylapywania duzych stalych ruchow
// macd ma trzy glowne czesci pierwsza to glowna linia ktora jest po prostu roznica miedzy szybka a wolna srednia ema zazwyczaj 12 i 26 dni druga to linia sygnalu czyli srednia z tej glownej linii a trzecia to histogram ktory pokazuje roznice miedzy glowna a sygnalem im wyzszy histogram tym szybszy ruch w gore
public class MACD implements Indicator {

    private int fastPeriod;
    private int slowPeriod;
    private int signalPeriod;

    private List<Double> macdLine = new ArrayList<>();
    private List<Double> signalLine = new ArrayList<>();
    private List<Double> histogram = new ArrayList<>();

    public MACD(int fastPeriod, int slowPeriod, int signalPeriod) {
        this.fastPeriod = fastPeriod;
        this.slowPeriod = slowPeriod;
        this.signalPeriod = signalPeriod;
    }

    @Override
    public void calculate(List<Candle> candles) {

        macdLine.clear();
        signalLine.clear();
        histogram.clear();

        List<Double> emaFast = calculateEMA(candles, fastPeriod);
        List<Double> emaSlow = calculateEMA(candles, slowPeriod);

        for (int i = 0; i < candles.size(); i++) {

            double macd = emaFast.get(i) - emaSlow.get(i);
            macdLine.add(macd);
        }

        signalLine = calculateEMAFromValues(macdLine, signalPeriod);

        for (int i = 0; i < macdLine.size(); i++) {

            double hist = macdLine.get(i) - signalLine.get(i);
            histogram.add(hist);
        }
    }

    private List<Double> calculateEMA(List<Candle> candles, int period) {

        List<Double> values = new ArrayList<>();

        double multiplier = 2.0 / (period + 1);

        double ema = candles.get(0).getClose();
        values.add(ema);

        for (int i = 1; i < candles.size(); i++) {

            double close = candles.get(i).getClose();

            ema = ((close - ema) * multiplier) + ema;

            values.add(ema);
        }

        return values;
    }

    private List<Double> calculateEMAFromValues(List<Double> input, int period) {

        List<Double> values = new ArrayList<>();

        double multiplier = 2.0 / (period + 1);

        double ema = input.get(0);
        values.add(ema);

        for (int i = 1; i < input.size(); i++) {

            ema = ((input.get(i) - ema) * multiplier) + ema;

            values.add(ema);
        }

        return values;
    }

    public List<Double> getMacdLine() {
        return macdLine;
    }

    public List<Double> getSignalLine() {
        return signalLine;
    }

    public List<Double> getHistogram() {
        return histogram;
    }

    @Override
    public String getName() {
        return "MACD(" + fastPeriod + "," + slowPeriod + "," + signalPeriod + ")";
    }

    @Override
    public List<Double> getValues() {
        return macdLine;
    }
}
