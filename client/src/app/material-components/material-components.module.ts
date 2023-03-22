import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

const MatComponents = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatMenuModule,
  MatCardModule,
  MatAutocompleteModule,
  MatSelectModule,
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})
export class MaterialComponentsModule {}
