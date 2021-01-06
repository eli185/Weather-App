import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";

export class City {
  name: string;
  conditionsData: any;

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
  mockForecasts = {
    "Headline": {
      "EffectiveDate": "2021-01-05T19:00:00+02:00",
      "EffectiveEpochDate": 1609866000,
      "Severity": 7,
      "Text": "Mild Tuesday night",
      "Category": "heat",
      "EndDate": "2021-01-06T07:00:00+02:00",
      "EndEpochDate": 1609909200,
      "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2021-01-03T07:00:00+02:00",
        "EpochDate": 1609650000,
        "Temperature": {
          "Minimum": {
            "Value": 52,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 5,
          "IconPhrase": "Hazy sunshine",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
      },
      {
        "Date": "2021-01-04T07:00:00+02:00",
        "EpochDate": 1609736400,
        "Temperature": {
          "Minimum": {
            "Value": 54,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 73,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 2,
          "IconPhrase": "Mostly sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 35,
          "IconPhrase": "Partly cloudy",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
      },
      {
        "Date": "2021-01-05T07:00:00+02:00",
        "EpochDate": 1609822800,
        "Temperature": {
          "Minimum": {
            "Value": 56,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 73,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 4,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 33,
          "IconPhrase": "Clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
      },
      {
        "Date": "2021-01-06T07:00:00+02:00",
        "EpochDate": 1609909200,
        "Temperature": {
          "Minimum": {
            "Value": 55,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 6,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 36,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
      },
      {
        "Date": "2021-01-07T07:00:00+02:00",
        "EpochDate": 1609995600,
        "Temperature": {
          "Minimum": {
            "Value": 53,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 72,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 3,
          "IconPhrase": "Partly sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 38,
          "IconPhrase": "Mostly cloudy",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
      }
    ]
  };
  mockCurrentCondition = [
    {
      "LocalObservationDateTime": "2021-01-03T13:31:00+02:00",
      "EpochTime": 1609673460,
      "WeatherText": "Hazy sunshine",
      "WeatherIcon": 5,
      "HasPrecipitation": false,
      "PrecipitationType": null,
      "IsDayTime": true,
      "Temperature": {
        "Metric": {
          "Value": 19.3,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 67,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
    }
  ];

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
        'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    );
  }

  getAutoCompleteSearchWeather(searchTerm): Observable<Object> {
    return this.http.get(
        'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr&q=' + searchTerm
    );
  }


  getForecastsWeather(locationKey) {
    return this.http.get(
        'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    );
  }

}
