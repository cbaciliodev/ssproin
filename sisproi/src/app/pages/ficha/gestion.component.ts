import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'gestion-ficha',
  templateUrl: './gestion.component.html'
})
export class GestionFComponent implements OnInit {

  public loading = false;
  public fichas: Array<any> = [];

  constructor(private _fichas: FichaService) { }

  ngOnInit() {
    this.getFichas();
  }

  private getFichas() {
    this.loading = true;
    this._fichas.list()
      .subscribe(
        res => this.fichas = res.data,
        err => console.log('Error => ', err),
        () => this.loading = false
      );
  }

}
