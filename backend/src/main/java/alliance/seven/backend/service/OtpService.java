package alliance.seven.backend.service;

import java.util.Optional;

import alliance.seven.backend.dto.OtpDTO;
import alliance.seven.backend.entity.Otp;

public interface OtpService {

	Optional<Otp> save(Otp otp);
	Optional<OtpDTO> findByUserId(String userId);
	Optional<Boolean> deleteByUserId(Integer id);
 
}
