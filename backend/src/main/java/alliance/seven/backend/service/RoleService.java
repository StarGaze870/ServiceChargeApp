package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.entity.Role;

public interface RoleService {

	Optional<List<Role>> getAllRole();
}