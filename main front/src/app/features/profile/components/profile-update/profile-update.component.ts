import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { profileUpdateSchema } from './profile-update.schema';
import { ProfileService } from '../../profile.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  @Input() info: any;
  pUpdateForm: FormGroup;
  model: any = {};
  isCodeResponse = false;
  phone: string;
  isState = true;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
 

  constructor(private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder) { }
  private code: any;
  public isModal = true;
  public isError = false;

  ngOnInit() {
    this.buildForm();
    this.fields = profileUpdateSchema;
    this.phone = this.info.phone;



  }

  changeData() {
    debugger;
    if(this.code == "ERROR_LIMITED_REQUEST"){
      this.isError = true;
    }
    else{
      if (this.pUpdateForm.valid) {

        this.ngxLoader.start();
        const model = Object.assign({}, this.pUpdateForm.value);
        this.profileService.updatePhone(model)
          .pipe(finalize(() => this.ngxLoader.stop()))
          .subscribe(() => {
            this.pUpdateForm.reset();
            this.router.navigate(['']);
          },
            (err: any) => {
              if (err) {
                this.toastr.warning('Невалидные данные', 'Ошибка при изменении данных');
              }
            });
      }
    }

    
  }

  onChange(state: any) {
    this.isState = state;
    this.phone = this.pUpdateForm.value.phone;
    this.submit();
  }


  submit() {
    debugger;
    if (this.phone !== this.pUpdateForm.value.phone) {
    
      
      this.profileService.createCode(this.model).subscribe(res => {
        this.code = res;
        if(this.code == 0){
          this.isError = true;
          this.isModal = true;
        }else{
        this.isModal = false;
        this.isError = false;
      }
        if (this.isState == false) {
          this.changeData()
        }
      });
    }
    else {
      this.changeData();
    }
  }



 


  private buildForm() {
    this.info.birthDate = new Date(this.info.birthDate).getDate();
    this.pUpdateForm = this.fb.group({
      firstName: [this.info.firstName],
      lastName: [this.info.lastName],
      patronymicName: [this.info.patronymicName || ''],
      phone: [this.info.phone],
      birthDate: [this.info.birthDate]
    });
    this.model = Object.assign({}, this.pUpdateForm.value);
  }
}
