import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';
import {AddItemService} from './add-item.service';



@Component({
    // moduleId: module.id,
    selector: 'add-item',
    styles: ['app.component.scss'],
    template: `<h1>Add item</h1>
                <!--<h4>{{}}</h4>-->
                <button (click)="takePicture()">take a picture</button>
                <video #myVideo width="320" height="240" [src]="videosrc"></video>
                <canvas #myCanvas width="320" height="240" style="background:lightgray;"></canvas>
                <select name="itemsList">
                        <option *ngFor="let item of itemList">{{item}}</option>
                </select>
                 `
})
export class AddItemComponent implements OnInit {

        videosrc: any;
        @ViewChild("myCanvas") myCanvas;
        @ViewChild("myVideo") myVideo;
        video: any;        
        context:CanvasRenderingContext2D;
        itemList;

        constructor(private sanitizer:DomSanitizationService,
                        private addItemService: AddItemService){}

        ngOnInit() { 
                
                this.itemList = this.addItemService.items;
                console.log(this.itemList)
                setTimeout(() => {}, 2000);
                const navi = <any>navigator;

                this.findPosition(navi);

                navi.getUserMedia = navi.getUserMedia || navi.mozGetUserMedia || navi.webkitGetUserMedia;
                navi.getUserMedia({video: true},(stream) => {
                    let videosrc= URL.createObjectURL(stream);
                    this.videosrc = this.sanitizer.bypassSecurityTrustUrl(videosrc);
                }, (err) => console.log(err));

                let canvas = this.myCanvas.nativeElement;
                this.context = canvas.getContext("2d");

                let video =this.myVideo.nativeElement;                
                this.video = video;
        }
        findPosition (navi) {            
                if (navi.geolocation) {
                        console.log('ENTERING getLocation')                        
                        navi.geolocation.getCurrentPosition(this.showPosition);
                } else {
                        console.log('NOT')    
                }
        }
        showPosition(position) {
                console.log(position)
        }

        takePicture () {                 
                this.context.drawImage(this.video, 0, 0, 640, 480)
        }
}


// context.drawImage(video, 0, 0, 640, 480);