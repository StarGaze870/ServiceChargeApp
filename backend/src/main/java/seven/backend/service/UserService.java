package seven.backend.service;

import java.util.Optional;

import seven.backend.entity.User;

public interface UserService {
    Optional<User> login(String email, String password);
    String testing();
}
