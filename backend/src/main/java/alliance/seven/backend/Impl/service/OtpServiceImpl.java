package alliance.seven.backend.Impl.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.dto.OtpDTO;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Otp;
import alliance.seven.backend.entity.User;
import alliance.seven.backend.repository.OtpRepository;
import alliance.seven.backend.service.OtpService;

@Service
public class OtpServiceImpl implements OtpService{

	@Autowired
    private OtpRepository otpRepository;

	@Override
    public Optional<Otp> save(Otp otp) {
        Otp savedOtp = otpRepository.save(otp);
        return Optional.ofNullable(savedOtp);
    }

	@Override
	public Optional<OtpDTO> findByUserId(String userId) {
	    Optional<Otp> otpEntity = otpRepository.findByUserId(userId);
	    
	    User user = otpEntity.get().getUser();	    	   
	    
	    UserSummaryDTO userSummary = new UserSummaryDTO(
			user.getId(),
			user.getEmail(),
			user.getFirstname(),
			user.getLastname(),
			user.getCreatedAt(),
			user.getRole()
        );

	    return Optional.ofNullable(new OtpDTO(
	    		otpEntity.get().getOtp(),
	    		otpEntity.get().getCreatedAt(),
                userSummary
        ));
	}


	@Override
	public Optional<Boolean> deleteByUserId(Integer id) {
		try {
			otpRepository.deleteByUserId(id);
			return Optional.ofNullable(true);
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return Optional.ofNullable(false);
		}
	}
}
