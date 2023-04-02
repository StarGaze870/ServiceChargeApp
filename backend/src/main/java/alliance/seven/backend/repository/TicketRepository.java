package alliance.seven.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import alliance.seven.backend.dto.TicketDTO;
import alliance.seven.backend.entity.Ticket;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {   

    @Query("SELECT t FROM Ticket t JOIN FETCH t.user u JOIN FETCH t.status s LEFT JOIN FETCH t.priority p WHERE t.id = :id")
    Optional<Ticket> findByIdWithRelations(@Param("id") int id);
}

