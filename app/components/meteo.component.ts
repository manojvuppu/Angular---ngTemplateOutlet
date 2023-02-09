import { Http } from '@angular/http';

import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'meteo',
  template: `
  
  
    <div class="card text-white bg-secondary m-5" style="max-width: 18rem;">
    <ng-container [ngTemplateOutlet]="headerTempContent || defaultHeaderTempContent"></ng-container>
    <ng-template #defaultHeaderTempContent>
      <div class="card-header ">Today's weather</div>
    </ng-template>
    <ng-container [ngTemplateOutlet]="bodyTempContent || defaultBodyTempContent" [ngTemplateOutletContext]="{weatherIconURL:weatherIconURL,data:data}"></ng-container>
    <div class="card-body">
      <ng-template #defaultBodyTempContent>
        <h5 class="card-title"> <img [src]="weatherIconURL + data?.weather[0].icon +'.png'"> {{data?.weather[0].description}} / {{data?.main.temp}}°</h5>
      </ng-template> 
    </div>
      <div class="card-footer ">Footer</div>
    </div>
  
  
  `,
})
export class MeteoComponent implements OnChanges {
  @Input() city: string;
  @Input() headerTempContent!: TemplateRef<any>;
  @Input() bodyTempContent: TemplateRef<any>;
  data: any;

  // @ViewChild('container',{read:ViewContainerRef}) container!:ViewContainerRef;
  // @ViewChild('defaultTempContent') tempTemplate!:TemplateRef<any>

  weatherIconURL = 'https://openweathermap.org/img/w/';
  weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherParams = '&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534';

  constructor(private http: Http) {}

  ngOnChanges(changes: SimpleChanges) {
    const { city } = changes;
    this.fetchData(city.currentValue);
  }

  fetchData(text = '') {
    const url = `${this.weatherAPI}${text}${this.weatherParams}`;

    this.http.get(url).subscribe((res) => {
      this.data = res.json();
    });
  }

  // ngAfterViewInit(){
  //   this.container.createEmbeddedView(this.tempTemplate)
  // }
}
