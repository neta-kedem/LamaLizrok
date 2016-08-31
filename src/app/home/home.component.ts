import { Component, OnInit } from '@angular/core';

@Component({
    styles: [`section {background: lightgray; padding: 10px;width:70%;float:left; box-sizing:border-box;}`],
    template: `<section>
                    <h1>Home sweet Home</h1>
                    <h2>the vary begining of our Lama Lizrok app. wish us luck</h2>  
                </section>`
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
