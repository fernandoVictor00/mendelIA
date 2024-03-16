import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CardComponent } from '../../components/card/card.component';
import { ComponentsdModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ComponentsdModule
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
