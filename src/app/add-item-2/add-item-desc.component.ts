/**
 * Created by Owner on 9/14/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';



import { AddItemService2 } from './add-item-2.service'


@Component({
    // moduleId: module.id,
    // selector: 'selector',
    template: `        <section class="add_item_desc">
                          <div class="img_container_1">
                            <div *ngFor="let photo of photos"  class="img_container_content_1">
                                <!--<span (click)="removePicture(photo)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>-->
                                <img [src]="photo" alt="">
                            </div>    
                        </div>
                         <div class="inner-addon left-addon">
                           <!--<i class="glyphicon glyphicon-tag"></i>      -->
                            <input class="form-control" id="tagsList" type="text" class="validate filter-input" 
                            [(ngModel)]=currTag (keyup)=filter() placeholder="Choose Tags:">
                        </div> 
 
                        <div *ngIf="filteredList.length > 0">
                            <div class="dropdown-content">
                                <div class="dropdown-item" *ngFor="let itemList of filteredList" (click)="selectTag(itemList)">{{itemList}} </div>
                            </div>
                        </div>
                        <div class="chosenTags">
                            <button *ngFor="let country of chosenTags" (click)="removeElement(country)">
                            {{country}} 
                                <small>x</small>
                            </button>
                        </div>                       
                        
                        <div class="inner-addon left-addon">
                            <!--<i class="glyphicon glyphicon-pencil"></i> -->
                            <textarea name="description" id="description" ngDefaultControl 
                            [(ngModel)]="description" cols="30" rows="10"
                            placeholder="Write a description:"
                            class="desc"></textarea>
                        </div>
                        
                        <button class="btn btn-success" (click)="save()" >Save</button>
                        </section>`
    //**TODO: fix the disable:
        // [disabled]="!photos.length && !chosenTags.length"
})
export class AddItemDescComponent implements OnInit {
    tag: string;
    position: {};
    addingTime: number;
    description: string;
    chosenTags: string[] = [];
    tags: string[] = [];
    currTag = '';
    filteredList:string[] = [];
    photos: string[]= this.addItemService.photos;

    constructor(
                private addItemService: AddItemService2,
                private router:Router,
                private translate: TranslateService){
        translate.addLangs(["en", "heb"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|heb/) ? browserLang : 'en');
    }

    ngOnInit() {
        console.log(this.photos)
        this.addItemService.queryTags().then(res => {
            this.tags = res;
        });
    }

    save () {
        this.addItemService.save({
            // photo: this.dataimg,
            photos: this.photos,
            tags: this.chosenTags,
            position: this.position,
            addingTime: this.addingTime,
            description: this.description})
            .then(() => {
                this.router.navigate(['/items']);
            });
    }

    filter() {
        if (this.currTag !== ""){
            this.filteredList = this.tags.filter(function(el){
                return el.toLowerCase().indexOf(this.currTag.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

    selectTag(item){
        this.currTag='';
        this.filteredList = [];
        this.chosenTags.push(item);
        this.tags.splice(this.tags.indexOf(item), 1);
    }

    removeElement(item){
        this.chosenTags.splice(this.chosenTags.indexOf(item), 1);
        this.tags.push(item);
    }

}

}