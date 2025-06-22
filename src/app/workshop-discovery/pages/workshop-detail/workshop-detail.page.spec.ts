import { ComponentFixture, TestBed } from '@angular/core/testing';

import WorkshopDetailPage from './workshop-detail.page';

describe('WorkshopDetailPage', () => {
  let component: WorkshopDetailPage;
  let fixture: ComponentFixture<WorkshopDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
