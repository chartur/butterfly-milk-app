import {Component, Input, OnInit} from '@angular/core';
import AppParams from '../../../params';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})

export class ImagesComponent implements OnInit {

    @Input('student') student: any = false;
    avatar: string = AppParams.avatar();
    slideOptsOne = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: false
    };

    constructor(private photoViewer: PhotoViewer) { }

    ngOnInit() {
    }

    photoViewerFunc(image) {
        this.photoViewer.show(image.path, image.created_at, {share: true});
    }
}
