import { OnInit, Component } from '@angular/core';
import { NewsService } from '../news.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface INewsCard {
  imageUrl: string;
  title: string;
  createdDate: string;
}

export interface IGrouped<TItem> {
  groupLength: number;
  items: TItem[];
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  //public news: GenericDataSource<INewsCard>;
  private apiUrl = environment.apiUrl + '/news/GetList';
  constructor(private http: HttpClient,private router: Router, private newsService: NewsService) { }
  public show = false;
  public news: any;
  public newsShow:News;
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true  
  };  

    ngOnInit() {
        
        this.newsService.getNews().subscribe(news1 => {
            this.news = news1;
            this.onParticipateClick(this.news.list[0].id);
            console.log(this.news);
        });
  }
  public onParticipateClick(id: number) {
    this.newsService.getNewsId(id).subscribe(newsId =>{
        this.newsShow = newsId;
        console.log(this.newsShow);
        this.show = true;
    })
}
  // public get hasItems() {
  //   return this.news && this.news.count && this.news.count !== 0;
  // }

  // public get isLoaded() {
  //   return this.news && this.news.isLoaded.value;
  // }

  // private createSource() {
  //   const setting = {} as ISourceSettings;

  //   this.news = new GenericDataSource<INewsCard>(this.http, this.apiUrl, setting);
  // }

}
