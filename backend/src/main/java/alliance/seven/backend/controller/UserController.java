package alliance.seven.backend.controller;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.entity.Role;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.UserRepository;
import alliance.seven.backend.repository.UserRepositoryImpl;

@RestController
// @RequestMapping(ENV.API_v1)
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
//	TODO:
//	1. REGISTER USER
//	2. UPDATE USER
	
	@GetMapping("/user")
	public String test() {
		
	    return "user";
	}
	
	@Autowired
	private UserRepository userRepository;
	
		@PostMapping("/register")
	  public ResponseEntity<String> registerUser(@RequestBody User user) {
	    // Check if the email is already in use
			Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
	    if (optionalUser.isPresent()) {
	      return ResponseEntity.ok("Email already in use! : Registration failed");
	    }
	    Date currentTime = new Date();
	    user.setCreatedAt(currentTime);
	    user.setUpdatedAt(currentTime);
	    //user.setId(randomNumber);
//	    Role role = new Role();
//	    role.setType(1);
//	    user.setRole(role);
	    
	    user.setRole(1);
	    
	    // Hash the password using a secure hashing algorithm; like bcrypt
	    //String hashedPassword = hashPassword(user.getPassword());

	    // Set the hashed password and save the user to the database
	    //user.setPassword(hashedPassword);
	    userRepository.save(user);

	    return ResponseEntity.ok("User registered successfully");
	  }
		
		@PostMapping("/login")
		  public ResponseEntity<String> loginuser(@RequestBody User user) {
		    // Check if the email is already in use
				Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		    if (optionalUser.isPresent()) {
		    	String existingPassword = optionalUser.get().getPassword();
		    	if(existingPassword.equalsIgnoreCase(user.getPassword())) {
		    		return ResponseEntity.ok("Login Successful! : Logging In");
		    	} else {
		    		 return ResponseEntity.ok("Wrong Password! : Login failed");
		    	}
		     
		    }
	
		    return ResponseEntity.ok("Email does not Exist!: Login failed");
		  }
}
