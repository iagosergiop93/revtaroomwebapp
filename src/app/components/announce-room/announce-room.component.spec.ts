import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceRoomComponent } from './announce-room.component';

describe('AnnounceRoomComponent', () => {
  let component: AnnounceRoomComponent;
  let fixture: ComponentFixture<AnnounceRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
