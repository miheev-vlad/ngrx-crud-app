import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from './item.interface';

export const selectItems = createFeatureSelector<Item[]>('items');

export const selectItemById = (itemId: number) => {
  return createSelector(selectItems, (items: Item[]) => {
    let itemById = items.filter((_) => _.id === itemId);
    if (itemById.length === 0) {
      return null;
    }
    return itemById[0];
  });
};
