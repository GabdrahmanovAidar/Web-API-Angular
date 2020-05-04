import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { MessageService } from "primeng/components/common/messageservice";
import { AdminSettings } from "app/modules/admin/modules/settings/domain/interfaces/AdminSettings";
import { AdminSettingsRepository } from "app/modules/admin/modules/settings/domain/repositories/AdminSettingsRepository";

@Component({
  selector: 'settings-pages-index',
  templateUrl: './template.html'
})
export class AdminSettingsPagesIndex implements OnInit, OnDestroy {
  public loading: boolean = false;
  public settings: AdminSettings;

  private destroyed$ = new Subject<void>();

  constructor(private settingsRepository: AdminSettingsRepository,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService ) {
  }

  ngOnInit() {
    this.loadAdminSettings();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public onFormSuccessSubmit($event: AdminSettings): void {
    this.loading = true;
    this.settingsRepository.save($event)
      .finally(() => this.loading = false)
      .subscribe((settings: AdminSettings) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Настройки сохранены'
        });
      });
  }

  public onAdminSettingsCancel($event): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  private loadAdminSettings(): void {
    this.loading = true;
    this.settingsRepository.load()
      .finally(() => this.loading = false)
      .subscribe((settings: AdminSettings) => this.settings = settings);
  }

}
