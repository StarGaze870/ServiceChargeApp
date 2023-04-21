package alliance.seven.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;

public interface TicketService {

    Optional<List<TicketDTO>> getAllTickets();
    Optional<Ticket> findById(int id);
    Optional<TicketDTO> findByIdWithRelations(int id);
    Optional<Ticket> save(Ticket ticket);
    Optional<Ticket> updateTicketById(Ticket updatedTicket, int id);
    Optional<Boolean> deleteTicketById(int id);
    Optional<Map<Integer, Long>> getPriorityCounts(List<Integer> priorityIds);
	Optional<Map<Integer, Long>> getStatusCounts(List<Integer> statusIds);
}
