import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromFlightBooking from '../+state';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  searchForm: FormGroup;
  urgent = false;
  flights$: Observable<Flight[]>;

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private store: Store<fromFlightBooking.FlightBookingAppState>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      urgent: []
    });

    this.store.pipe(select(fromFlightBooking.selectFilter))
      .subscribe(
        filter => this.searchForm.patchValue(filter)
      );
    this.flights$ = this.store.pipe(select(fromFlightBooking.selectFilteredFlights));
  }

  search(): void {
    this.store.dispatch(
      fromFlightBooking.flightSearch({
        from: this.searchForm.controls.from.value,
        to: this.searchForm.controls.to.value
      })
    );
  }

  delay(): void {
    // this.flightService.delay();

    this.flights$.pipe(take(1))
      .subscribe(flights => {
        const oldFlight = flights[0];
        const oldDate = new Date(oldFlight.date);
        const date = new Date(oldDate.getTime() + 15 * 60 * 1_000).toISOString();
        const flight = { ...oldFlight, date };

        this.store.dispatch(
          fromFlightBooking.flightUpdate({ flight })
        );
      });
  }
}
