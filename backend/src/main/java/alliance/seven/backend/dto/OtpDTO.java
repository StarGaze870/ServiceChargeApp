package alliance.seven.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OtpDTO {
    private int otp;
    private Date createdAt;
    private UserSummaryDTO user;
}
