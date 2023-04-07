package alliance.seven.backend.service;

import java.util.List;
import java.util.Optional;

import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;
import alliance.seven.backend.entity.User;

public interface TicketService {

    Optional<List<TicketDTO>> getAllTickets();
    Optional<Ticket> findById(int id);
    Optional<TicketDTO> findByIdWithRelations(int id);
    Optional<Ticket> save(Ticket ticket);
    Optional<Ticket> updateTicket(Ticket updatedTicket, int id);
}
