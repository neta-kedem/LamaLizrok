import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';


export class ItemModel {
    constructor(
        public id: string,
        public photo: string,
        public tag: string,
        public position: {},
        public addingTime: number,
        public description: string
    ){}
}

@Injectable()
export class FeedService {

    private baseUrl = 'http://localhost:3003/data/items/';


    constructor(private http: Http) { }
	 
	public get url() {
      return this.baseUrl;
	}

    query(): Promise<ItemModel[]> {

        let prmItem = this.http.get(this.baseUrl)
            .toPromise()
            .then(res => {
                const jsonItems = res.json();
                return jsonItems.map((jsonItem : any) => {
                    console.log('query service', jsonItem);
                    return new ItemModel(jsonItem._id, jsonItem.body.photo, jsonItem.body.tags, jsonItem.body.position, jsonItem.body.addingTime, jsonItem.body.description);
                });
            });

        prmItem.catch(err => {
            console.log('HomeService::query - Problem talking to server');
        });

        return prmItem;
    }

    get(id: string) : Promise<ItemModel> {
        let prmItem = this.http.get(this.baseUrl + id)
            .toPromise()
            .then(res => {
                const jsonItem = res.json();
                console.log(jsonItem)
                return new ItemModel(jsonItem._id, jsonItem.body.photo, jsonItem.body.tags, jsonItem.body.position, jsonItem.body.addingTime, jsonItem.body.description);
            });

        prmItem.catch(err => {
            console.log('HomeService::get - Problem talking to server');
        });
        return prmItem;

    }
}