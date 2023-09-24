export interface Item {
  id: number;
  title: string;
  description: string;
  cost: number;
}

export interface ItemState {
  items: Item[];
}
