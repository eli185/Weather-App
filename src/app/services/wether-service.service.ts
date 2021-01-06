import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";

export class City {
  name: string;
  conditionsData : any;

  constructor(name , conditionsData) {
    this.name = name;
    this.conditionsData = conditionsData
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private favoritesCities: City[] = [];
  currentTheme;
  themesOptions =  ['Light-Mode', 'Dark-Mode'];
   mockAutoComplete = [
    {
      "Version": 1,
      "Key": "328328",
      "Type": "City",
      "Rank": 10,
      "LocalizedName": "London",
      "Country": {
        "ID": "GB",
        "LocalizedName": "United Kingdom"
      },
      "AdministrativeArea": {
        "ID": "LND",
        "LocalizedName": "London"
      }
    },
    {
      "Version": 1,
      "Key": "57911",
      "Type": "City",
      "Rank": 23,
      "LocalizedName": "Longyan",
      "Country": {
        "ID": "CN",
        "LocalizedName": "China"
      },
      "AdministrativeArea": {
        "ID": "FJ",
        "LocalizedName": "Fujian"
      }
    },
    {
      "Version": 1,
      "Key": "77666",
      "Type": "City",
      "Rank": 25,
      "LocalizedName": "Longgang District",
      "Country": {
        "ID": "CN",
        "LocalizedName": "China"
      },
      "AdministrativeArea": {
        "ID": "GD",
        "LocalizedName": "Guangdong"
      }
    },
    {
      "Version": 1,
      "Key": "2580116",
      "Type": "City",
      "Rank": 25,
      "LocalizedName": "Longhua District",
      "Country": {
        "ID": "CN",
        "LocalizedName": "China"
      },
      "AdministrativeArea": {
        "ID": "GD",
        "LocalizedName": "Guangdong"
      }
    }
  ];
   moackTelAviv = [{"Version":1,"Key":"215854","Type":"City","Rank":31,"LocalizedName":"Tel Aviv","Country":{"ID":"IL","LocalizedName":"Israel"},"AdministrativeArea":{"ID":"TA","LocalizedName":"Tel Aviv"}},{"Version":1,"Key":"3431644","Type":"City","Rank":45,"LocalizedName":"Telanaipura","Country":{"ID":"ID","LocalizedName":"Indonesia"},"AdministrativeArea":{"ID":"JA","LocalizedName":"Jambi"}},{"Version":1,"Key":"300558","Type":"City","Rank":45,"LocalizedName":"Telok Blangah New Town","Country":{"ID":"SG","LocalizedName":"Singapore"},"AdministrativeArea":{"ID":"05","LocalizedName":"South West"}},{"Version":1,"Key":"325876","Type":"City","Rank":51,"LocalizedName":"Telford","Country":{"ID":"GB","LocalizedName":"United Kingdom"},"AdministrativeArea":{"ID":"TFW","LocalizedName":"Telford and Wrekin"}},{"Version":1,"Key":"169072","Type":"City","Rank":51,"LocalizedName":"Telavi","Country":{"ID":"GE","LocalizedName":"Georgia"},"AdministrativeArea":{"ID":"KA","LocalizedName":"Kakheti"}},{"Version":1,"Key":"230611","Type":"City","Rank":51,"LocalizedName":"Telsiai","Country":{"ID":"LT","LocalizedName":"Lithuania"},"AdministrativeArea":{"ID":"TE","LocalizedName":"Telšiai"}},{"Version":1,"Key":"2723742","Type":"City","Rank":55,"LocalizedName":"Telégrafo","Country":{"ID":"BR","LocalizedName":"Brazil"},"AdministrativeArea":{"ID":"PA","LocalizedName":"Pará"}},{"Version":1,"Key":"186933","Type":"City","Rank":55,"LocalizedName":"Tela","Country":{"ID":"HN","LocalizedName":"Honduras"},"AdministrativeArea":{"ID":"AT","LocalizedName":"Atlántida"}},{"Version":1,"Key":"3453754","Type":"City","Rank":55,"LocalizedName":"Telaga Asih","Country":{"ID":"ID","LocalizedName":"Indonesia"},"AdministrativeArea":{"ID":"JB","LocalizedName":"West Java"}},{"Version":1,"Key":"3453755","Type":"City","Rank":55,"LocalizedName":"Telagamurni","Country":{"ID":"ID","LocalizedName":"Indonesia"},"AdministrativeArea":{"ID":"JB","LocalizedName":"West Java"}}];
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

  // Observable sources
  static themeSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  addFavoriteCity(favoritesCity) {
    this.favoritesCities.push(favoritesCity);
  }

  removeFromFavoritesCities(favoritesCity) {
    const city = this.favoritesCities.find((city) => city.name === favoritesCity);
    const index: number = this.favoritesCities.indexOf(city);
    this.favoritesCities.splice(index, 1);
  }

  isOnFavorite(cityToCheck : string){
    let isExist = false;
    this.favoritesCities.forEach( (city) => {
          if (city.name === cityToCheck) {
            isExist = true;
          }
        }
    );
    return isExist;
  }

  getFavoritesCities() : City[] {
    return this.favoritesCities;
  }

  getCurrentWeather(locationKey){
    // return this.http.get(
    //     'http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    // );
    return of( new HttpResponse({ status: 200, body: this.mockCurrentCondition }).body);

  }

  getAutoCompleteSearchWeather(searchTerm) : Observable<Object>{
    // return this.http.get(
    //     'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr&q=' + searchTerm
    // );
     return of( new HttpResponse({ status: 200, body: this.moackTelAviv }).body);
  }


  getForecastsWeather(locationKey){
    // return this.http.get(
    //     'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=jCj6Vr94FmFTGVv8GL3GnRWZI3AMa3Gr'
    // );
    return of( new HttpResponse({ status: 200, body: this.mockForecasts }).body);
  }

  static notifyThemeChanged(theme) {
    this.themeSubject.next(theme);
  }

}
