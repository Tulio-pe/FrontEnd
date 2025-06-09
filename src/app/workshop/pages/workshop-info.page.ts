import { Component } from '@angular/core';
import { WorkshopInfoComponent } from '../components/workshop-info/workshop-info.component';

@Component({
  selector: 'app-workshop-info-page',
  standalone: true,
  imports: [WorkshopInfoComponent],
  template: '<app-workshop-info></app-workshop-info>',
  styles: []
})
export class WorkshopInfoPage {}
