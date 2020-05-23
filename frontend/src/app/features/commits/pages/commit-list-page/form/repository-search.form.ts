import { FormControl, FormGroup } from '@angular/forms';
import { TimeUtil } from '../../../../../../util/time-util';
import { RepositorySearchCondition } from '../../../../../service/github-service';

export class RepositorySearchForm {
  selectableDateRanges = this.prepareDateRanges();
  defaultRange = this.selectableDateRanges[1].value;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      range: new FormControl([this.defaultRange[0], this.defaultRange[1]])
    });
  }

  get rangeDates() {
    return this.formGroup.get('range');
  }

  get rangeDatesValue(): Date[] {
    return this.rangeDates.value;
  }

  set rangeDatesValue(value: Date[]) {
    this.rangeDates.setValue(value);
  }

  get from(): Date {
    return !!this.rangeDatesValue[0] ? this.rangeDatesValue[0] : this.defaultRange[0];
  }

  get to(): Date {
    return !!this.rangeDatesValue[1] ? this.rangeDatesValue[1] : this.defaultRange[1];
  }

  toInput(locale: string): RepositorySearchCondition {
    return new RepositorySearchCondition(
      locale,
      this.from,
      TimeUtil.addDays(this.to, 1) // 翌00:00までを含めるために1日加える
    );
  }

  private prepareDateRanges() {
    const now = TimeUtil.now();
    return [
      {label: 'today', value: [now, now]},
      {label: 'oneWeek', value: [TimeUtil.addDays(TimeUtil.now(), -7), now]},
    ];
  }
}
