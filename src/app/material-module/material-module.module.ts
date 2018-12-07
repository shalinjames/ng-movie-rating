import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule
} from "@angular/material";

const includes = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule
];
@NgModule({
  imports: includes,
  exports: includes
})
export class MaterialModuleModule {}
