import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";

export class City {
  name: string;
  conditionsData : any;

  constructor(name , conditionsData) {
    this.name = name;
    this.conditionsData = conditionsData;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  // Observable sources
  static themeSubject = new Subject<any>();
  private favoritesCities: City[] = [];
  currentTheme;
  themesOptions = ['Light-Mode', 'Dark-Mode'];

  static notifyThemeChanged(theme) {
    this.themeSubject.next(theme);
  }

  addFavoriteCity(favoritesCity) {
    this.favoritesCities.push(favoritesCity);
  }

  removeFromFavoritesCities(favoritesCity) {
    const city = this.favoritesCities.find((city) => city.name === favoritesCity);
    const index: number = this.favoritesCities.indexOf(city);
    this.favoritesCities.splice(index, 1);
  }

  isOnFavorite(cityToCheck: string) {
    let isExist = false;
    this.favoritesCities.forEach((city) => {
          if (city.name === cityToCheck) {
            isExist = true;
          }
        }
    );
    return isExist;
  }

  getFavoritesCities(): City[] {
    return this.favoritesCities;
  }

  getCurrentWeather(locationKey) {
    return this.http.get(
        'http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    );
  }

  getAutoCompleteSearchWeather(searchTerm): Observable<Object> {
    return this.http.get(
        'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr&q=' + searchTerm
    );
  }


  getForecastsWeather(locationKey) {
    return this.http.get(
        'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    );
  }

}
