/**
 * Created by Owner on 9/6/2016.
 */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FeedService, ItemModel} from './feed.service';



@Component({
    // selector: 'selector',
    template: `<h1>hello map</h1>
                <sebm-google-map [latitude]="lat" [longitude]="lng">
                  <sebm-google-map-marker [latitude]="lat" [longitude]="lng"></sebm-google-map-marker>
                </sebm-google-map>`
})
export class MapComponent implements OnInit {

    private item : ItemModel;

    private lat: number = 51.678418;
    private lng: number = 7.809007;
    constructor(private route: ActivatedRoute,
                private feedService: FeedService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
             console.log('Params are: ', params);
            const id = params['id'];
            const prmKid = this.feedService.get(id);
            prmKid.then((item: ItemModel) => {
                this.item = item;
                console.log('this.item.position', this.item.position)
               this.lat = this.item.position.latitude;
                this.lng = this.item.position.longitude;
                // console.log('this.item',this.item)
            });
        });
    }
    
}