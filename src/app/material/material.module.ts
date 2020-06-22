import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

const MaterialComponents = {
  MatMenuModule
}


@NgModule({
  imports: [MatMenuModule],
  exports: [MatMenuModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MaterialModule { }
 