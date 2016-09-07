import { Component, OnInit } from '@angular/core';
import {FeedService} from './feed.service';
import {ItemModel} from '../add-item/add-item.service';

      
@Component({
	// moduleId: module.id,
	// selector: 'selector',
	  styles: ['feed.scss'],
	template: `
                <section class="feed-container">
                    <h1>NEWS FEED</h1>
                    <div class="itemContainer" *ngFor="let item of items">
                    <div class="tags-container">
                        <div class="tags">
                            <h4 *ngFor="let tag of item.tags">{{tag}}</h4>
                        </div>
                    </div> 
                    <h7>{{item.addingTime | date: 'short'}}</h7> 
                    	<br>  
                      <a routerLink="/items/{{item.id}}">
                            <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                            <h7>Location</h7>
                        </a>
                        <h5 class="description">{{item.description}}</h5>
                        <img [src]="item.photo" alt="">
                                
                    </div>
                </section>`

})
export class FeedComponent implements OnInit {
	private items: ItemModel[] = [];
	constructor (private feedService: FeedService) { }

	ngOnInit() {
	console.log(this.items);
    const prmItems = this.feedService.query();

    prmItems.then((items : ItemModel[]) => {
      this.items = items;
      console.log('items', this.items);
    });

    prmItems.catch(err => {
      alert('Sorry,cannot load the items, try again later');
      console.log('Cought an error in items', err);
    });
  }

	
}
