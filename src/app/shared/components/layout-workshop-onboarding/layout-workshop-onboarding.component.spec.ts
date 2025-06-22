import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWorkshopOnboardingComponent } from './layout-workshop-onboarding.component';

describe('LayoutWorkshopOnboardingComponent', () => {
  let component: LayoutWorkshopOnboardingComponent;
  let fixture: ComponentFixture<LayoutWorkshopOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutWorkshopOnboardingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutWorkshopOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
