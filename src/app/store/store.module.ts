import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { MoviesState } from "./movies.store";

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([MoviesState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  declarations: []
})
export class StoreModule {}
