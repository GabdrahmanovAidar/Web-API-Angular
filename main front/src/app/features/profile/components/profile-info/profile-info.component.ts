import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() info: any;

  constructor(private profileService: ProfileService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  confirmEmail() {
    this.profileService.confirmEmail(this.info.id, this.info.email).subscribe((result: any) => {
      if (result.isSuccess) {
        this.toastr.success('На вашу почту отправлена инструкция для подтвержедния email', 'Успешно');
      } else {
        this.toastr.warning(result.message, 'Ошибка');
      }
    });
  }

}
