import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConnectableObservable, merge, Observable, of, Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, publish, publishReplay, share, switchMap, tap } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerPublish$: ConnectableObservable<number>;
  subscription: Subscription;
  fromControl = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // this.rxjsDemo();
    // this.publishDemo();

    this.flights$ =
      this.fromControl.valueChanges.pipe(
        filter(value => value.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        tap(_ => this.loading = true),
        switchMap(from => this.load(from)),
        tap(_ => this.loading = false)
      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 3000).pipe(
      tap(num => console.log('Log from Pipe', num)),
      // share()
    );

    /* this.subscription = this.timer$
      .subscribe(console.log) */
  }

  publishDemo(): void {
    this.timerPublish$ = of(1, 2, 3).pipe(
      publish()
    ) as ConnectableObservable<number>;

    /* setTimeout(() => {
      console.log('Connect');
      this.timerPublish$.connect();
    }, 3000); */

    console.log('Subscription');
    this.timerPublish$.pipe(
      tap(_ => console.log('Callback'))
    ).subscribe(console.log);

    console.log('Connect');
    this.timerPublish$.connect();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}
