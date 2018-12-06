import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from "@angular/material";

const includes = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
];
@NgModule({
  imports: includes,
  exports: includes
})
export class MaterialModuleModule {}
