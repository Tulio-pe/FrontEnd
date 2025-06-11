import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingWorkshopInfoPageComponent } from './onboarding-workshop-info-page.component';

describe('OnboardingWorkshopInfoPageComponent', () => {
  let component: OnboardingWorkshopInfoPageComponent;
  let fixture: ComponentFixture<OnboardingWorkshopInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingWorkshopInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingWorkshopInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
