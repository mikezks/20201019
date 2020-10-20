import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';
import { of } from 'rxjs';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.flightsLoad),
      switchMap(action =>
        this.flightService.find(
          action.from,
          action.to
        ).pipe(
          map(flights => FlightBookingActions.flightsLoaded({ flights })),
          catchError(error => of(
            FlightBookingActions.flightsLoadedError({ error })
          ))
        )
      )
    )
  );

  changeFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.flightSearch),
      mergeMap(action => [
        FlightBookingActions.filterUpdate({ from: action.from, to: action.to }),
        FlightBookingActions.flightsLoad({ from: action.from, to: action.to })
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}
}
