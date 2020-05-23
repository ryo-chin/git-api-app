import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from '../../model/select-item';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DROPDOWN_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    DROPDOWN_VALUE_ACCESSOR
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() selectItems: SelectItem[];
  @Input() selectedItem: SelectItem;
  @Input() placeholder: string;
  @Output() onClick = new EventEmitter<SelectItem>();
  @Input() disabled = true;

  constructor() { }

  ngOnInit(): void {

  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this.selectedItem = value;
  }

}

