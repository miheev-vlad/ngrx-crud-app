import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ItemsService } from '../items.service';
import {
  itemsFetchAPISuccess,
  deleteItemAPISuccess,
  invokeItemsAPI,
  invokeDeleteItemAPI,
  invokeSaveItemAPI,
  invokeUpdateItemAPI,
  saveItemAPISuccess,
  updateItemAPISuccess,
} from './items.action';
import { selectItems } from './items.selector';

@Injectable()
export class ItemsEffects {
  loadAllItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeItemsAPI),
      concatLatestFrom(() => this.store.select(selectItems)),
      switchMap(([, itemsFromStore]) => {
        if (itemsFromStore.length > 0) {
          return EMPTY;
        }
        return this.itemsService
          .get()
          .pipe(map((data) => itemsFetchAPISuccess({ allItems: data })));
      })
    );
  });

  saveNewItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveItemAPI),
      switchMap((action) => {
        return this.itemsService.create(action.payload).pipe(
          map((data) => {
            return saveItemAPISuccess({ response: data });
          })
        );
      })
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateItemAPI),
      switchMap((action) => {
        return this.itemsService.update(action.payload).pipe(
          map((data) => {
            return updateItemAPISuccess({ response: data });
          })
        );
      })
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteItemAPI),
      switchMap((action) => {
        return this.itemsService.delete(action.payload).pipe(
          map((data) => {
            return deleteItemAPISuccess({ response: data });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
    private store: Store
  ) {}
}
