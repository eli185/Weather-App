import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./services/wether-service.service";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatBadgeModule} from "@angular/material/badge";
import {ToastrModule} from "ngx-toastr";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, FavoritesComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: '', component: HomeComponent},
            {path: 'favorites', component: FavoritesComponent}
        ]),
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        FormsModule,
        MatBadgeModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
        MatSelectModule

    ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
