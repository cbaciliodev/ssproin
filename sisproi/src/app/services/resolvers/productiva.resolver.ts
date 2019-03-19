import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductivaService } from '../productiva.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductivaResolver implements Resolve<any> {

  constructor(private _productiva: ProductivaService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.queryParamMap.get('id');
    if (!id) return of('');

    return this._productiva.get(id).pipe(
      catchError(err => of(err))
    );
  };

}
