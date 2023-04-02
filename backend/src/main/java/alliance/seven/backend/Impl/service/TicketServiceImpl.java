package alliance.seven.backend.Impl.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.dto.UserSummaryDTO;
import alliance.seven.backend.entity.Priorities;
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
                        ticket.getUser().getLastname()
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
                    ticket.getUser().getLastname()
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

}