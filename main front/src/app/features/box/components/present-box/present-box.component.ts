import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BoxService } from '../../box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { presentBoxSchema } from './present-box.schema';
import { map, switchMap, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-present-box',
  templateUrl: './present-box.component.html',
  styleUrls: ['./present-box.component.scss']
})
export class PresentBoxComponent implements OnInit {

  buyForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = presentBoxSchema;

  constructor(
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.buyForm = this.fb.group({
      cityType: [false]
    });
  }

  submit() {
    if (this.buyForm.valid) {
      this.ngxLoader.start();
      const pres = Object.assign({}, this.buyForm.value);
      this.route.paramMap
        .pipe(
          map(val => ({ id: +val.get('id'), type: 'BOX' })),
          switchMap(res => {
            pres.productId = res.id;
            pres.type = res.type;
            return this.boxService.postPresent(pres);
          })
        )
        .subscribe(() => {
          this.buyForm.reset();
          this.ngxLoader.stop();
        }, () => {
          this.toastr.warning('Невалидные данные', 'Ошибка при отправлении заявки на подарок');
          this.ngxLoader.stop();
        });
    }
  }

}
