import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitListPageComponent } from './commit-list-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommitListPageComponent', () => {
  let component: CommitListPageComponent;
  let fixture: ComponentFixture<CommitListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitListPageComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
