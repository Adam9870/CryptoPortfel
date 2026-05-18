package backendstrategy.observer;

import java.util.ArrayList;
import java.util.List;

// to jest singleton zeby miec jedna instancje na cala apke plus dziala jako observer wiec mozemy sie podpinac i nasluchiwac na nowe trade'y
public class TradeNotifier {
    private static TradeNotifier instance;
    private List<BacktestObserver> observers;

    private TradeNotifier() {
        observers = new ArrayList<>();
    }

    public static synchronized TradeNotifier getInstance() {
        if (instance == null) {
            instance = new TradeNotifier();
        }
        return instance;
    }

    public void addObserver(BacktestObserver observer) {
        observers.add(observer);
    }

    public void notifyTradeExecuted(String type, double price, int index) {
        for (BacktestObserver obs : observers) {
            obs.onTradeExecuted(type, price, index);
        }
    }

    public void notifyBacktestCompleted(double finalBalance) {
        for (BacktestObserver obs : observers) {
            obs.onBacktestCompleted(finalBalance);
        }
    }
    
    public void clearObservers() {
        observers.clear();
    }
}
