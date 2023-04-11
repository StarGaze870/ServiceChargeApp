package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.requests.ResetPasswordRequest;

public interface UserService {
    Optional<List<UserSummaryDTO>> findAll();
    void resetPassword(ResetPasswordRequest resetPasswordRequest) throws Exception;    
}
