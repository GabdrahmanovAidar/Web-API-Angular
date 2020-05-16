import { OnInit, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

export interface ICourseCard {
  imageUrl: string;
  name: string;
  createdDate: string;
}

export interface IGrouped<TItem> {
  groupLength: number;
  items: TItem[];
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  //public news: GenericDataSource<INewsCard>;
  private apiUrl = environment.apiUrl + '/course/GetList';
  constructor(private http: HttpClient,private router: Router, private courseService: CourseService) { }
  public show = false;
  public course: any;
  public courseShow:Course;
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true  
  };  

    ngOnInit() {
        
        this.courseService.getCourse().subscribe(course1 => {
            this.course = course1;
            this.onParticipateClick(this.course.list[0].id);
            console.log(this.course);
        });
  }
  public onParticipateClick(id: number) {
    this.courseService.getCourseId(id).subscribe(courseId =>{
        this.courseShow = courseId;
        console.log(this.courseShow);
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
