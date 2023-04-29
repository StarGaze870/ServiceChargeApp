package alliance.seven.backend.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.entity.EmailDetails;
import alliance.seven.backend.entity.SendOTPDetails;
import alliance.seven.backend.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(ENV.API_v1)
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send/email")
    public ResponseEntity<?> sendMail(@RequestBody EmailDetails details) {
        try {
            String status = emailService.sendSimpleMail(details);
            Response<String> data = new Response<>(HttpStatus.OK.value(), status);
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/send/otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOTPDetails details) {
        try {
            String status = emailService.sendOTP(details);
            Response<String> data = new Response<>(HttpStatus.OK.value(), status);
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping("/send/emailWith/attachment")
    public ResponseEntity<?> sendMailWithAttachment(HttpServletRequest request,
            @RequestPart("emailDetails") String emailDetailsJson,
            @RequestPart(value = "attachment", required = false) MultipartFile attachment) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            EmailDetails emailDetails = objectMapper.readValue(emailDetailsJson, EmailDetails.class);

            String status = emailService.sendMailWithAttachment(emailDetails, attachment);
            Response<String> data = new Response<>(HttpStatus.OK.value(), status);
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
