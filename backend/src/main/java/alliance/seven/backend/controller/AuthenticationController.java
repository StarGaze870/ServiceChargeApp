package alliance.seven.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.service.UserAuthService;


@RestController
@RequestMapping(ENV.API_v1)
public class AuthenticationController {
		
	//	TODO:
	//	1. LOGIN USER (DONE)
	//	2. FORGOT PASSWORD THEN SEND EMAIL
	//	3. RESET PASSWORD
	
	private Gson gson;
	
	@Autowired
	private UserAuthService userService;	
	
	@PostMapping(path = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {		
		
		try {		
			Optional<User> user = userService.login(email, password);			
			user.get().setPassword(null);
	        return ResponseEntity.ok(user);
		}
		catch (Exception e) {	
			System.err.println(e.getMessage());							
			Response<String> error = new Response<String>(HttpStatus.BAD_REQUEST.value(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
    }	
	
	@PostMapping(path = "/check/auth", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> checkAuth(@RequestParam String email, @RequestParam String password) {		
		
		try {		
						
			Optional<User> user = userService.login(email, password);				
			Object[] arr = new Object[2];
			arr[0] = true;
			arr[1] = user;
			
	        Response<Object[]> data = new Response<Object[]>(HttpStatus.OK.value(), arr);
	        return ResponseEntity.status(HttpStatus.OK).body(data);
		}
		catch (Exception e) {
			System.err.println(e.getMessage());							
			Response<Boolean> error = new Response<Boolean>(HttpStatus.NOT_FOUND.value(), false);
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
		}
    }	
}
