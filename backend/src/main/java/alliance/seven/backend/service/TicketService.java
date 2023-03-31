package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;

public interface TicketService {
	
    Optional<List<TicketDTO>> getAllTickets();
    
}
