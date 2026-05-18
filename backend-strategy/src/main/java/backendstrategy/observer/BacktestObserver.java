package backendstrategy.observer;

// interfejs pod wzorzec observer zeby mozna bylo reagowac na eventy w trakcie testow
public interface BacktestObserver {
    void onTradeExecuted(String type, double price, int index);
    void onBacktestCompleted(double finalBalance);
}
