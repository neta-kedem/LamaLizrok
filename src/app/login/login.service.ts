import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';


export class UserModal {
	
	constructor(public username: string,
				public password: string,
				public points: number
	){}
}

@Injectable()
export class LoginService {
	private baseUrl = 'http://localhost:3003/data/users/';
	constructor(private http: Http) {}


	public get url() {
	  return this.baseUrl;
	}

	// query (GETs a list)
	query(): Promise<UserModal[]> {

		let prmLogin = this.http.get(this.baseUrl)
		  .toPromise()
		  .then(res => {
		    const jsonUsers = res.json();
		    return jsonUsers.map((jsonUser : any) => {
		      return new UserModal(jsonUser.username, jsonUser.password, jsonUser.posts);});
		  });

		prmLogin.catch(err => {
		  console.log('loginService::query - Problem talking to server', err);
		});

		return prmLogin;
	}

	// POST (add) a new username
	save(user: any) : Promise<UserModal>{

	    let response : any;
	    let prmLogin : Promise<UserModal>;

	    const url = this.baseUrl;
	   	response = this.http.post(url, user);

	    prmLogin = response.toPromise()
	      .then((res : any) => {
	          const jsonUser = res.json();
			      return new UserModal(jsonUser.username, jsonUser.password, jsonUser.posts);
	      });

	    prmLogin.catch(err => {
	      console.log('loginService::save - Problem talking to server', err);
	    });
	    return prmLogin;
	}

	storeUsername(username){
    	localStorage.setItem('LamaLiz_username', username);
  	}

  	logout(){
    	localStorage.removeItem('LamaLiz_username');
  	}
}
