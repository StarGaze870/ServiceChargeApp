package seven.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {
	
	@GetMapping("/test")
	public String test() {
	    return "login";
	}
	
	
//	TODO:
//	1. REGISTER USER
//	2. LOGIN USER
//	3. FORGOT PASSWORD THEN SEND EMAIL
//	4. RESET PASSWORD
	
}
