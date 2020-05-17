import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWaveComponent } from './loading-wave.component';

describe('LoadingWaveComponent', () => {
  let component: LoadingWaveComponent;
  let fixture: ComponentFixture<LoadingWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
