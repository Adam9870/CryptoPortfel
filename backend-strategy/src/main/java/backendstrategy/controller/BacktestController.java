package backendstrategy.controller;

// kontroler api lapie requesty z frontu i pcha je do silnika testowego
import backendstrategy.dto.*;
import backendstrategy.engine.*;
import backendstrategy.factory.*;
import backendstrategy.model.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BacktestController {

    @PostMapping("/backtest")
    public BackTestResult runBacktest(@RequestBody BacktestRequest req) {
        
        List<Candle> candles = new ArrayList<>();
        if (req.getCandles() != null) {
            for (CandleDto dto : req.getCandles()) {
                Candle c = new Candle();
                c.setOpen(dto.getOpen());
                c.setHigh(dto.getHigh());
                c.setLow(dto.getLow());
                c.setClose(dto.getClose());
                candles.add(c);
            }
        }

        StrategyBundle bundle = StrategyFactory.create(req.getStrategy(), req);

        BacktestEngine engine = new BacktestEngine();
        return engine.run(
                candles,
                bundle.getIndicators(),
                bundle.getStrategy(),
                req.getCommissionPercent(),
                req.getStopLossPercent(),
                req.getTakeProfitPercent()
        );
    }

    @GetMapping("/test")
    public String test() {
        return "OK";
    }
}
