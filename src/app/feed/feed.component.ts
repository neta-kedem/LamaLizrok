import { Component, OnInit } from '@angular/core';
import {FeedService, ItemModel} from './feed.service';
      
@Component({
	// moduleId: module.id,
	// selector: 'selector',
	  styles: ['feed.scss'],
	template: `<h1>I am a feed</h1>
				<div class="itemContainer" *ngFor="let item of items">
					<h1>{{item.tag}}</h1>
                  <a routerLink="/items/{{item.id}}" class="btn btn-success">Location</a>
					<h4>{{item.description}}</h4>
					<h3>{{item.addingTime | date: 'medium'}}</h3> 	 	
					<img [src]="item.photo" alt="">
							
				</div>`

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
