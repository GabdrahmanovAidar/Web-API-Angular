import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { supportSchema } from './support.schema';
import { SupportService } from './support.service';
import Support from './support.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private supportService: SupportService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.fields = supportSchema;
  }

  submit() {
    if (this.supportForm.valid) {
      const support: Support = Object.assign({}, this.supportForm.value);
      this.supportService.addMessage(support).subscribe(() => {
        this.supportForm.disable();
        this.toastr.success('Мы ответим вам в ближайшее время', 'Ваше сообщение отправлено');
        this.router.navigateByUrl('/home');
      });
    }
  }

}
