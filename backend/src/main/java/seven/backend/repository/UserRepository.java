package seven.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seven.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	// Define any custom methods you need here

}
