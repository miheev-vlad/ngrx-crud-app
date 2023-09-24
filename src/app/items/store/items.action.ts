import { createAction, props } from '@ngrx/store';
import { Item } from './item.interface';

export const invokeItemsAPI = createAction(
  '[Items API] invoke items Fetch API'
);

export const itemsFetchAPISuccess = createAction(
  '[Items API] items Fetch API success',
  props<{ allItems: Item[] }>()
);

export const invokeSaveItemAPI = createAction(
  '[Items API] invoke save item API',
  props<{ payload: Item }>()
);

export const saveItemAPISuccess = createAction(
  '[Items API] save item API success',
  props<{ response: Item }>()
);

export const invokeUpdateItemAPI = createAction(
  '[Items API] invoke update item API',
  props<{ payload: Item }>()
);

export const updateItemAPISuccess = createAction(
  '[Items API] update item API success',
  props<{ response: Item }>()
);

export const invokeDeleteItemAPI = createAction(
  '[Items API] invoke delete item API',
  props<{ payload: Item }>()
);

export const deleteItemAPISuccess = createAction(
  '[Items API] delete item API success',
  props<{ response: Item }>()
);
