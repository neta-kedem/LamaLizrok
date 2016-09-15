/**
 * Created by Owner on 9/13/2016.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

import { AddItemService2 } from './add-item-2.service'


@Component({
    // selector: 'selector',
    styleUrls: ['add-item-camera.scss', 'add-item-desc.scss'],
    template: `
                <section class="add-item-camera">
                    <div class="videoContainer" [style.height]="height">
                        <div class="video_overlays_1">   
                            <button  class="btn btn-default btn-sm">
                                <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                            </button>
                            <!--<button  >-->
                                 <a (click)="next()" routerLink="add-item-desc" class="btn btn-default btn-sm">Next</a>
                            <!--</button>-->
                        </div>
                        <video #myVideo [src]="videosrc"></video>
                        <div class="video_overlays_2">   
                            <button class="btn" (click)="takePicture()"></button>
                        </div>
                    </div>
                    <div class="img_container_1_0">
                        <div class="img_container_1">
                            <div *ngFor="let photo of photos"  class="img_container_content_1">
                                <span (click)="removePicture(photo)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                <img [src]="photo" alt="">
                             </div>    
                        </div>
                    </div>
                    <canvas #myCanvas></canvas>
                </section>
                <section class="add_item_desc">
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
})
export class AddItemCameraComponent implements OnInit {
    videosrc: any;
    @ViewChild("myCanvas") myCanvas;
    @ViewChild("myVideo") myVideo;
    video: any;
    canvas;
    context:CanvasRenderingContext2D;
    display: string = 'none';
    // height = '100%'
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
                private addItemService2: AddItemService2) {}

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
        // this.addItemService.queryTags().then(res => {
        //     this.tags = res;
        // });
    }
    takePicture () {
        // this.context.drawImage(this.video, 0, 0, 320, 240);
        // if (this.photos.length > 0)
        // this.isPhoto();
        this.display = 'flex';
        // this.height = '490px';
        this.context.drawImage(this.video, 0, 0, 640, 480);
        this.photos.push(this.canvas.toDataURL("image/png"));
        const navi = <any>navigator;
        this.findPosition(navi);
    }

    removePicture(pic) {
        this.photos = this.photos.filter(photo => photo !== pic);
    }

    findPosition(navi) {
        if (navi.geolocation) {
            navi.geolocation.getCurrentPosition((pos)=>{
                this.position = {longitude:pos.coords.longitude, latitude:pos.coords.latitude};
                this.addingTime = pos.timestamp;
            });
        } else {
            console.log('NOT');
        }
    }
     next() {
         this.addItemService2.photos = this.photos;
     }

    // isPhoto() {
    //     return 'flex';
    // }
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