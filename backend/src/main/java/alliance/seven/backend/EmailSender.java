package alliance.seven.backend;

import java.util.Properties;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class EmailSender {

  public static void sendEmail(String recipient, String subject, String messageBody, String attachmentPath) throws MessagingException {

    // create session properties
    Properties properties = new Properties();
    properties.put("mail.smtp.auth", "true");
    properties.put("mail.smtp.starttls.enable", "true");
    properties.put("mail.smtp.host", "smtp.gmail.com");
    properties.put("mail.smtp.port", "587");

    // create session with authentication
    Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
      protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
        return new javax.mail.PasswordAuthentication("group7servicechargeapp@gmail.com", "xiylhzdkxcqknqmx");
      }
    });

    // create message
    Message message = new MimeMessage(session);
    message.setFrom(new InternetAddress("group7servicechargeapp@gmail.com"));
    message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
    message.setSubject(subject);

    // create message body
    BodyPart messageBodyPart = new MimeBodyPart();
    messageBodyPart.setText(messageBody);

    // create attachment
    BodyPart attachmentBodyPart = new MimeBodyPart();
    DataSource source = new FileDataSource(attachmentPath);
    attachmentBodyPart.setDataHandler(new DataHandler(source));
    attachmentBodyPart.setFileName(source.getName());

    // create multipart message
    Multipart multipart = new MimeMultipart();
    multipart.addBodyPart(messageBodyPart);
    multipart.addBodyPart(attachmentBodyPart);

    message.setContent(multipart);

    // send message
    Transport.send(message);
  }
}
