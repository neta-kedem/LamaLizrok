import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class itemModel {
	constructor (public imgUrl:string, private _id: string){}
}


@Injectable()
export class HomeService {


  private baseUrl = 'http://localhost:3003/data/kid/';
  constructor(private http: Http) {}


  public get url() {
      return this.baseUrl;
  }

  // query (GETs a list)
  query(): Promise<itemModel[]> {

    let prmItem = this.http.get(this.baseUrl)
      .toPromise()
      .then(res => {
        const jsonKids = res.json();
        return jsonKids.map((jsonKid : any) => {
          let jsonKidContacts = JSON.parse(jsonKid.contacts);
          return new itemModel(jsonKid.name, jsonKid.birthdate);
          });
      });

    prmItem.catch(err => {
      console.log('HomeService::query - Problem talking to server');
    });

    return prmItem;
  }

  // get (GETs a single)
  get(id: string) : Promise<itemModel> {
    let prmKid = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonKid = res.json();
        let jsonKidContacts = JSON.parse(jsonKid.contacts);
        return new itemModel(jsonKid.name, jsonKid.birthdate);
      });

    prmKid.catch(err => {
      console.log('HomeService::get - Problem talking to server');
    });
    return prmKid;

  }

  // DELETE 
  remove(id: string) : Promise<itemModel[]> {
    let prmKid = this.http.delete(this.baseUrl + id)
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmKid.catch(err => {
      console.log('KidService::remove - Problem talking to server', err);
    });
    return prmKid;
  }

  // save - Adds (POST) or update (PUT)  
  save(itemData: any, id?: string) : Promise<itemModel>{
    let response : any;
    let prmKid : Promise<itemModel>;

    if (id) {
      const url = this.baseUrl + id;
      response = this.http.put(url, itemData);
    } else {
	    const url = this.baseUrl;
       response = this.http.post(url, itemData);
    }

    prmKid = response.toPromise()
      .then((res : any) => {
          const jsonKid = res.json();
          return new itemModel(jsonKid.name, jsonKid.birthdate);
      });

    prmKid.catch(err => {
      console.log('KidService::save - Problem talking to server', err);
    });
    return prmKid;
  }
}
