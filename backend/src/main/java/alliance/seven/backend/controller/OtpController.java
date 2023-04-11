package alliance.seven.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.OtpDTO;
import alliance.seven.backend.service.OtpService;

@RestController
@RequestMapping(ENV.API_v1)
public class OtpController {

    @Autowired
    private OtpService otpService;

    @GetMapping("/otp/user/{userId}")
    public ResponseEntity<?> getOtpByUserId(@PathVariable String userId) {
        Optional<OtpDTO> otpDTO = otpService.findByUserId(userId);

        String msg = "OTP not found for user ID: " + userId;
        
        if (otpDTO.isPresent()) {
            Response<OtpDTO> data = new Response<>(HttpStatus.OK.value(), otpDTO.get());
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } else {
            Response<String> error = new Response<>(HttpStatus.NOT_FOUND.value(), msg);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
     
}
