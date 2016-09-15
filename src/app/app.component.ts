import {Component, ViewEncapsulation} from "@angular/core";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {TranslateService} from 'ng2-translate/ng2-translate';

import * as io from "socket.io-client";




@Component({
    selector: 'app',
    // template: `HI THERE`,
    // moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToastsManager, {provide: 'io', useValue: io}]

})
export class AppComponent {
    public isCollapsed: boolean = true;

    constructor (private translate: TranslateService) {
    translate.addLangs(["en", "heb"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|heb/) ? browserLang : 'en');

    }

}

