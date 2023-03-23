package alliance.seven.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="roles")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false)
    private Integer id;

    @Column(name="type", nullable=false)
    private String type;

    @Column(name="description")
    private String description;
}
