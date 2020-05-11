import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from '../../videos.service';
import { Videos } from '../../models/videos.model';

@Component({
    selector: 'app-stock',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    public videosItem: Videos[];

    constructor(private router: Router, private videosService: VideosService) { }

    ngOnInit() {

        this.videosService.getVideos().subscribe(videos => {
            this.videosItem = videos;
            console.log(this.videosItem);
        });

    }
}
