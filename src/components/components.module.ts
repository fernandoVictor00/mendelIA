import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NavbarComponent],
  exports: [ NavbarComponent]
})
export class ComponentsModule {}
