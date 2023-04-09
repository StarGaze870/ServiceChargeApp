package alliance.seven.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.service.UserService;

@RestController
@RequestMapping(ENV.API_v1)
public class UserController {
	
	@Autowired
	private UserService userService;
	
//	TODO:
//	1. REGISTER USER
//	2. UPDATE USER
	
	@PostMapping("/user/create")
	public String store() {
	    return "user";
	}	
	
	@GetMapping("/get/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            Optional<List<UserSummaryDTO>> users = userService.findAll();
            Response<Optional<List<UserSummaryDTO>>> data = new Response<>(HttpStatus.OK.value(), users);
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
