package seven.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import seven.backend.entity.User;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
//	TODO:
//	1. REGISTER USER
//	2. LOGIN USER
//	3. FORGOT PASSWORD THEN SEND EMAIL
//	4. RESET PASSWORD
	
}
