package alliance.seven.backend.service;

import alliance.seven.backend.entity.EmailDetails;
import alliance.seven.backend.entity.SendOTPDetails;

//Importing required classes

//Interface
public interface EmailService {

 String sendOTP(SendOTPDetails details);
	
 // Method
 // To send a simple email
 String sendSimpleMail(EmailDetails details);

 // Method
 // To send an email with attachment
 String sendMailWithAttachment(EmailDetails details);
}