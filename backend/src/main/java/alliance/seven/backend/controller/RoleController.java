package alliance.seven.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.entity.Role;
import alliance.seven.backend.service.RoleService;

@RestController
@RequestMapping(ENV.API_v1)
public class RoleController {
	
    @Autowired
    private RoleService roleService;
    
    @GetMapping("/get/roles")	
    public ResponseEntity<?> getAllTickets() {
        try {
        		Optional<List<Role>> roles = roleService.getAllRole();        	         	            
	            Response<Optional<List<Role>>> response = new Response<Optional<List<Role>>>(HttpStatus.OK.value(), roles);
	            
             return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
        	System.err.println(e.getMessage());		
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }           
}
