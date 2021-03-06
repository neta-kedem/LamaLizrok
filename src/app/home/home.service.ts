import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class ItemModel {
	constructor (public imgUrl:string, private _id: string){}
}


@Injectable()
export class HomeService {


  private baseUrl = 'http://localhost:3003/data/item';
  constructor(private http: Http) {}


  public get url() {
      return this.baseUrl;
  }

  // query (GETs a list)
  query(): Promise<ItemModel[]> {

    let prmItem = this.http.get(this.baseUrl)
      .toPromise()
      .then(res => {
        const jsonItems = res.json();
        return jsonItems.map((jsonItem : any) => {
          let jsonItemContacts = JSON.parse(jsonItem.contacts);
          return new ItemModel(jsonItem.name, jsonItem.birthdate);
          });
      });

    prmItem.catch(err => {
      console.log('HomeService::query - Problem talking to server');
    });

    return prmItem;
  }

  // get (GETs a single)
  get(id: string) : Promise<ItemModel> {
    let prmItem = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonItem = res.json();
        let jsonItemContacts = JSON.parse(jsonItem.contacts);
        return new ItemModel(jsonItem.name, jsonItem.birthdate);
      });

    prmItem.catch(err => {
      console.log('HomeService::get - Problem talking to server');
    });
    return prmItem;

  }

  // DELETE 
  remove(id: string) : Promise<ItemModel[]> {
    let prmItem = this.http.delete(this.baseUrl + id)
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmItem.catch(err => {
      console.log('HomeService::remove - Problem talking to server', err);
    });
    return prmItem;
  }

  // save - Adds (POST) or update (PUT)  
  save(itemData: any, id?: string) : Promise<ItemModel>{
    let response : any;
    let prmItem : Promise<ItemModel>;

    if (id) {
      const url = this.baseUrl + id;
      response = this.http.put(url, itemData);
    } else {
	    const url = this.baseUrl;
       response = this.http.post(url, itemData);
    }

    prmItem = response.toPromise()
      .then((res : any) => {
          const jsonItem = res.json();
          return new ItemModel(jsonItem.name, jsonItem.birthdate);
      });

    prmItem.catch(err => {
      console.log('HomeService::save - Problem talking to server', err);
    });
    return prmItem;
  }
}
