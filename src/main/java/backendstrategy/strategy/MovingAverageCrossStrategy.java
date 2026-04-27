package backendstrategy.strategy;

import backendstrategy.model.Signal;
import backendstrategy.model.StrategyContext;

    public class MovingAverageCrossStrategy implements TradingStrategy {

        private final backendstrategy.indicator.trend.SMA shortMa;
        private final backendstrategy.indicator.trend.SMA longMa;

        private Double previousShortMa = null;
        private Double previousLongMa = null;

        public MovingAverageCrossStrategy(backendstrategy.indicator.trend.SMA shortMa, backendstrategy.indicator.trend.SMA longMa) {
            this.shortMa = shortMa;
            this.longMa = longMa;
        }

        @Override
        public Signal generateSignal(StrategyContext context) {
            int i = context.getIndex();

            Double currentShortMa = shortMa.getValues().get(i);
            Double currentLongMa = longMa.getValues().get(i);

            // jezeli to pierwsza iteracja to brak danych
            if (currentShortMa == null || currentLongMa == null) {
                return Signal.HOLD;
            }

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
