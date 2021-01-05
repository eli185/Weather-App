import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from "../services/wether-service.service";
import {takeUntil} from 'rxjs/operators';
import {Unsubscribe} from '../services/unsubscribe.abstract';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends Unsubscribe implements OnInit {
    favoritesCities: City[];


    ngOnInit(): void {
        WeatherService.themeSubject.pipe(takeUntil(this.unsubscribe$)).subscribe((theme) => this.themeChanged(theme));
    }

    constructor(weatherService: WeatherService) {
        super();
        this.favoritesCities = weatherService.getFavoritesCities();
    }


    themeChanged(theme) {
        if (theme === 'Light-Mode') {
            document.documentElement.style.setProperty('--border-color', 'white');
            document.documentElement.style.setProperty('--text-color', '#0ab4eb');

        } else {
            document.documentElement.style.setProperty('--border-color', 'black');
            document.documentElement.style.setProperty('--text-color', 'white');

        }
    }

}
