import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class ComponentsModule {}
