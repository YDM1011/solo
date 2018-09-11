import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCoinComponent } from './food-coin.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FoodCoinComponent],
  exports: [FoodCoinComponent]
})
export class FoodCoinModule { }
