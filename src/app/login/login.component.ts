import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModal } from './login.service';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';


@Component({
	// moduleId: module.id,
	templateUrl: 'login.component.html',
	providers: [LoginService],
	directives: [REACTIVE_FORM_DIRECTIVES]
})

export class LoginPageComponent implements OnInit {
	private user = {username:'', password:''};
	private users: any[] = [];
	private formLogin: FormGroup;
	constructor(private router: Router,
				private loginService:LoginService,
				private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.prepareForm();
		this.loginService.query().then((users)=>{
			this.users = users;
			console.log('users:',this.users);			
		});
	}

	public signIn() {
		console.log('LoginPageComponent: this.users:',this.users);
		if(this.users.some((user)=>{return ((user.username === this.formLogin.value.username)&&(user.password === this.formLogin.value.password));})){
			this.loginService.storeUsername(this.formLogin.value.username);
			this.router.navigate(['']);	
		} else {
			alert('wrong username or password');
		}
	}

	signUp(){
		let value = this.formLogin.value;
		if(this.users.some((user)=>{return user.username === value.username;})){
			alert('username already exist');	
		} else{
			value.posts = [];
			this.loginService.save(value);
			this.loginService.storeUsername(value.username);
			this.router.navigate(['']);
		}
	}

	prepareForm(){
		this.formLogin = this.formBuilder.group({
	      username: ['',Validators.required],
	      password:['', Validators.required]

  		});
	}
}
