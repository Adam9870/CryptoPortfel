package strategy;

import model.Signal;
import model.StrategyContext;

    public class MovingAverageCrossStrategy implements TradingStrategy {

        private final String shortMaName;
        private final String longMaName;

        private Double previousShortMa = null;
        private Double previousLongMa = null;

        public MovingAverageCrossStrategy(String shortMaName, String longMaName) {
            this.shortMaName = shortMaName;
            this.longMaName = longMaName;
        }   //TradingStrategy strategy = new MovingAverageCrossStrategy("SMA_50", "SMA_200");

        @Override
        public Signal generateSignal(StrategyContext context) {

            double currentShortMa = context.getIndicators().get(shortMaName);
            double currentLongMa = context.getIndicators().get(longMaName);

            // jezeli to pierwsza iteracja to brak danych
            if (previousShortMa == null || previousLongMa == null) {
                previousShortMa = currentShortMa;
                previousLongMa = currentLongMa;
                return Signal.HOLD;
            }

            Signal signal = Signal.HOLD;

            // GOLDEN CROSS
            if (previousShortMa <= previousLongMa &&
                    currentShortMa > currentLongMa) {

                signal = Signal.BUY;
            }

            // DEATH CROSS
            else if (previousShortMa >= previousLongMa &&
                    currentShortMa < currentLongMa) {

                signal = Signal.SELL;
            }

            // aktualizacja
            previousShortMa = currentShortMa;
            previousLongMa = currentLongMa;

            return signal;
        }
    }