import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoad = createAction(
  '[FlightBooking] Flights load',
  props<{ from: string, to: string }>()
);

export const flightsLoaded = createAction(
  '[FlightBooking] Flights loaded',
  props<{flights: Flight[] }>()
);

export const flightUpdate = createAction(
  '[FlightBooking] Flight Update',
  props<{flight: Flight }>()
);

export const flightsLoadedError = createAction(
  '[FlightBooking] Flights loaded Error',
  props<{ error: any }>()
);

export const flightSearch = createAction(
  '[FlightBooking] Flight Search',
  props<{ from: string, to: string }>()
);

export const filterUpdate = createAction(
  '[FlightBooking] Filter Update',
  props<{ from: string, to: string }>()
);
