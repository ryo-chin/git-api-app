import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingWaveComponent } from './atoms/loading-wave/loading-wave.component';
import { ButtonModule, DropdownModule, TableModule } from 'primeng';
import { ButtonComponent } from './atoms/button/button.component';
import { DropdownComponent } from './atoms/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './moluclues/table/table.component';



@NgModule({
  declarations: [
    LoadingWaveComponent,
    ButtonComponent,
    DropdownComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TableModule
  ],
  exports: [
    LoadingWaveComponent,
    ButtonComponent,
    DropdownComponent
  ]
})
export class UiLibsModule { }
