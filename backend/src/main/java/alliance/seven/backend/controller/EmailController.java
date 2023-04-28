package alliance.seven.backend.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import alliance.seven.backend.ENV;
import alliance.seven.backend.EmailSender;
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
    public ResponseEntity<?> sendMailWithAttachment(@RequestBody EmailDetails details) {
        try {
            String status = emailService.sendMailWithAttachment(details);
            Response<String> data = new Response<>(HttpStatus.OK.value(), status);
            return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
        
    }
    
    //ryan
    
//	POST http://localhost:8080/api/v1/sendEmail
//    recipient: example@example.com //set this into text type
//    subject: Test email with attachment //set this into text type
//    messageBody: Hello! This is a test email with an attachment. //set this into text type
//    attachmentFile: [choose a file to attach]// set this into file type

//    This input is typically entered in the "Body" tab in Postman, as a set of key-value pairs in "form-data" format.
//
//    Here's how you can enter this input in Postman:
//
//    In the "Body" tab, select "form-data" as the request body type.
//    Add four key-value pairs to the request body: "recipient", "subject", "messageBody", and "attachmentFile".
//    For the "recipient", "subject", and "messageBody" keys, enter the corresponding values in the "Value" column.
//    For the "attachmentFile" key, click on the "Choose Files" button and select the file you want to attach to the email.
    @PostMapping(value = "/sendEmail", consumes = {"multipart/form-data"})
    public String sendEmail(
            @RequestParam("recipient") String recipient,
            @RequestParam("subject") String subject,
            @RequestParam("messageBody") String messageBody,
            @RequestParam("attachmentFile") MultipartFile attachmentFile,
            HttpServletRequest request
    ) {
    	 try {
    	        String attachmentDir = request.getServletContext().getRealPath("/WEB-INF/attachments");
    	        File dir = new File(attachmentDir);
    	        if (!dir.exists()) {
    	            dir.mkdirs(); // create directory and all parent directories
    	            System.out.println("Created new directory: " + dir.getAbsolutePath());
    	        } else {
    	            System.out.println("Directory already exists: " + dir.getAbsolutePath());
    	        }
    	        String attachmentPath = attachmentDir + "/" + attachmentFile.getOriginalFilename();
    	        attachmentFile.transferTo(new File(attachmentPath));
    	        EmailSender.sendEmail(recipient, subject, messageBody, attachmentPath);
    	        return "Email sent successfully";
    	    } catch (IOException | MessagingException e) {
    	        e.printStackTrace();
    	        return "Failed to send email";
    	    }
    }


}
