import { Component } from '@angular/core';
import {WeatherService} from "./services/wether-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather-App';
  constructor(public weatherService: WeatherService) {
  }
}
