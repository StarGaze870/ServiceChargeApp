package alliance.seven.backend.controller;

import org.springframework.web.bind.annotation.*;
import alliance.seven.backend.ENV;

@RestController
@RequestMapping(ENV.API_v1)
public class UserController {
	
//	TODO:
//	1. REGISTER USER
//	2. UPDATE USER
	
	@PostMapping("/user/create")
	public String store() {
	    return "user";
	}		
}
