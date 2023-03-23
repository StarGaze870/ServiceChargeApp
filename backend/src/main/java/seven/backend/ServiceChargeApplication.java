package seven.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("seven.backend.entity.*")
@EnableJpaRepositories({"seven.backend.repository.*", "seven.backend.Impl.repository.*"})
@ComponentScan({"seven.backend.controller", "seven.backend.service.*", "seven.backend.Impl.service.*"})

public class ServiceChargeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceChargeApplication.class, args);
    }
}