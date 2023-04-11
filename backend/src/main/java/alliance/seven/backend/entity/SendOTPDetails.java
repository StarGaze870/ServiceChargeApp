package alliance.seven.backend.entity;

//Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

//Class
public class SendOTPDetails {

 // Class data members
 private String recipient;
 private String subject;
 private String msgBody; 
 private Otp otp;
 
}