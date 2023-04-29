package alliance.seven.backend.entity;

//Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

//Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

//Class
public class EmailDetails {

 // Class data members
 private String recipient;
 private String msgBody;
 private String subject;
 private String attachment;
 private String attachmentPath;
 private MultipartFile file;
}