import { Component } from '@angular/core';
import {City, WeatherService} from "../services/wether-service.service";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
    favoritesCities: City[];

    constructor(weatherService: WeatherService) {
        this.favoritesCities = weatherService.getFavoritesCities();
    }
}
