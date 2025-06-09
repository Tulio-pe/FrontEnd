import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWorkShopPageComponent } from './dashboard-work-shop-page.component';

describe('DashboardWorkShopPageComponent', () => {
  let component: DashboardWorkShopPageComponent;
  let fixture: ComponentFixture<DashboardWorkShopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWorkShopPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWorkShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
