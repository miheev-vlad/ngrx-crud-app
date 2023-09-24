import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './store/item.interface';
import { Observable, map } from 'rxjs';
import { GetResponse } from '../http-backend/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  get(): Observable<Item[]> {
    return this.http
      .get<GetResponse>('http://apihost/items/get')
      .pipe(map((res: GetResponse) => res.items));
  }

  create(payload: Item): Observable<Item> {
    return this.http.post<Item>('http://apihost/items/create', payload);
  }

  update(payload: Item): Observable<Item> {
    return this.http.put<Item>(
      `http://apihost/items/update/${payload.id}`,
      payload
    );
  }

  delete(payload: Item): Observable<Item> {
    return this.http.delete<Item>(`http://apihost/items/delete/${payload.id}`, {
      body: payload,
    });
  }
}
