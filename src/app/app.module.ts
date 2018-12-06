import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderModule } from "ngx-order-pipe";
import { StarRatingModule } from "angular-star-rating";

//App modules
import { StoreModule } from "./store";
import { MaterialModuleModule } from "./material-module";

//Components
import { AppComponent } from "./app.component";
import { MovieListItemComponent } from "./components/movie-list-item/movie-list-item.component";
import { NavigationComponent } from "./components/navigation/navigation.component";

@NgModule({
  declarations: [AppComponent, MovieListItemComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    HttpClientModule,
    StoreModule,
    OrderModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
