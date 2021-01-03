import {Component, OnInit} from '@angular/core';
import {City, WeatherService} from "../services/wether-service.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map, startWith} from "rxjs/operators";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    currentCity = 'Tel Aviv';
    myControl = new FormControl();
    citiesOptions: any;
    currentCityForecastsWeatherData: any;
    currentConditionsData: any;


    constructor(public weatherService: WeatherService) {
    }

    ngOnInit(): void {
        this.citiesOptions = [];
        this.currentCityForecastsWeatherData = this.weatherService.mockForecasts;
        this.currentConditionsData = this.weatherService.mockCurrentCondition;
    }

     _filter(name: string) {
        if( name === '') {
            this.citiesOptions = [];
        }
        else {
            const filterValue = name.toLowerCase();
            console.log(filterValue);
            this.weatherService.getAutoCompleteSearchWeather(filterValue).subscribe(data =>  this.citiesOptions = data);
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
        this.currentCity = chosenCity;
        let cityKey = this.citiesOptions.find((city) => city.LocalizedName === chosenCity).Key;
        this.weatherService.getForecastsWeather(cityKey).subscribe(data =>  this.currentCityForecastsWeatherData = data);
        this.weatherService.getCurrentWeather(cityKey).subscribe(data => this.currentConditionsData = data)

    }

    calculateCelsius(number){
        return Math.round((number - 32) * 5/9);
    }

}
