package alliance.seven.backend.entity;

import java.util.Date;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter	
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", nullable=false)	
	private Integer id;

//	  @ManyToOne 
//    @JoinColumn(name = "roles_id", nullable=false)
//    private Role role;
//			
	@Column(name = "roles_id", nullable=false)
	private Integer role;
	
	@Column(name="email", nullable=false)
	private String email;
		
	@Column(name="firstname", nullable=false)
	private String firstname;
		
	@Column(name="lastname", nullable=false)
	private String lastname;
		
	@Column(name="password", nullable=false)
	private String password;
	
	@CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="created_at", nullable=false, updatable=false)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="updated_at", nullable=false)
    private Date updatedAt;
}


