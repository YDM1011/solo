import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCoinLinkComponent } from './food-coin-link/food-coin-link.component';
import { FormatNumberPipe } from './format-number.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FoodCoinLinkComponent
  ],
  declarations: [FoodCoinLinkComponent, FormatNumberPipe]

})
export class FoodCoinModule { }
