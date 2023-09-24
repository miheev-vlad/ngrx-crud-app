import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { itemReducer } from './store/items.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from './store/items.effects';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ItemsRoutingModule } from './items-routing.module';
import { CardComponent } from './home/components/card/card.component';

@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent, CardComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    StoreModule.forFeature('items', itemReducer),
    EffectsModule.forFeature([ItemsEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ItemsModule {}
