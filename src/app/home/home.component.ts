import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

import {FormGroup, FormBuilder, Validators, FormControl, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

@Component({
    styles: [`section {background: lightgray; padding: 10px;width:70%;float:left; box-sizing:border-box;}`],
    template: `<section>
                    <h1>Home sweet Home</h1>
                    <h2>The vary begining of our למה לזרוק app. Wish us luck</h2>
                    <form [formGroup]="frmMonster" (submit)="save()" >
                    	<input type="file" ng2FileSelect [uploader]="uploader"/>
                    	<button type="submit" [disabled]="!frmMonster.valid" class="btn btn-default">Submit</button>
                    </form>
                </section>`,
    directives : [FILE_UPLOAD_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HomeService]
})


export class HomeComponent implements OnInit {

	public uploader:FileUploader;
    private frmMonster:FormGroup;

    constructor(private homeService:HomeService, private formBuilder:FormBuilder) {
    	this.uploader = new FileUploader({url: homeService.url});
    }

    ngOnInit() {
    	this.frmMonster = this.formBuilder.group({});
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
}
