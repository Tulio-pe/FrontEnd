import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavegationBarComponent } from './side-navegation-bar.component';

describe('SideNavegationBarComponent', () => {
  let component: SideNavegationBarComponent;
  let fixture: ComponentFixture<SideNavegationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavegationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavegationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
