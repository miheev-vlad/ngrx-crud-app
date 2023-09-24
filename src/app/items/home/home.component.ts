import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeItemsAPI, invokeDeleteItemAPI } from '../store/items.action';
import { selectItems } from '../store/items.selector';
import { Item } from '../store/item.interface';

declare const window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  items$ = this.store.select(selectItems);

  deleteModal: any;
  idToDelete!: Item;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeItemsAPI());
  }

  openDeleteModal(item: Item) {
    this.idToDelete = item;
    this.deleteModal.show();
  }

  onDelete() {
    this.store.dispatch(invokeDeleteItemAPI({ payload: this.idToDelete }));
    this.deleteModal.hide();
  }

  onClose() {
    this.deleteModal.hide();
  }
}
