import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {City, WeatherService} from "../services/wether-service.service";
import {FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {takeUntil} from "rxjs/operators";
import {Unsubscribe} from "../services/unsubscribe.abstract";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends Unsubscribe implements OnInit {
    currentCity = 'Tel Aviv';
    myControl = new FormControl();
    citiesOptions: any;
    currentCityForecastsWeatherData: any;
    currentConditionsData: any;
    currentDegree;
    readonly CELSIUS = 1;
    readonly FAHRENHEIT = 2;


    constructor(public weatherService: WeatherService, private toastr: ToastrService) {
        super();
    }

    ngOnInit(): void {
        this.citiesOptions = [];
        this.currentDegree = this.CELSIUS;
        this.currentCityForecastsWeatherData = this.weatherService.mockForecasts;
        this.currentConditionsData = this.weatherService.mockCurrentCondition;
        WeatherService.themeSubject.pipe(takeUntil(this.unsubscribe$)).subscribe((theme) => this.themeChanged(theme));

    }

     _filter(name: string) {
         if (name === '') {
             this.citiesOptions = [];
         } else {
             const filterValue = name.toLowerCase();
             if (!this.citiesOptions.find((city) => city.LocalizedName === name)) {
                 this.weatherService.getAutoCompleteSearchWeather(filterValue).subscribe(data => this.citiesOptions = data);
             }
         }
     }

    onFavoriteButtonClick() {
        if (this.weatherService.isOnFavorite(this.currentCity)){
            this.weatherService.removeFromFavoritesCities(this.currentCity);
        }
        else {
            this.weatherService.addFavoriteCity(new City (this.currentCity, this.currentConditionsData[0]));
        }
    }

    sendToAPIXU(chosenCity){
        if(chosenCity === ''){
            this.toastr.warning('You can not search with empty filed!');
        }
        else {
            let cityFound = this.citiesOptions.find((city) => city.LocalizedName === chosenCity);
            if (cityFound) {
                this.currentCity = chosenCity;
                this.weatherService.getForecastsWeather(cityFound.Key).subscribe(data => this.currentCityForecastsWeatherData = data);
                this.weatherService.getCurrentWeather(cityFound.Key).subscribe(data => this.currentConditionsData = data);
            } else {
                this.toastr.error('You must choose from the suggestions cities!');
            }
        }

    }

    calculateDegrees(number){
        if (this.currentDegree === this.CELSIUS) {
            return Math.round((number - 32) * 5 / 9);
        }
        else{
            return number;
        }
    }

    onChangeDegreesButtonClick() {
        this.currentDegree = this.currentDegree === this.CELSIUS ? this.FAHRENHEIT : this.CELSIUS;
    }

    themeChanged(theme){
        if( theme === 'Light-Mode') {
            document.documentElement.style.setProperty('--border-color', 'white');
            document.documentElement.style.setProperty('--text-color', '#0ab4eb');

        }
        else{
            document.documentElement.style.setProperty('--border-color', 'black');
            document.documentElement.style.setProperty('--text-color', 'white');

        }
    }
}
