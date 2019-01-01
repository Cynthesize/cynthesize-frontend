import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';

// Adapted from @AndrewPoyntz
// https://github.com/AndrewPoyntz/time-ago-pipe
@Pipe({
  name: 'timeDiff',
  pure: false
})
export class TimeDiffPipe implements PipeTransform, OnDestroy {
  private timer: number;

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(value: string) {
    this.removeTimer();

    const d = new Date(value);
    const now = new Date();
    let seconds = Math.round((now.getTime() - d.getTime()) / 1000);
    const isFuture = seconds < 0;
    seconds = Math.abs(seconds);
    const timeToUpdate = this.getSecondsUntilUpdate(seconds) * 1000;

    // Mark for check after timeToUpdate
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });

    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.44));
    const years = Math.round(Math.abs(days / 365));
    return this.calculateString(isFuture, seconds, minutes, hours, days, months, years);
  }

  ngOnDestroy() {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) {
      return 2; // Update every 2 seconds
    } else if (seconds < hr) {
      return 30; // Update every 30 seconds
    } else if (seconds < day) {
      return 300; // Update every 5 mins
    } else {
      return 3600; // Update every 1 hour
    }
  }

  private calculateString(
    isFuture: boolean,
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
    months: number,
    years: number
  ) {
    if (seconds <= 5 && !isFuture) {
      return 'just now';
    }

    let statement;
    if (seconds <= 45) {
      statement = 'a few seconds';
    } else if (seconds <= 90) {
      statement = '1 minute';
    } else if (minutes <= 45) {
      statement = minutes + ' minutes';
    } else if (minutes <= 90) {
      statement = 'an hour';
    } else if (hours <= 22) {
      statement = hours + ' hours';
    } else if (hours <= 36) {
      statement = 'a day';
    } else if (days <= 25) {
      statement = days + ' days';
    } else if (days <= 45) {
      statement = 'a month';
    } else if (days <= 345) {
      statement = months + ' months';
    } else if (days <= 545) {
      statement = 'a year';
    } else {
      // (days > 545)
      statement = years + ' years';
    }

    return isFuture ? `in ${statement}` : `${statement} ago`;
  }
}
