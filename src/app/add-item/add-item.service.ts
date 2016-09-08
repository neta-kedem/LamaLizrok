import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


export class PositionModel{
    public longitude: number;
    public latitude: number;
}
export class ItemModel {
/*
    constructor(
        public photos: string[],
        public tags: string[],
        public location: {},
        public description: string,
        public addingTime: number
    ){}*/
    constructor(
        public id: string,
        // public photo: string,
        public photos: string[],
        public tags: {}[],
        public position: PositionModel,
        public addingTime: number,
        public description: string
    ){}

}

@Injectable()
export class AddItemService {

        tags = ['table', 'chair', 'sofa'];

        private baseUrl = 'http://localhost:3003/data/items';
        constructor(private http: Http) {}

        // query (GETs a list)
        query(): Promise<ItemModel[]> {

                let prmItem = this.http.get(this.baseUrl)
                    .toPromise()
                    .then(res => {
                            const jsonItems = res.json();
                            return jsonItems.map((jsonItem : any) => {
                                    console.log('query service', jsonItem);
                                    return new ItemModel(jsonItem.id, jsonItem.photos, jsonItem.tags, jsonItem.position, jsonItem.addingTime, jsonItem.description);
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
                            return new ItemModel(jsonItem.id, jsonItem.photos, jsonItem.tags, jsonItem.position, jsonItem.addingTime, jsonItem.description);
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
                if(id) {
                        const url = this.baseUrl + id;
                        response = this.http.put(url, itemData);
                } else {
                        const url = this.baseUrl;
                        response = this.http.post(url, {body:itemData});
                }

                prmItem = response
                    .toPromise()
                    .then((res : any) => {
                            console.log('res', res);
                            const jsonItem = JSON.parse(res._body);
                            console.log('jsonItem',jsonItem);
                            return new ItemModel(jsonItem.id, jsonItem.photos, jsonItem.tags, jsonItem.position, jsonItem.addingTime, jsonItem.description);
                    });

                prmItem.catch(err => {
                        console.log('AddItemService::save - Problem talking to server', err);
                });
                return prmItem;
        }

        public get url() {
                return this.baseUrl;
        }

    queryTags(): Promise<string[]> {
        let prmItem = this.http.get('http://localhost:3003/data/tags')
            .toPromise()
            .then(res => {
                const jsonItems = res.json();
                return jsonItems.map((jsonItem : any) => {
                    return jsonItem.tag;
                });
            });

        prmItem.catch(err => {
            console.log('HomeService::query - Problem talking to server');
        });

        return prmItem;
    }
}
