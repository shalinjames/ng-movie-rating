import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule,
  MatTooltipModule
} from "@angular/material";

const includes = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule,
  MatTooltipModule
];
@NgModule({
  imports: includes,
  exports: includes
})
export class MaterialModuleModule {}
