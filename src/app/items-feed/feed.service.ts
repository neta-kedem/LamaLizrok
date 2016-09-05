import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';


export class ItemModal {
	
	constructor(
				public photos: string[],
				public tags: string[],
				public location: {},
				public description: string,
				public addingTime: number
	){}
}

@Injectable()
export class FeedService {

	private baseUrl = 'http://localhost:3003/data/item';

	constructor(private http: Http) { }
	 
	public get url() {
      return this.baseUrl;
	}

	query(): Promise<ItemModal[]> {

    let prmItem = this.http.get(this.baseUrl)
      .toPromise()
      .then(res => {
        const jsonItems = res.json();
        return jsonItems.map((jsonItem : any) => {
          return new ItemModal(jsonItem.photos, jsonItem.tags ,
                        jsonItem.location, jsonItem.description, jsonItem.addingTime) 
          })
      });

    prmItem.catch(err => {
      console.log('FeedService::query - Problem talking to server');
    });

    return prmItem;
  }
}