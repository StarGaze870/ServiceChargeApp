package alliance.seven.backend.dto;

import java.util.Date;

import alliance.seven.backend.entity.Priorities;
import alliance.seven.backend.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {
	
	private Integer id;
    private UserSummaryDTO user;
    private Status status;
    private Priorities priority;
    private String subject;
    private String description;
    private Date created_at;
    private Date updated_at;

}
