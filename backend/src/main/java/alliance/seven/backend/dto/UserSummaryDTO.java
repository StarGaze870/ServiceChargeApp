package alliance.seven.backend.dto;

import alliance.seven.backend.entity.Role;
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
    private Role role;
    // Getters and setters
}
