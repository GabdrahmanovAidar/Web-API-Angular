import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Russian } from "app/libs/flatpickr/FlatpickrRussian";
import { AdminStatisticRepository } from "app/modules/admin/modules/statistic/domain/repositories/AdminStatisticRepository";
import { AdminStatistic } from "app/modules/admin/modules/statistic/domain/interfaces/AdminStatistic";
const moment = require('moment');

const validationMessages = require('./validation-messages.json');

@Component({
    selector: 'admin-statistic-pages-statistic',
    templateUrl: './template.html',
    styleUrls: ['./styles.scss']
})
export class AdminStatisticPagesAdminStatistic implements OnInit {
  public loading: boolean = false;
  public chartData: any;
  public filterForm: FormGroup;
  public showFormErrors: boolean = false;
  public data;
  public calendarOptionsFrom: any;
  public calendarOptionsUntil: any;

  public validationMessages = validationMessages;

  private fieldsRequirement = {
    from: true,
    until: true
  };

  constructor(private statisticRepository: AdminStatisticRepository,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.buildForm();
    this.setupDatePickersConfig();
    this.loadAdminStatistic();
  }

  public onSubmit($event) {
    $event.preventDefault();
    if (this.filterForm.valid) {
      this.loadAdminStatistic();
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
      defaultDate: moment.utc().subtract(7, 'days').local().format('DD.MM.YYYY'),
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

  private loadAdminStatistic(): void { 

    const fValue = this.filterForm.value;
    const filters = {
      from: this.decodeDate(fValue.from),
      until: this.decodeDate(fValue.until)
    };

    this.loading = true;
    this.statisticRepository.search(filters)
      .finally(() => this.loading = false)
      .subscribe((statistic: AdminStatistic) => {
        const labels = statistic.bookings.map((si) => {
          return moment(si.date, 'YYYY-MM-DDTHH:mm:ss').format('DD.MM.YYYY');
        });
        this.chartData = {
          labels,
          datasets: [
            {
              label: 'Записи на мойки',
              data: statistic.bookings.map((si) => {
                return si.count;
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
      return moment(date[0]).format('YYYY-MM-DDTHH:mm:ss');
    }
    return date;
  }

  private buildForm() {
    return this.fb.group({
      from: [moment.utc().subtract(7, 'days').local().format('DD.MM.YYYY'), Validators.required],
      until: [moment.utc().local().format('DD.MM.YYYY'), Validators.required],
    });
  }
}
