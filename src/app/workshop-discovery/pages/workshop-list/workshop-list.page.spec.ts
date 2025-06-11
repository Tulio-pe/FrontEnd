import { ComponentFixture, TestBed } from '@angular/core/testing';

import WorkshopListPage from './workshop-list.page';

describe('WorkshopListPage', () => {
  let component: WorkshopListPage;
  let fixture: ComponentFixture<WorkshopListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
