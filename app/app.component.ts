import { Component, OnInit, ViewChild } from '@angular/core';
import { GMapComponent } from './components/map.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
  <div>
    <input type="text" 
    placeholder="Search a city" 
    [ngModel]="cityName"
    #cityInput
    />
    <hr />

    <meteo [city]="cityName" [headerTempContent]="altWidgetHeader" [bodyTempContent]="altWidgetBody"></meteo>
    <ng-template #altWidgetHeader>
      <div class="card-header ">Herndon weather</div>
    </ng-template>
    <ng-template #altWidgetBody let-data="data" let-weatherIconURL="weatherIconURL">
    <h5 class="card-title"> <img [src]="weatherIconURL + data?.weather[0].icon +'.png'"> {{data?.weather[0].description}} / {{data?.main.temp}}°</h5>
    </ng-template>
  </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('cityInput') cityInput: any;
  cityName: string = 'London';

  ngOnInit(): void {
    Observable.fromEvent(this.cityInput.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 1)
      .debounceTime(1000)
      .subscribe((text: string) => this.go(text));
  }

  go(text): void {
    this.cityName = text; // update map
  }
}

/**
 * EXERCISE
 *
 * Nothing to do... let's invent something  : P
 */
