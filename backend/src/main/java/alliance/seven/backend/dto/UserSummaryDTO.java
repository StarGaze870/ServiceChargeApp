package alliance.seven.backend.dto;

import java.util.Date;

import alliance.seven.backend.entity.Priorities;
import alliance.seven.backend.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryDTO {
    private Integer id;
    private String email;
    private String firstname;
    private String lastname;

    // Getters and setters
}
