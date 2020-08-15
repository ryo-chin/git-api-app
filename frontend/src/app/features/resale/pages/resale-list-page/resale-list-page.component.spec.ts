import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaleListPageComponent } from './resale-list-page.component';
import { UiLibsModule } from '../../../../ui-libs/ui-libs.module';
import { ProductRepository } from '../../../../repostiory/product/product-repository.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ResaleListPageComponent', () => {
  let component: ResaleListPageComponent;
  let fixture: ComponentFixture<ResaleListPageComponent>;
  let repository: ProductRepository;
  let spyRepository;
  const testResaleData = [
    {
      id: '1',
      name: 'item1',
      url: 'https://resale.com/item1',
      onSale: false
    },
    {
      id: '2',
      name: 'item2',
      url: 'https://resale.com/item2',
      onSale: true
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResaleListPageComponent],
      imports: [UiLibsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaleListPageComponent);
    component = fixture.componentInstance;
    repository = TestBed.inject(ProductRepository);
    spyRepository = spyOn(repository, 'list').and;
    spyRepository.returnValue(of(testResaleData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display resale items', () => {
    const displayedRowsCount = fixture.debugElement.queryAll(By.css('[data-table-row]')).length;
    expect(displayedRowsCount).toEqual(testResaleData.length);
  });
});
