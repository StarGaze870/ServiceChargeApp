package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.dto.UserSummaryDTO;

public interface UserService {
    Optional<List<UserSummaryDTO>> findAll();
}
