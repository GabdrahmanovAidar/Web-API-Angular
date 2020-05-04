import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from 'app/modules/users/domain/interfaces/User';
import { UserRepository } from 'app/modules/users/domain/repositories/UserRepository';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { removeFromArray } from 'app/helpers/immutable';

import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserRoleEnum } from 'app/modules/users/domain/enums/UserRoleEnum';

@Component({
  selector: 'user-pages-index',
  templateUrl: './template.html'
})

export class UserPagesIndex {
  private defaultPaginationParams = { per_page: 10, page: 1 };
  public loading: boolean = false;
  public users: ArrayMeta<User>;
  public usersItemTotal: number;
  public filters: any = Object.assign({}, this.defaultPaginationParams, {
    type:'',
    user_name: null,
  });
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public UserRoleEnum = UserRoleEnum;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private userRepository: UserRepository,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.filterForm = this.buildForm();
    const queryParams = this.route.snapshot.queryParams;
    this.changeFiltersAndLoad(queryParams);
  }

  public onPaginationChange(changes): void {
    this.filters = Object.assign({}, this.filters, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadUsers();
  }

  public usersTrackByFunc(index, users: User): number {
    return users.id;
  }

  public nextPage(can: boolean) {
    if (can) {
      this.onPaginationChange({ page: this.filters.page + 1 });
    }
  }

  public prevPage(can: boolean) {
    if (can) {
      this.onPaginationChange({ page: this.filters.page - 1 });
    }
  }

  private changeUrlQueryParams(queryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  private changeFiltersAndLoad(changes) {
    this.filters = Object.assign({}, this.filters, changes);
    this.loadUsers();
  }

  private loadUsers(): void {

    const fValue = this.filterForm.value;
    this.filters.user_name = fValue.user_name;

    this.loading = true;
    this.userRepository.search(this.filters)
      .finally(() => this.loading = false)
      .subscribe((users: ArrayMeta<User>) => {
        this.users = users;
        this.usersItemTotal = users.meta.total;
      });
  }


  public onUserAction(actionType, user, index: number): void {
    switch (actionType) {
      case 'user':
        this.showUserConfirmationDialog(user, index);
        break;
        case 'deliveler':
        this.showDeliverConfirmationDialog(user, index);
        break;
    }
  }

  

  private showUserConfirmationDialog(user: User, index: number) {
    user.type = UserRoleEnum.User;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите назаначить "${user.username}" пользователем ?`,
      acceptLabel: 'Назначить',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.userRepository.update(user)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${user.username} назначен пользователем`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${user.username} не был назаначен пользователем`
            });
          });
      }
    });
  }

  private showDeliverConfirmationDialog(user: User, index: number) {
    user.type = UserRoleEnum.Deliveler;
    this.confirmationService.confirm({
      header: 'Подтверждение изменения',
      message: `Вы уверены что хотите назаначить "${user.username}" доставщиком ?`,
      acceptLabel: 'Назначить',
      rejectLabel: 'Отмена',
      icon: 'fa fa-trash',
      accept: () => {
        this.userRepository.update(user)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успешно',
              detail: `${user.username} назначен доставщиком`
            });
          }, () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: `${user.username} не был назаначен доставщиком`
            });
          });
      }
    });
  }

  

  public onSubmit($event) {
    $event.preventDefault();
    this.loadUsers();

  }

  private buildForm() {
    return this.fb.group({
      type: [''],
      user_name:['']
    });
  }

  public onFiltersChange(changes): void {
    this.filters = Object.assign({}, this.defaultPaginationParams, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadUsers();
  }

}