import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChartComponent, NavbarComponent],
  exports: [ChartComponent, NavbarComponent],
})
export class ComponentsModule {}
