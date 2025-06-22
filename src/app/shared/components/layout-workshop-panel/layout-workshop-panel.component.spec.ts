import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWorkshopPanelComponent } from './layout-workshop-panel.component';

describe('LayoutWorkshopPanelComponent', () => {
  let component: LayoutWorkshopPanelComponent;
  let fixture: ComponentFixture<LayoutWorkshopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutWorkshopPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutWorkshopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
