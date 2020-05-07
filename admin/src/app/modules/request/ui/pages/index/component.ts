import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { removeFromArray } from 'app/helpers/immutable';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestStatusEnum } from 'app/modules/request/domain/enums/RequestStatusEnum';
import { Request } from 'app/modules/request/domain/interfaces/Request';
import { HttpClient } from '@angular/common/http';
import { RequestRepository } from 'app/modules/request/domain/repositories/RequestRepository';

@Component({
  selector: 'request-pages-index',
  templateUrl: './template.html'
})

export class RequestPagesIndex {
  private defaultPaginationParams = { per_page: 10, page: 1 };
  public loading: boolean = false;
  public requests: ArrayMeta<Request>;
  public requestsItemTotal: number;
  public filters: any = Object.assign({}, this.defaultPaginationParams, {
    name:'',
    level: null,
  });
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public RequestStatusEnum = RequestStatusEnum;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private requestRepository: RequestRepository,
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
    this.loadRequests();
  }

  public requestsTrackByFunc(index, requests: Request): number {
    return requests.Id;
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
    this.loadRequests();
  }

  private loadRequests(): void {

    const fValue = this.filterForm.value;
    this.filters.name = fValue.name;

    this.loading = true;
    this.requestRepository.search(this.filters)
      .finally(() => this.loading = false)
      .subscribe((requests: ArrayMeta<Request>) => {
        this.requests = requests;
        this.requestsItemTotal = requests.meta.total;
      });
  }

  public onSubmit($event) {
    $event.preventDefault();
    this.loadRequests();

  }

  private buildForm() {
    return this.fb.group({
      type: [''],
      request_name:['']
    });
  }

  public onFiltersChange(changes): void {
    this.filters = Object.assign({}, this.defaultPaginationParams, changes);
    this.changeUrlQueryParams(this.filters);
    this.loadRequests();
  }

}