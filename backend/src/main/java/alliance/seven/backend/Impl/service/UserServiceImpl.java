package alliance.seven.backend.Impl.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.AES_Encryption.EncryptDecrypt;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.UserRepository;
import alliance.seven.backend.requests.ResetPasswordRequest;
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
                user.getRole()
        )).collect(Collectors.toList());
        return Optional.ofNullable(userSummaryDTOs);
    } 
    
    @Override
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(resetPasswordRequest.getEmail());
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String encryptedPassword = aes.encrypt(resetPasswordRequest.getNewPassword());
            user.setPassword(encryptedPassword);
            userRepository.save(user);
        } else {
            throw new Exception("User not found.");
        }
    }

}