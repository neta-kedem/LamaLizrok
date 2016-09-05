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
                        <select name="itemsList">
                                <option *ngFor="let item of itemList">{{item}}</option>
                        </select>

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

        constructor(private sanitizer:DomSanitizationService,
                        private addItemService: AddItemService){}

        ngOnInit() { 
                
                this.itemList = this.addItemService.items;
                console.log(this.itemList);
                setTimeout(() => {}, 2000);
                const navi = <any>navigator;

                this.findPosition(navi);

                navi.getUserMedia = navi.getUserMedia || navi.mozGetUserMedia || navi.webkitGetUserMedia;
                navi.getUserMedia({video: true},(stream) => {
                    let videosrc= URL.createObjectURL(stream);
                    this.videosrc = this.sanitizer.bypassSecurityTrustUrl(videosrc);
                }, (err) => console.log(err));

                this.canvas = this.myCanvas.nativeElement;
                this.context = this.canvas.getContext("2d");

                let video =this.myVideo.nativeElement;                
                this.video = video;
        }
        findPosition (navi) {            
                if (navi.geolocation) {
                        console.log('ENTERING getLocation');
                        navi.geolocation.getCurrentPosition(this.showPosition);
                } else {
                        console.log('NOT');
                }
        }
        showPosition(position) {
                console.log(position);
        }

        takePicture () {                 
                this.context.drawImage(this.video, 0, 0, 640, 480);
        }
        save () {
                let dataURL = this.canvas.toDataURL("image/png");
                console.log('save component', dataURL);
                this.addItemService.save(dataURL);
                    // .then((item) => {
                    //         console.log('saved', item);
                    // });
        }
}
