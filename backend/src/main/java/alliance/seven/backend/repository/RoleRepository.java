package alliance.seven.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import alliance.seven.backend.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{

}
