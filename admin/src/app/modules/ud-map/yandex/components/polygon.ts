import {
  Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange, Input, Output, OnInit,
  SimpleChanges
} from '@angular/core';

import { UDMapYandexPolygonManager } from "app/modules/ud-map/yandex/services/polygon-manager";
import { Subscription } from "rxjs/Subscription";

@Directive({
  selector: 'ud-map-ya-polygon',
})
export class UDMapYandexPolygon implements OnDestroy, OnInit, OnChanges {
  private _geometry: any;
  @Input()
  set geometry(value) {
    this._geometry = value;
  }

  get geometry() {
    return this._geometry == null ? undefined : [this._geometry];
  }

  @Input() editorDrawingCursor: string = 'crosshair';
  @Input() editorMaxPoints: number;
  @Input() fillColor: string = '#949CFF';
  @Input() fillOpacity: number = .44;
  @Input() strokeColor: string = '#949CFF';
  @Input() strokeWidth: number = 4;
  @Input() isEditable: boolean = true;
  @Input() hintContent: string;
  @Output() geometryChange = new EventEmitter<any>();

  private observableSubscriptions: Subscription[] = [];
  private isCreated: boolean = false;
  private isEditing: boolean = false;

  constructor(private polygonManager: UDMapYandexPolygonManager) {
  }

  ngOnInit() {
    this.createPolygon();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isCreated) {
      if (changes['geometry']) {
        this.polygonManager.updateGeometry(this);
        if (this.isEditable && !this.isEditing) {
          this.startEditing();
        }
      }
    }
  }

  ngOnDestroy() {
    this.polygonManager.deletePolygon(this);
    this.observableSubscriptions.forEach((s) => s.unsubscribe());
  }

  private startEditing() {
    this.polygonManager.startEditing(this)
      .then(() => this.isEditing = true);
  }

  private createPolygon() {
    this.polygonManager.addPolygon(this, this.geometry, {
      hintContent: this.hintContent
    }, {
      editorDrawingCursor: this.editorDrawingCursor,
      editorMaxPoints: this.editorMaxPoints,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth
    }).then((polygon) => {
      if (this.isEditable) {
        this.startEditing();
      }
      this.isCreated = true;
      this.addEventListeners();
    });
  }

  private addEventListeners() {
    const gs = this.polygonManager.createEventObservable('geometrychange', this)
      .subscribe((event: any) => {
        const geometryData = event.get('originalEvent').originalEvent;
        const newCoordinates = geometryData.newCoordinates[0];
        this.geometry = newCoordinates;
        this.geometryChange.emit(newCoordinates);
      });
    this.observableSubscriptions.push(gs);
    const es = this.polygonManager.createEventObservable('editorstatechange', this)
      .subscribe((event: any) => {
        const drawingState = event.get('originalEvent').originalEvent;
        if (drawingState.newDrawing === false) {
          this.isEditing = false;
        }
      });
    this.observableSubscriptions.push(es);
  }
}
