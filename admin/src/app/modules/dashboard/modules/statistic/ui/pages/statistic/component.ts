import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Russian } from "app/libs/flatpickr/FlatpickrRussian";
import { LoginService } from "app/modules/auth/domain/services/LoginService";
// import { Company } from "app/modules/companies/domain/interfaces/Company";
import { CompanyRepository } from "app/modules/companies/domain/repositories/CompanyRepository";
import { DBStatisticRepository } from "app/modules/dashboard/modules/statistic/domain/repositories/DBStatisticRepository";
import { DBStatistic } from "app/modules/dashboard/modules/statistic/domain/interfaces/DBStatistic";
// import { moveEmbeddedView } from "@angular/core/src/view";
import{DBStatisticPayment} from "../../../domain/interfaces/DBStatisticPayment";
import {DBStatisticPaymentRepository} from "../../../domain/repositories/DBStatisticPaymentRepository";
import { DBStatisticWriteOffRepository } from '../../../domain/repositories/DBStatisticWriteOffRepository';
import { DBStatisticWriteOff } from '../../../domain/interfaces/DBStatisticWriteOff';


const moment = require('moment');

const validationMessages = require('./validation-messages.json');

@Component({
    selector: 'db-statistic-pages-statistic',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class DBStatisticPagesStatistic implements OnInit {
  public loading: boolean = false;
  public recordsChartData: any;
  public financeChartData: any;
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public calendarOptionsFrom: any;
  public calendarOptionsUntil: any;
  public companyLoading: boolean = false;
  public chartData: any;

  public validationMessages = validationMessages;

  company_id:any;
  public payments:ArrayMeta<DBStatisticPayment>;
  public writeOffs:Array<DBStatisticWriteOff>;
  private defaultPaginationParams = { per_page: 5, page: 1 };
  public filters = Object.assign({}, this.defaultPaginationParams,{
    status: 'ACTIVE'
  },this.company_id);

  private fieldsRequirement = {
    from: true,
    until: true
  };

  constructor(private statisticRepository: DBStatisticRepository,
              private loginService: LoginService,
              private fb: FormBuilder,
              private route:ActivatedRoute,
              private paymentRepository:DBStatisticPaymentRepository,
              private writeOffRepository:DBStatisticWriteOffRepository) {}

  ngOnInit() {
    this.filterForm = this.buildForm();
    this.setupDatePickersConfig();
    this.loadStatistic();
    // this.loadCompanyData();
    this.loadStatistic();
    const queryParams = this.route.snapshot.queryParams;
    this.changeFiltersAndLoad(queryParams);

  }

  public onSubmit($event) {
    $event.preventDefault();
    if (this.filterForm.valid) {
      this.loadStatistic();
    } else {
      this.showFormErrors = true;
    }
  }

  public isRequired(fieldName): boolean {
    return this.fieldsRequirement[fieldName];
  }

  private setupDatePickersConfig() {
    this.calendarOptionsFrom = {
      locale: Russian,
      dateFormat: 'd.m.Y',
      enableTime: false,
      defaultDate: moment.utc().subtract(30, 'days').local().format('DD.MM.YYYY'),
      multiple: false
    
    };
    
    this.calendarOptionsUntil = {
      locale: Russian,
      dateFormat: 'd.m.Y',
      enableTime: false,
      defaultDate: moment.utc().local().format('DD.MM.YYYY'),
      multiple: false
    };
  }

  // private loadCompanyData() {
  //   const companyId = this.loginService.getFromState('company.id');
  //   if (companyId) {
  //     this.companyLoading = true;
  //     this.companyRepository.loadById(companyId)
  //       .finally(() => this.companyLoading = false)
  //       .subscribe((company) => {
  //         this.company = company;
  //       })
  //   } else {
  //     // todo show company error
  //   }
  // }

  private loadStatistic(): void {
    const fValue = this.filterForm.value;
     const filters = {
       from: this.decodeDate(fValue.from),
       until: this.decodeDate(fValue.until)
    
      };
    this.loading = true;
     this.statisticRepository.search(filters)
           .finally(() => this.loading = false)
       .subscribe((statistic: DBStatistic) => {
         const labels = statistic.payments.map((si) => {
           return moment(si.date, 'YYYY-MM-DDTHH:mm:ss').format('DD.MM.YYYY');
         });
         this.recordsChartData = {
           labels,
           datasets: [
         {
               label: 'Прибыль',
               data: statistic.payments.map((si) =>  {
                return si.sum;
              }),
               fill: false,
               borderColor: '#4ECDC4',
               lineTension: 0,
               pointRadius: 8,
               pointHoverRadius: 10
             }
           ]
         };
       });
  }

   private decodeDate(date: Date[] | string | null): any {
    if (date != null) {
       if (typeof date === 'string') {
         return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DDTHH:mm:ss');
       }
        const dat= moment(date[0]).format('YYYY-MM-DDTHH:mm:ss');
       return moment(date[0]).format('YYYY-MM-DDTHH:mm:ss');
     }
     return date;
   }

  private buildForm() {
    return this.fb.group({
      from: [moment.utc().subtract(30, 'days').local().format('DD.MM.YYYY'), Validators.required],
      until: [moment.utc().local().format('DD.MM.YYYY'), Validators.required],
    });
  
  }

  private changeFiltersAndLoad(changes) {
    this.filters = Object.assign({}, this.filters, changes);
    this.filters.company_id =this.loginService.getFromState('company.id');
    this.loadPayment();
    this.loadWriteOff();
  }

  private loadPayment():void{
    this.loading = true;
    this.paymentRepository.search(this.filters)
    .finally(()=>this.loading=false)
    .subscribe((payment:ArrayMeta<DBStatisticPayment>)=>{
      this.payments=payment
    })
  }

  private loadWriteOff():void{
    this.loading = true;
    this.writeOffRepository.search(this.filters)
    .finally(()=>this.loading=false)
    .subscribe((writeOff:ArrayMeta<DBStatisticWriteOff>)=>{
      this.writeOffs=writeOff
    })
  }
}
