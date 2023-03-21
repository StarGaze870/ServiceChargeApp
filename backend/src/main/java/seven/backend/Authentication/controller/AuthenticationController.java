package seven.backend.Authentication.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

	@GetMapping("/test")
	public String shittyUser() {
		return "TEST";
	}
	
//	TODO:
//	1. REGISTER USER
//	2. LOGIN USER
//	3. FORGOT PASSWORD THEN SEND EMAIL
//	4. RESET PASSWORD
	
}
