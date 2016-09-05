import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';
import {AddItemService} from './add-item.service';



@Component({
    // moduleId: module.id,
    selector: 'add-item',
    styles: ['app.component.scss'],
    template: `<section class="add_item_component">
                        <h1>Add item</h1>
                        <div class="video_box">
                                <video #myVideo [src]="videosrc"></video>
                                <div class="video_overlays">   
                                        <button (click)="takePicture()"></button>
                                </div>
                        </div>                              
                        <canvas class="canvas" #myCanvas style="background:lightgray;"></canvas>
                        <select name="itemsList" [(ngModel)]="tag">
                                <option  *ngFor="let item of itemList">{{item}}</option>
                        </select>
                        <textarea name="description" id="description" ngDefaultControl [(ngModel)]="description" cols="30" rows="10"></textarea>

                        <button (click)="save()">Save</button>
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
        private selectedTags = [];
        dataimg: string;
        tag;
        position;
        addingTime;
        description;

        constructor(private sanitizer:DomSanitizationService,
                    private addItemService: AddItemService){}

        ngOnInit() { 
                
                this.itemList = this.addItemService.items;
                console.log(this.itemList);
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
        addTag(tag) {
                this.selectedTags.push(tag);

        }

        save () {
                this.addItemService.save({      photo:this.dataimg,
                                                tags:this.tag,
                                                position: this.position,
                                                addingTime: this.addingTime,
                                                description: this.description});
        }
}
