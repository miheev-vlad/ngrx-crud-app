import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/items/store/item.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() item: Item;

  @Output() deleteEvent: EventEmitter<Item> = new EventEmitter();

  onDelete(item: Item): void {
    this.deleteEvent.emit(item);
  }
}
