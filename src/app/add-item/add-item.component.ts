import { Component, OnInit, ViewChild } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import {AddItemService} from './add-item.service';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';


@Component({
    // moduleId: module.id,
    selector: 'add-item',
    styleUrls: ['add-item.scss'],
    template: `<section>
                <div class="add_item_component">
                  <h1>{{ 'ADDITEM.TITLE' | translate }}</h1>
                    <div class="add_item_container">
                        <div class="video_box">
                            <video #myVideo [src]="videosrc"></video>
                            <div class="video_overlays">   
                                <button (click)="takePicture()"></button>
                            </div>
                        </div>
                        <div class="img_container">
                            <div *ngFor="let photo of photos"  class="img_container_content">
                                <span (click)="removePicture(photo)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                <img [src]="photo" alt="">
                            </div>    
                        </div>
                        <canvas class="canvas" #myCanvas style="background:lightgray;"></canvas>
                        <div class="tags_list_component">
                            <label for="tagsList">Choose Tags:</label>
                            <input class="dropbtn" id="tagsList" type="text" class="validate filter-input" [(ngModel)]=currTag (keyup)=filter()>
                        </div> 
                        <div *ngIf="filteredList.length > 0">
                            <div class="dropdown-content">
                                <div class="dropdown-item" *ngFor="let itemList of filteredList" (click)="selectTag(itemList)">{{itemList}} </div>
                            </div>
                        </div>
                        <div id="textarea" ><button *ngFor="let country of chosenTags" (click)="removeElement(country)">{{country}} <small>x</small></button></div>                       
                        <div class="descriptionContainer">
                            <label for="tagsList">Description:</label>
                            <textarea name="description" id="description" ngDefaultControl [(ngModel)]="description" cols="30" rows="10"></textarea>
                        </div>
                        <button (click)="save()" [disabled]="!photos.length && !chosenTags.length">Save</button>
                   </div>
                </div>
                </section>
             `
})
export class AddItemComponent implements OnInit {

    videosrc: any;
    @ViewChild("myCanvas") myCanvas;
    @ViewChild("myVideo") myVideo;
    video: any;
    canvas;
    context:CanvasRenderingContext2D;
    // itemList;
    // selectedTags = [];
    tag: string;
    position: {};
    addingTime: number;
    description: string;
    chosenTags: string[] = [];
    tags: string[] = [];
    currTag = '';
    filteredList = [];
    photos: string[]=[];

    constructor(private sanitizer:DomSanitizationService,
                private addItemService: AddItemService,
                private router:Router,
                private translate: TranslateService){
        translate.addLangs(["en", "heb"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|heb/) ? browserLang : 'en');
    }

    ngOnInit() {
        setTimeout(() => {}, 2000);
        const navi = <any>navigator;

        // navi.mediaDevices.getUserMedia = navi.mediaDevices.getUserMedia || navi.mediaDevices.mozGetUserMedia || navi.mediaDevices.webkitGetUserMedia;
        navi.getUserMedia = navi.getUserMedia || navi.mozGetUserMedia || navi.webkitGetUserMedia;
        navi.getUserMedia({video: true},(stream) => {
            let videosrc = URL.createObjectURL(stream);
            this.videosrc = this.sanitizer.bypassSecurityTrustUrl(videosrc);
        }, (err) => console.log(err));

        this.canvas = this.myCanvas.nativeElement;
        this.context = this.canvas.getContext("2d");

        let video =this.myVideo.nativeElement;
        this.video = video;
        this.addItemService.queryTags().then(res => {
            this.tags = res;
        });
    }

    findPosition(navi) {
        if (navi.geolocation) {
            console.log('ENTERING getLocation');
            navi.geolocation.getCurrentPosition((pos)=>{
                this.position = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
                this.addingTime = pos.timestamp;
            });
        } else {
            console.log('NOT');
        }
    }

    takePicture () {
        // this.context.drawImage(this.video, 0, 0, 320, 240);
        this.context.drawImage(this.video, 0, 0, 640, 480);
        this.photos.push(this.canvas.toDataURL("image/png"));
        const navi = <any>navigator;
        this.findPosition(navi);
    }

    removePicture(pic) {
        this.photos = this.photos.filter(photo => photo !== pic);
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
