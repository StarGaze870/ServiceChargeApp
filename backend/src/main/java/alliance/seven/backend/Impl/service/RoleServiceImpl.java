package alliance.seven.backend.Impl.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.entity.Role;
import alliance.seven.backend.repository.RoleRepository;
import alliance.seven.backend.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	private RoleRepository rolerepository;
	
	 @Override
	    public Optional<List<Role>> getAllRole() {
	        try {	         
	        	List<Role> tickets = rolerepository.findAll();
	        	 return Optional.ofNullable(tickets);
	        	
	        } catch (Exception e) {
	            System.err.println(e.getMessage());
	            throw new RuntimeException("Error Getting Roles Data");
	        }			
	    }
}
