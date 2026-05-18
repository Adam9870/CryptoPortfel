package backendstrategy;

// glowna klasa odpalajaca calego spring boota
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
    org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class,
    org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration.class
})
public class BackendStrategyApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendStrategyApplication.class, args);
    }
}
