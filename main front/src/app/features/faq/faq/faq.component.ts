import { Component, OnInit } from '@angular/core';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq: Array<FAQ>;
  selectRow: any;
  isLoad = false;
  isLoadSelectedRow = false;
  constructor(private service: FaqService) { }

  ngOnInit() {
    this.getFaq();
  }
  public onSelectRow(id: number) {
    this.service.getSelectedRow(id).subscribe(response => {
      this.selectRow = response;
      this.isLoadSelectedRow = true;
    });
  }

  private getFaq() {
    this.service.getFAQ().subscribe(response => {
      this.faq = response;
      this.isLoad = true;
    })
  }


}
