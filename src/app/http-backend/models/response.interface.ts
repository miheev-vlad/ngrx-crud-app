import { Item } from 'src/app/items/store/item.interface';

export interface GetResponse {
  items: Item[];
}

export interface DeleteResponse {
  id: number;
}

export interface ItemResponse {
  item: Item;
}
