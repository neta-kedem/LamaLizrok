import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';
import {AddItemService} from './add-item.service';
import { Router } from '@angular/router';


@Component({
    // moduleId: module.id,
    selector: 'add-item',
    styleUrls: ['add-item.component.css'],
    template: `<section class="add_item_component">
                    <h1>ADD ITEM</h1>
                    <form action="">
                    <div class="add_item_container">

                    <div class="form-group">
                        <div class="video_box">
                            <video #myVideo [src]="videosrc"></video>
                            <div class="video_overlays">   
                                <button (click)="takePicture()"></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">

                        <canvas class="canvas" #myCanvas style="background:lightgray;"></canvas>
                    </div>

                        <!--<div class="container" >-->
                            <!--<div class="input-field col s12">-->
                    <div class="form-group">

                        <div class="tags_list_component">
                            <label for="tagsList">Choose Tags:</label>
                            <input class="dropbtn" id="tagsList" type="text" class="validate filter-input" [(ngModel)]=currTag (keyup)=filter()>
                        </div> 
                    </div>

                    <div class="form-group">
                            <!--</div>-->
                        <div *ngIf="filteredList.length > 0">
                            <div class="dropdown-content">
                                <div class="dropdown-item" *ngFor="let itemList of filteredList" (click)="selectTag(itemList)">{{itemList}} </div>
                                <!--<ul *ngFor=" let itemList of filteredList" >-->
                                    <!--<li >-->
                                        <!--<a (click)="selectTag(itemList)">{{itemList}}</a>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            </div>
                        </div>
                    </div>
    
                        <div id="textarea" ><button *ngFor="let country of chosenTags" (click)="removeElement(country)">{{country}} <small>x</small></button></div>                       
                    <div class="form-group">
                        <div class="descriptionContainer">
                            <label for="tagsList">Description:</label>
                            <textarea name="description" id="description" ngDefaultControl [(ngModel)]="description" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                        <button (click)="save()">Save</button>
                    </div>
                    </form>
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
        itemList;
        selectedTags = [];
        dataimg: string;
        tag: string;
        position: {};
        addingTime: number;
        description: string;
        chosenTags: string[] = [];
        tags: string[] = [];
        currTag = '';
        filteredList = [];

        constructor(private sanitizer:DomSanitizationService,
                    private addItemService: AddItemService,
                    private router:Router){}

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
                this.context.drawImage(this.video, 0, 0, 320, 240);
                this.context.drawImage(this.video, 0, 0, 640, 480);
                this.dataimg = this.canvas.toDataURL("image/png");
                const navi = <any>navigator;
                this.findPosition(navi);
        }

        save () {
            this.addItemService.save({      photo: this.dataimg,
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
