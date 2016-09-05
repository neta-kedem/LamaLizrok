import { Component, OnInit } from '@angular/core';
import {FeedService, ItemModal} from './feed.service'
      
@Component({
	// moduleId: module.id,
	// selector: 'selector',
	  styles: ['feed.scss'],
	template: `<h1>I am a feed</h1>
				<div class="itemContainer" *ngFor="let item of items">
					<h1>{{item.description}}</h1>
					<h3>{{item.addingTime | date: 'medium'}}</h3> 	 	
					<h3>{{item.tags}}</h3> 	 			
							
				</div>`

})
export class FeedComponent implements OnInit {
	private items: ItemModal[] = [];
	constructor (private feedService: FeedService) { }

	ngOnInit() {
	console.log(this.items)
    const prmItems = this.feedService.query();

    prmItems.then((items : ItemModal[]) => {
      this.items = items;
      console.log('items', this.items);
    });

    prmItems.catch(err => {
      alert('Sorry,cannot load the items, try again later');
      console.log('Cought an error in items', err);
    });
  }

	
}
