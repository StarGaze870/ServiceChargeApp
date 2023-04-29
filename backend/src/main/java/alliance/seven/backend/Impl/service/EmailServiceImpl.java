package alliance.seven.backend.Impl.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import alliance.seven.backend.entity.EmailDetails;
import alliance.seven.backend.entity.SendOTPDetails;
import alliance.seven.backend.service.EmailService;
import alliance.seven.backend.service.OtpService;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private OtpService otpService;
    
    @Value("${spring.mail.username}")
    private String sender;

    @Value("${spring.mail.senderName}")
    private String senderName;

    public String sendSimpleMail(EmailDetails details) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            mimeMessageHelper.setFrom(senderName + " <" + sender + ">");
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody(), true); // Set html flag to true
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }
    
    public String sendOTP(SendOTPDetails details) {
        try {
        	
        	Random random = new Random();
            int otp = 10000 + random.nextInt(90000); // Generates a random 5-digit number
            details.getOtp().setOtp(otp);    
        	
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            mimeMessageHelper.setFrom(senderName + " <" + sender + ">");
            mimeMessageHelper.setTo(details.getRecipient());
            
            // Format the msgBody with the desired layout
            String msgBody = String.format("""
    		 		 		 		 		<br />
						                    %d
						                    <br />
											<br />
						                    Use the code for verification.
											<br /><br />
						                    Note: If you were not expecting this email, you can ignore this email.
											<br /><br /><br />
						                    Regards,
						                    <br />
						                    Alliance Service Charge""",
						                    details.getOtp().getOtp());
            
            mimeMessageHelper.setText(msgBody, true); // Set html flag to false for plain text
            
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);                  
            
            // Save the OTP to the database after sending the email and deleting already existed otps
            otpService.deleteByUserId(details.getOtp().getUser().getId());
            otpService.save(details.getOtp());

            return "Mail Sent Successfully...";
        } catch (Exception e) {
        	System.err.println(e.getMessage());                   
        	throw new RuntimeException(e.getMessage());
        }
    }


    public String sendMailWithAttachment(EmailDetails details, MultipartFile file) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, file != null);
            mimeMessageHelper.setFrom(senderName + " <" + sender + ">");
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody(), true); // Set html flag to true
            mimeMessageHelper.setSubject(details.getSubject());

            if (file != null) {
                InputStreamSource inputStreamSource = new ByteArrayResource(file.getBytes());
                mimeMessageHelper.addAttachment(file.getOriginalFilename(), inputStreamSource);
            }

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }


}
