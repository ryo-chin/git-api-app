import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaleListPageComponent } from './resale-list-page.component';

describe('ResaleListPageComponent', () => {
  let component: ResaleListPageComponent;
  let fixture: ComponentFixture<ResaleListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaleListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
