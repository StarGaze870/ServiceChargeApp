package alliance.seven.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;
import alliance.seven.backend.repository.TicketRepository;
import alliance.seven.backend.service.TicketService;

@RestController
@RequestMapping(ENV.API_v1)
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;
    
    @GetMapping("/get/tickets")	
    public ResponseEntity<?> getAllTickets() {
        try {
        	 Optional<List<TicketDTO>> tickets = ticketService.getAllTickets();
             Response<Optional<List<TicketDTO>>> data = new Response<>(HttpStatus.OK.value(), tickets);
             return ResponseEntity.status(HttpStatus.OK).body(data);
        } catch (Exception e) {
        	System.err.println(e.getMessage());		
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
        
    @PostMapping("/create/tickets")	
    public ResponseEntity<?> createNewTickets(@RequestBody Ticket ticket) {
        try {
            ticketRepository.save(ticket);
            Response<String> success = new Response<>(HttpStatus.CREATED.value(), "Ticket Created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(success);
        } catch (Exception e) {
            System.err.println(e.getMessage());		
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Ticket Creation failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

//    
//    @GetMapping("/create/tickets")	
//    public ResponseEntity<?> createTicket() {
//        try {
//        	 Optional<List<TicketDTO>> tickets = ticketService.getAllTickets();
//             Response<Optional<List<TicketDTO>>> data = new Response<>(HttpStatus.OK.value(), tickets);
//             return ResponseEntity.status(HttpStatus.OK).body(data);
//        } catch (Exception e) {
//        	System.err.println(e.getMessage());		
//            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
//        }
//    }
}
