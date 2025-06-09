import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarsPageComponent } from './list-cars-page.component';

describe('ListCarsPageComponent', () => {
  let component: ListCarsPageComponent;
  let fixture: ComponentFixture<ListCarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCarsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
