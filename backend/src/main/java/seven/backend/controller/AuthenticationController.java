package seven.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import seven.backend.service.UserService;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {
	
	@GetMapping("/test")
	public String test() {
	    return "login";
	}
	
	@Autowired
	private UserService userService;
	
	
//	TODO:
//	1. REGISTER USER
//	2. LOGIN USER
//	3. FORGOT PASSWORD THEN SEND EMAIL
//	4. RESET PASSWORD
	
}
