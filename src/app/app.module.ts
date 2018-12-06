import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "./store";
import { MovieListItemComponent } from "./components/movie-list-item/movie-list-item.component";

@NgModule({
  declarations: [AppComponent, MovieListItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
