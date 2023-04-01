package alliance.seven.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import alliance.seven.backend.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByEmail(String email);
	Optional<User> findByPassword(String email);
	
	// Define any custom methods you need here

}
