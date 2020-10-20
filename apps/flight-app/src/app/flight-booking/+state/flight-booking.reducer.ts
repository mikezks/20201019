import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  filter: { from: string, to: string };
}

export const initialState: State = {
  flights: [],
  filter: { from: 'Hamburg', to: 'Graz' }
};

export interface FlightBookingAppState {
  flightBooking: State
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const from = action.flights[0]?.from;
    const to = action.flights[0]?.to;
    const oldFlights = (from && to && state.flights.filter(f => !(f.from === from && f.to === to))) || state.flights;
    const flights = action.flights;
    return { ...state, flights: [ ...oldFlights, ...flights ] };
  }),
  on(FlightBookingActions.flightUpdate, (state, action) => {
    const flights = state.flights.map(f => f.id === action.flight.id ? action.flight : f);
    return { ...state, flights };
  }),
  on(FlightBookingActions.filterUpdate, (state, action) => {
    const filter = { from: action.from, to: action.to };
    return { ...state, filter };
  })
);

