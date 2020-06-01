import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QuestService } from '../../quest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { phoneValidator } from 'src/app/features/account/validators/phone.validator';
import { presentQuestSchema } from './present-quest.schema';
import { finalize, switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-present-quest',
  templateUrl: './present-quest.component.html',
  styleUrls: ['./present-quest.component.scss']
})
export class PresentQuestComponent implements OnInit {

  buyForm = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = presentQuestSchema;

  constructor(private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private questService: QuestService,
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
          map(val => ({ id: +val.get('id'), type: 'QUEST' })),
          switchMap(res => {
            pres.productId = res.id;
            pres.type = res.type;
            return this.questService.postPresent(pres);
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
