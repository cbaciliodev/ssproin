import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FichaService } from '../ficha.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaResolver implements Resolve<any> {

  constructor(private _ficha: FichaService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.queryParamMap.get('id');
    if(!id) return of('');

    return this._ficha.get(id).pipe(
      catchError(err => of(err))
    );
  }
}
