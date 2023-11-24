import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingInfoComponent } from './housing-info.component';

describe('HousingInfoComponent', () => {
  let component: HousingInfoComponent;
  let fixture: ComponentFixture<HousingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
