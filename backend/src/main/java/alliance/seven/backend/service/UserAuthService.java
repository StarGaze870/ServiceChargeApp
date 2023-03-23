package alliance.seven.backend.service;

import java.util.Optional;

import alliance.seven.backend.entity.User;

public interface UserAuthService {
	
    Optional<User> login(String email, String password);
    
}
