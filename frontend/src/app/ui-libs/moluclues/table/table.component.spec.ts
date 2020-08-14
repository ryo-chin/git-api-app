import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { TableModule } from 'primeng';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [TableModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items only component.items', () => {
    [
      {title: 'empty', inputs: []},
      {title: 'not empty', inputs: [{name: 'item1'}, {name: 'item2'}]}
    ].forEach(test => {
      component.items = test.inputs;
      fixture.detectChanges();

      const dataItems = fixture.debugElement.queryAll(By.css('[data-table-row]'));
      expect(test.inputs.length).toEqual(dataItems.length);
    });
  });

  it('should display items with dynamic columns', () => {
    const input = {
      columns: [{field: 'field1', header: 'field1'}, {field: 'field2', header: 'field2'}],
      values: [{field1: 'item1', field2: 1}]
    };
    component.columns = input.columns;
    component.items = input.values;
    fixture.detectChanges();

    const headerValues = fixture.debugElement.queryAll(By.css('[data-table-header-value]'))
      .map(e => e.nativeElement.innerHTML.trim());
    input.columns.forEach(col => {
      expect(headerValues.includes(col.header)).toBeTruthy();
    });

    const value = input.values[0];
    const filed1Value = fixture.debugElement.query(By.css('[data-table-column="field1"]')).nativeElement.innerHTML.trim();
    expect(filed1Value).toEqual(value.field1);
    const filed2Value = fixture.debugElement.query(By.css('[data-table-column="field2"]')).nativeElement.innerHTML.trim();
    expect(filed2Value).toEqual(value.field2.toString());
  });
});
