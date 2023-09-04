import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-countdown',
  styleUrls: ['./countdown.component.css'],
  template: `
    <div class="lg bold">{{ $counter | async }}</div>
  `
})
export class CountdownComponent implements OnInit {
  countdown: string = "";
  $counter: Observable<string>;

  constructor() {
    this.$counter = interval(1000).pipe(map(this.countdownTimer));
  }

  ngOnInit() {
  }

  countdownTimer() {
    const difference = +new Date("2023-10-14") - +new Date();
    let remaining = "The wedding is here!";

    if (difference > 0) {
      const parts: { [key: string]: number } = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      remaining = Object.keys(parts).map((part) => {
        const val = parts[part];
        if (val === 1) {
          part = part.substring(0, part.length - 1)
        }
        return `${val} ${part}`;
      }).join(" ");
    }
    return remaining;
  }
}