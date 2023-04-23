package alliance.seven.backend.Impl.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import alliance.seven.backend.AES_Encryption.EncryptDecrypt;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Role;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.UserRepository;
import alliance.seven.backend.service.UserService;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Service
public class UserServiceImpl implements UserService {

	private EncryptDecrypt aes;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Optional<List<UserSummaryDTO>> findAll() {
		List<User> users = userRepository.findAll();
		List<UserSummaryDTO> userSummaryDTOs = users.stream().map(user -> new UserSummaryDTO(user.getId(),
				user.getEmail(), user.getFirstname(), user.getLastname(), user.getRole())).collect(Collectors.toList());
		return Optional.ofNullable(userSummaryDTOs);
	}
	
//ryan
	@Override
	public Boolean saveuser(User user) {
		
		Optional<User> searchUser = userRepository.findByEmail(user.getEmail());
		try {													
			
			if(searchUser.isPresent()) {	
				return false;
			}
			else {				
				aes = new EncryptDecrypt();		
				String encryptedPassword = aes.encrypt(user.getPassword()); 	
				  user.setPassword(encryptedPassword);
				  userRepository.save(user);
				  return true;
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return false;
		}					
	}
//ryan
	@Override
	public List<User> getUserByRole(User user) {
		
		if(user.getRole().getId() == 0) {
			return userRepository.findAll();
		} else {
			return userRepository.findByRoleId(user.getRole().getId());
		}
		
	}

	

}
