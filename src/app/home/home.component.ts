import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {DomSanitizationService} from '@angular/platform-browser';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {FormGroup, FormBuilder, Validators, FormControl, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

@Component({
    styles: ['home.scss'],
    template: `<section>
                    <h1>Home sweet Home</h1>
					<div>{{ 'HELLO' | translate:{value: param} }}</div>
					<div>
					  <h2>{{ 'HOME.TITLE' | translate }}</h2>
					  <label>
						{{ 'HOME.SELECT' | translate }}
						<select #langSelect (change)="translate.use(langSelect.value)">
						  <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
						</select>
					  </label>
					</div>
                    <h2>The vary begining of our למה לזרוק app. Wish us luck</h2>
                    <form [formGroup]="frmMonster" (submit)="save()" >
                    	<input type="file" ng2FileSelect [uploader]="uploader"/>
                    	<button type="submit" [disabled]="!frmMonster.valid" class="btn btn-default">Submit</button>
                    </form>
                    <div class="video_box">
  						<video #myVideo [src]="videosrc"></video>
  						<div class="video_overlays">
    						<button (click)="takePicture()"></button>
  						</div>
					</div>
					<canvas class="canvas" #myCanvas style="background:lightgray;"></canvas>

                </section>`,
    directives : [FILE_UPLOAD_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HomeService]
})


export class HomeComponent implements OnInit {

	param: string = "world";
	public uploader:FileUploader;
    private frmMonster:FormGroup;
	videosrc: any;
	@ViewChild("myCanvas") myCanvas;
	@ViewChild("myVideo") myVideo;
	video: any;
	canvas;
	context:CanvasRenderingContext2D;
	dataimg: string;
	tag: string;
	position: {};
	addingTime: number;

    constructor(private homeService:HomeService,
				private formBuilder:FormBuilder,
				private sanitizer:DomSanitizationService,
				private translate: TranslateService) {

   			 	this.uploader = new FileUploader({url: homeService.url});
				translate.addLangs(["en", "heb"]);
				translate.setDefaultLang('en');

				let browserLang = translate.getBrowserLang();
				translate.use(browserLang.match(/en|heb/) ? browserLang : 'en');

				}

    ngOnInit() {
    	this.frmMonster = this.formBuilder.group({});
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

	takePicture () {
		this.context.drawImage(this.video, 100, 100, 320, 240);
		console.log('drawing img')
		// this.context.drawImage(this.video, 0, 0, 640, 480);
		this.dataimg = this.canvas.toDataURL("image/png");
		const navi = <any>navigator;
		this.findPosition(navi);
	}

    save() {
		// if there is a file to upload, use the uploader to update both file and form data
		if (this.uploader.getNotUploadedItems().length) {
			this.uploader.onBuildItemForm = (fileItem:any, form:any) => {
				for (let key of Object.keys(this.frmMonster.value)) {
					form.append(key, this.frmMonster.value[key]);
				}
			};
			this.uploader.onCompleteAll = ()=>alert('woohoo onCompleteAll');
			this.uploader.uploadAll();
		} else {
			// if file upload support is not needed, go regular:
			this.homeService.save(this.frmMonster.value)
				.then(() => {
					alert('woohoo save');
				});
		}
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
}
