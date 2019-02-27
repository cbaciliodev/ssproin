import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../services/shared/parametro.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private _parametro: ParametroService) { }

  ngOnInit() {
    this.getParametros();
  }

  private getParametros() {
    this._parametro.list()
      .subscribe(res => {
        this.localParametros(res.data);
      });
  }

  private localParametros(parametros) {
    for (let p of parametros) {
      localStorage.setItem(p._id, JSON.stringify(p.parametros));
    }
  }

}
