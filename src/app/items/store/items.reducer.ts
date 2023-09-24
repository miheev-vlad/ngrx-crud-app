import { createReducer, on } from '@ngrx/store';
import { Item } from './item.interface';
import {
  itemsFetchAPISuccess,
  deleteItemAPISuccess,
  saveItemAPISuccess,
  updateItemAPISuccess,
} from './items.action';

export const initialState: ReadonlyArray<Item> = [];

export const itemReducer = createReducer(
  initialState,
  on(itemsFetchAPISuccess, (_, { allItems }) => {
    return allItems;
  }),
  on(saveItemAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateItemAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteItemAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    return newState;
  })
);
