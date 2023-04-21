package alliance.seven.backend.Impl.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.BeanUtilsHelper;
import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Priorities;
import alliance.seven.backend.entity.Status;
import alliance.seven.backend.entity.Ticket;
import alliance.seven.backend.repository.TicketRepository;
import alliance.seven.backend.service.TicketService;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Optional<List<TicketDTO>> getAllTickets() {
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            List<TicketDTO> ticketDTOs = tickets.stream().map(ticket -> {
                UserSummaryDTO userSummary = new UserSummaryDTO(
                        ticket.getUser().getId(),
                        ticket.getUser().getEmail(),
                        ticket.getUser().getFirstname(),
                        ticket.getUser().getLastname(),
                        ticket.getUser().getRole()
                );
                return new TicketDTO(
                        ticket.getId(),
                        userSummary,
                        ticket.getStatus(),
                        ticket.getPriority(),
                        ticket.getSubject(),
                        ticket.getDescription(),
                        ticket.getCreatedAt(),
                        ticket.getUpdatedAt()
                );
            }).collect(Collectors.toList());
            return Optional.ofNullable(ticketDTOs);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw new RuntimeException("Error Getting Tickets Data");
        }
    }

    @Override
    public Optional<Ticket> findById(int id) {
        return ticketRepository.findById(id);
    }
    
    @Override
    public Optional<Ticket> save(Ticket ticket) {
        Ticket savedTicket = ticketRepository.save(ticket);
        return Optional.ofNullable(savedTicket);
    }

    @Override
    public Optional<TicketDTO> findByIdWithRelations(int id) {
        Optional<Ticket> ticketOpt = ticketRepository.findByIdWithRelations(id);
        if (ticketOpt.isPresent()) {
            Ticket ticket = ticketOpt.get();
            UserSummaryDTO userSummary = new UserSummaryDTO(
                    ticket.getUser().getId(),
                    ticket.getUser().getEmail(),
                    ticket.getUser().getFirstname(),
                    ticket.getUser().getLastname(),
                    ticket.getUser().getRole()
            );
                        
            TicketDTO ticketDTO = new TicketDTO(
                    ticket.getId(),
                    userSummary,
                    ticket.getStatus(),
                    ticket.getPriority(),
                    ticket.getSubject(),
                    ticket.getDescription(),
                    ticket.getCreatedAt(),
                    ticket.getUpdatedAt()
            );
            return Optional.of(ticketDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<Ticket> updateTicketById(Ticket updatedTicket, int id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);
        if (optionalTicket.isPresent()) {
            Ticket existingTicket = optionalTicket.get();

            BeanUtilsHelper.copyNonNullProperties(existingTicket, updatedTicket);

            Ticket savedTicket = ticketRepository.save(existingTicket);
            return Optional.of(savedTicket);
        } else {
            return Optional.empty();
        }
    }

	@Override
	public Optional<Boolean> deleteTicketById(int id) {
		Optional<Ticket> ticketOpt = ticketRepository.findById(id);
        if (ticketOpt.isPresent()) {
            ticketRepository.delete(ticketOpt.get());
            return Optional.of(true);
        } else {
            return Optional.of(false);
        }
	}

	@Override
    public Optional<Map<Integer, Long>> getPriorityCounts(List<Integer> priorityIds) {
        List<Ticket> tickets = ticketRepository.findAll();
        Map<Integer, Long> priorityCounts = tickets.stream()
                .filter(ticket -> Optional.ofNullable(ticket.getPriority())
                                         .map(Priorities::getId)
                                         .filter(priorityIds::contains)
                                         .isPresent())
                .collect(Collectors.groupingBy(ticket -> ticket.getPriority().getId(), Collectors.counting()));
        return Optional.ofNullable(priorityCounts);
    }
	
	@Override
    public Optional<Map<Integer, Long>> getStatusCounts(List<Integer> statusIds) {
        List<Ticket> tickets = ticketRepository.findAll();
        Map<Integer, Long> statusCount = tickets.stream()
                .filter(ticket -> Optional.ofNullable(ticket.getStatus())
                                         .map(Status::getId)
                                         .filter(statusIds::contains)
                                         .isPresent())
                .collect(Collectors.groupingBy(ticket -> ticket.getStatus().getId(), Collectors.counting()));
        return Optional.ofNullable(statusCount);
    }
}