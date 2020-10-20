import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFilter = createSelector(
  // Selektoren
  selectFlightBookingState,
  // Projektor
  state => state.filter
);

export const selectFlights = createSelector(
  // Selektoren
  selectFlightBookingState,
  // Projektor
  state => state.flights
);

export const selectFilteredFlights = createSelector(
  // Selektoren
  selectFlights,
  selectFilter,
  // Projektor
  (flights, filter) => flights.filter(f => f.from === filter.from && f.to === filter.to)
);
