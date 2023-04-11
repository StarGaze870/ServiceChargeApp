package alliance.seven.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import alliance.seven.backend.dto.OtpDTO;
import alliance.seven.backend.entity.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Integer> {
	
	
	Optional<Otp> findByUserId(String userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Otp o WHERE o.user.id = :userId")
    void deleteByUserId(Integer userId);
}
