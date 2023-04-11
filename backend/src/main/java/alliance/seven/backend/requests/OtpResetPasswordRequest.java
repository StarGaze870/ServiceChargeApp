package alliance.seven.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpResetPasswordRequest {
    private String userId;
    private String newPassword;
    private int otp;
}
