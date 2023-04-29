package alliance.seven.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.AES_Encryption.EncryptDecrypt;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.UserSummaryDTO;
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
	
	@PostMapping("/create/users")
	public ResponseEntity<?> store(@RequestBody User user) {
		try {
            Optional<User> newUser = userService.save(user);
            Response<Optional<User>> data = new Response<Optional<User>>(HttpStatus.CREATED.value(), newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
	}	
	
	@GetMapping("/get/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            Optional<List<UserSummaryDTO>> users = userService.findAll();
            Optional<Map<Integer, Long>> roleCounts = userService.getRoleCounts();

            Response<Optional<List<UserSummaryDTO>>> userData = new Response<>(HttpStatus.OK.value(), users);

            Object[] arr = new Object[2];
            arr[0] = userData;
            arr[1] = roleCounts;

            Response<Object[]> response = new Response<Object[]>(HttpStatus.OK.value(), arr);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
	
	@PatchMapping("/update/users/{id}")
	public ResponseEntity<?> updateUserById(@PathVariable("id") Integer id, @RequestBody User updatedUser) {
	    try {
	        Optional<User> userOpt = userService.updateUser(id, updatedUser);
	        if (userOpt.isPresent()) {
	            Response<User> data = new Response<>(HttpStatus.OK.value(), userOpt.get());
	            return ResponseEntity.status(HttpStatus.OK).body(data);
	        } else {
	            Response<String> error = new Response<>(HttpStatus.NOT_FOUND.value(), "User not found");
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	        }
	    } catch (Exception e) {
	        System.err.println(e.getMessage());
	        Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	    }
	}
	
	@DeleteMapping("/delete/users/{id}")
    public ResponseEntity<?> deleteTicketById(@PathVariable("id") int id) {
        try {
            Optional<Boolean> isDeleted = userService.deleteUserById(id);
            if (isDeleted.isPresent() && isDeleted.get()) {
                Response<String> data = new Response<>(HttpStatus.OK.value(), "User successfully deleted");
                return ResponseEntity.status(HttpStatus.OK).body(data);
            } else {
                Response<String> error = new Response<>(HttpStatus.NOT_FOUND.value(), "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
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

}
