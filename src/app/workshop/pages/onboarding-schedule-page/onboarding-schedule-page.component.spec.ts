import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSchedulePageComponent } from './onboarding-schedule-page.component';

describe('OnboardingSchedulePageComponent', () => {
  let component: OnboardingSchedulePageComponent;
  let fixture: ComponentFixture<OnboardingSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSchedulePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
