package alliance.seven.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.AES_Encryption.EncryptDecrypt;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Otp;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.OtpRepository;
import alliance.seven.backend.repository.UserRepository;
import alliance.seven.backend.requests.OtpResetPasswordRequest;
import alliance.seven.backend.service.OtpService;
import alliance.seven.backend.service.UserService;

@RestController
@RequestMapping(ENV.API_v1)
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OtpRepository otpRepository;
	
	@Autowired
    private OtpService otpService;
	
	private EncryptDecrypt aes;
	
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
	
	
//	@PutMapping("/user/reset-password")
//	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
//	    try {
//	        userService.resetPassword(resetPasswordRequest);
//	        Response<String> data = new Response<>(HttpStatus.OK.value(), "Password reset successfully.");
//	        return ResponseEntity.status(HttpStatus.OK).body(data);
//	    } catch (Exception e) {
//	        System.err.println(e.getMessage());
//	        Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
//	    }
//	}
	
	@PostMapping("/user/otp/reset-password")
	public ResponseEntity<?> otpResetPassword(@RequestBody OtpResetPasswordRequest otpResetPasswordRequest) {
	    									
		 try {

			 
			if (otpRepository.findByUserId(otpResetPasswordRequest.getUserId()).get().getOtp() == otpResetPasswordRequest.getOtp()) {
				
				aes = new EncryptDecrypt();	
				Optional<User> user = userRepository.findById(otpResetPasswordRequest.getUserId());
				
				String encryptedPassword = aes.encrypt(otpResetPasswordRequest.getNewPassword());
				user.get().setPassword(encryptedPassword);
		        userRepository.save(user.get());
		        
		        otpService.deleteByUserId(Integer.parseInt(otpResetPasswordRequest.getUserId()));
		        
		        Response<String> data = new Response<>(HttpStatus.OK.value(), "Password Reset Successfully");
		        return ResponseEntity.status(HttpStatus.OK).body(data);
				
			}	
			else {
				
				Response<String> data = new Response<>(HttpStatus.BAD_REQUEST.value(), "OTP doesn't match");
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
			}			 
		        
	    } catch (Exception e) {
	        System.err.println(e.getMessage());
	        Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	    }
	}	
	//ryan 
//	POST http://localhost:8080/user/register/user
//	{
//	    "role": {"id": 1},
//	    "email": "john.doe@example.com",
//	    "firstname": "John",
//	    "lastname": "Doe",
//	    "password": "password123"
//	}
	@PostMapping("/user/register/user")
	public ResponseEntity<?> saveUser(@RequestBody User user) {
		if(userService.saveuser(user)) {
			 Response<String> data = new Response<>(HttpStatus.OK.value(), "User Saved Successfully");
		        return ResponseEntity.status(HttpStatus.OK).body(data);
		} else {
			Response<String> data = new Response<>(HttpStatus.BAD_REQUEST.value(), "User Already Exist");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
		}
	}
	//ryan
	//post http://localhost:8080/api/v1/user/display/user
//		{
//		  "role": {"id": 0}
//		}
	
	@PostMapping("/user/display/user")
	public ResponseEntity<?> displayUser(@RequestBody User user) {
		try {
			List<User> users = userService.getUserByRole(user);
		      return ResponseEntity.ok(users);
		} catch (Exception e) {
	        System.err.println(e.getMessage());
	        Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	    }
	}

}
