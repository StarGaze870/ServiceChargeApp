package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.User;

public interface UserService {
    Optional<List<UserSummaryDTO>> findAll();     
    //ryan
    Boolean saveuser(User user);
    //ryan
    List<User> getUserByRole(User user);
}
