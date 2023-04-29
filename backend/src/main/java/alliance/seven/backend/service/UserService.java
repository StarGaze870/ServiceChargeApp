package alliance.seven.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.User;

public interface UserService {
    Optional<List<UserSummaryDTO>> findAll();
    Optional<Map<Integer, Long>> getRoleCounts();
    Optional<User> save(User user);
    Optional<User> updateUser(Integer userId, User updatedUser);
    Optional<Boolean> deleteUserById(int id);
}
