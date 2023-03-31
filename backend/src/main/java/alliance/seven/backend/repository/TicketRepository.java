package alliance.seven.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import alliance.seven.backend.entity.Ticket;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

	// Define any custom methods you need here

}
