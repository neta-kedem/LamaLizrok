    /**
 * Created by Owner on 9/13/2016.
 */

    import { Component, OnInit , Input } from '@angular/core';
    import { ItemModel } from '../add-item/add-item.service'

    @Component({
        // moduleId: module.id,
        selector: 'ngbd-carousel-basic',
        template: `<ngb-carousel>
                          <!--<template ngbSlide *ngFor="let photo of itemModel.photos">-->
                            <!--<img [src]="photo" alt="">-->
                           <!--</template>-->
                         <template ngbSlide>
                            <img [src]="itemModel.photos[0]" alt="Random first slide">
                           </template>
                         <template ngbSlide >
                            <img [src]="itemModel.photos[1]" alt="Random second slide">
                           </template>                      
                           <template ngbSlide>
                            <img [src]="itemModel.photos[2]" alt="Random third slide">
                           </template>
                    </ngb-carousel>`
    })
    export class NgbdCarouselBasic implements OnInit {
        @Input() itemModel: ItemModel;

        constructor() { }

        ngOnInit() {}

    }