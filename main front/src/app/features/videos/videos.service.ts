import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Videos } from './models/videos.model';

@Injectable({
    providedIn: 'root'
  })
export class VideosService{
    
    
    constructor(private client: HttpClient){ }


    public getVideos(): Observable<any>{
         return this.client.get<any>(environment.apiUrl+'/videos?status=ACTIVE');
    }
}