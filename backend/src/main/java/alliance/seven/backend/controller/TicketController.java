package alliance.seven.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import alliance.seven.backend.ENV;
import alliance.seven.backend.api.responses.Response;
import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;
import alliance.seven.backend.repository.TicketRepository;
import alliance.seven.backend.service.TicketService;

@RestController
@RequestMapping(ENV.API_v1)
public class TicketController {

	private Gson gson;
	
    @Autowired
    private TicketService ticketService;
    
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
        	
            Optional<Ticket> createdTicket = ticketService.save(ticket);
            
    		Gson gson = new Gson();
      	  	JsonObject jsonObject = new JsonObject();        	  
      	  	jsonObject.addProperty("message", "success creating a ticket");
            jsonObject.addProperty("id", createdTicket.get().getId());           
            
            Response<String> success = new Response<>(HttpStatus.CREATED.value(), gson.toJson(jsonObject));
            return ResponseEntity.status(HttpStatus.CREATED).body(success);
            
        } catch (Exception e) {
            System.err.println(e.getMessage());                                   
            Response<String> error = new Response<>(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
        }
    }    
    
    @GetMapping("/get/tickets/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable("id") int id) {
        try {
            Optional<TicketDTO> ticketDTO = ticketService.findByIdWithRelations(id);
            if (ticketDTO.isPresent()) {
                Response<TicketDTO> data = new Response<>(HttpStatus.OK.value(), ticketDTO.get());
                return ResponseEntity.status(HttpStatus.OK).body(data);
            } else {
                Response<String> error = new Response<>(HttpStatus.NOT_FOUND.value(), "Ticket not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PatchMapping("/update/tickets/{id}")
    public ResponseEntity<?> updateTicket(@PathVariable("id") int id, @RequestBody Ticket updatedTicket) {
        try {
            Optional<Ticket> ticketOpt = ticketService.updateTicket(updatedTicket, id);
            if (ticketOpt.isPresent()) {
                Response<Ticket> data = new Response<>(HttpStatus.OK.value(), ticketOpt.get());
                return ResponseEntity.status(HttpStatus.OK).body(data);
            } else {
                Response<String> error = new Response<>(HttpStatus.NOT_FOUND.value(), "Ticket not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            Response<String> error = new Response<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
