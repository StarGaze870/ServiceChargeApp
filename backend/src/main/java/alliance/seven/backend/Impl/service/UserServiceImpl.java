package alliance.seven.backend.Impl.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.BeanUtilsHelper;
import alliance.seven.backend.AES_Encryption.EncryptDecrypt;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Ticket;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.UserRepository;
import alliance.seven.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private EncryptDecrypt aes;
	
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<List<UserSummaryDTO>> findAll() {
        List<User> users = userRepository.findAll();
        List<UserSummaryDTO> userSummaryDTOs = users.stream().map(user -> new UserSummaryDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstname(),
                user.getLastname(),
                user.getCreatedAt(),
                user.getRole()                
        )).collect(Collectors.toList());
        return Optional.ofNullable(userSummaryDTOs);
    }

	@Override
	public Optional<User> save(User user) {
				
		try {
			String encryptedPassword = aes.encrypt(user.getPassword());
			user.setPassword(encryptedPassword);			
			User newUser = userRepository.save(user);
			
			return Optional.ofNullable(newUser);	
		}
		catch(Exception e) {
			return null;
		}		
	}

	@Override
    public Optional<Map<Integer, Long>> getRoleCounts() {
        List<User> users = userRepository.findAll();
        Map<Integer, Long> roleCounts = users.stream()
                .filter(user -> user.getRole() != null && user.getRole().getId() != null)
                .collect(Collectors.groupingBy(user -> user.getRole().getId(), Collectors.counting()));
        return Optional.ofNullable(roleCounts);
    }

	@Override
    public Optional<User> updateUser(Integer userId, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();	            
            BeanUtilsHelper.copyNonNullProperties(existingUser, updatedUser);
            
            if (updatedUser.getPassword() != null) {
                try {
                    String encryptedPassword = aes.encrypt(updatedUser.getPassword());
                    existingUser.setPassword(encryptedPassword);
                } catch (Exception e) {
                    System.err.println("Error encrypting password: " + e.getMessage());
                    return Optional.empty();
                }
            }
            
            User savedUser = userRepository.save(existingUser);
            return Optional.of(savedUser);
        } else {
            return Optional.empty();
        }
    }

	@Override
	public Optional<Boolean> deleteUserById(int id) {
		Optional<User> ticketOpt = userRepository.findById(id);
        if (ticketOpt.isPresent()) {
        	userRepository.delete(ticketOpt.get());
            return Optional.of(true);
        } else {
            return Optional.of(false);
        }
	}	
}
