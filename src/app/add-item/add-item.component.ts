import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';


@Component({
    // moduleId: module.id,
    selector: 'add-item',
    template: `<h1>Add item</h1>
                <video width="640" height="480" [src]="videosrc"></video>
                 `
                // <video autoplay="true" id="videoElement"></video>
                // <video id="video" width="640" height="480" autoplay></video>
                // <button id="snap">Snap Photo</button>
                // <canvas id="canvas" width="640" height="480"></canvas>
                //  <input type="file" accept="image/*" capture="camera" />
})
export class AddItemComponent implements OnInit {

        videosrc: any;

        constructor(private sanitizer:DomSanitizationService){}

        ngOnInit() { 
                setTimeout(() => {}, 2000);
                const navi = <any>navigator;
                navi.getUserMedia = navi.getUserMedia || navi.mozGetUserMedia || navi.webkitGetUserMedia;
                navi.getUserMedia({video: true},(stream) => {
                    let videosrc= URL.createObjectURL(stream);
                    this.videosrc = this.sanitizer.bypassSecurityTrustUrl(videosrc);
                }, (err) => console.log(err));  

        }
}
