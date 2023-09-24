import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import data from '../db/db.json';
import {
  DeleteResponse,
  GetResponse,
  ItemResponse,
} from './models/response.interface';

@Injectable()
export class HttpBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { method, body } = req;

    if (method === 'GET') {
      return okGet(data);
    }

    if (method === 'DELETE') {
      return okDelete(body);
    }

    if (method === 'POST') {
      return okPost(body);
    }

    if (method === 'PUT') {
      return okPut(body);
    }

    return error('API error');

    function okGet(body: GetResponse) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function okDelete(body: ItemResponse) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function okPost(body: ItemResponse) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function okPut(body: ItemResponse) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError({ error: { message } });
    }
  }
}

export const HttpBackendInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpBackendInterceptor,
  multi: true,
};
