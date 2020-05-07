import { FormControl, FormGroup } from '@angular/forms';
import { TimeUtil } from '../../../../../../util/time-util';
import { RepositorySearchCondition } from '../../../../../service/github-service';

export class RepositorySearchForm {
  defaultRange = {
    from: TimeUtil.addDays(TimeUtil.now(), -7),
    to: TimeUtil.now()
  };
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      range: new FormControl([this.defaultRange.from, this.defaultRange.to])
    });
  }

  get rangeDates() {
    return this.formGroup.get('range');
  }

  get rangeDatesValue(): Date[] {
    return this.rangeDates.value;
  }

  get from(): Date {
    return !!this.rangeDatesValue[0] ? this.rangeDatesValue[0] : this.defaultRange.from;
  }

  get to(): Date {
    return !!this.rangeDatesValue[1] ? this.rangeDatesValue[1] : this.defaultRange.to;
  }

  toInput(locale: string): RepositorySearchCondition {
    return new RepositorySearchCondition(
      locale,
      this.from,
      TimeUtil.addDays(this.to, 1) // 翌00:00までを含めるために1日加える
    );
  }
}
