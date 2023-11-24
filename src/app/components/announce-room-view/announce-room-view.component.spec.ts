import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceRoomViewComponent } from './announce-room-view.component';

describe('AnnounceRoomViewComponent', () => {
  let component: AnnounceRoomViewComponent;
  let fixture: ComponentFixture<AnnounceRoomViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceRoomViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceRoomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
