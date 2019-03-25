import { Component, OnInit, Input } from '@angular/core';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { environment as env } from 'src/environments/environment';
import { TipoMapa } from 'src/app/models/tipoMapa.model';
import { Util } from 'src/app/commons/util.model';

const URL = env.URI_API.concat('files/');

declare function initMap( );
declare function loadMapByURL( url: string );
declare function loadMap( kml: string );
declare function jsonMap( );
declare function setFormType( tipoFormulario: number );


@Component({
  selector: 'app-mapa-upload',
  templateUrl: './mapa-upload.component.html',
  styleUrls: ['./mapa-upload.component.css']
})
export class MapaUploadComponent implements OnInit {

  // Parametros de ingreso
  @Input() data = '';

  tipoMapa: TipoMapa = new TipoMapa();
  fileName = '';

  public uploader: FileUploader = new FileUploader({ url: URL.concat('upload'), itemAlias: 'file' });

  constructor() { }

  ngOnInit() {
    initMap( );

    this.tipoMapa.tipo = env.TIPO_FORMULARIO.MAPA;

    if ( !Util.isEmpty( this.data ) ) {
      const dataJson = Util.toJson( this.data );
      this.tipoMapa.tipo = dataJson.tipo;
      loadMap( this.data );
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any ) => {
      const resp = JSON.parse(response);
      this.fileName = resp.data.filename;
      this.tipoMapa.tipo = env.TIPO_FORMULARIO.ARCHIVO;
      loadMapByURL( URL.concat(this.fileName) );
     };
  }

  tipoFormaMapa( typeForm: number ) {
    setFormType( typeForm );
    this.tipoMapa.tipo = env.TIPO_FORMULARIO.MAPA;
  }

  /* Invocar este método para poder obtener el mapa generado */
  mapGenerated() {

    if ( Util.equiv( this.tipoMapa.tipo, env.TIPO_FORMULARIO.ARCHIVO ) ) {
      this.tipoMapa.valor = URL.concat(this.fileName);
    } else {
      this.tipoMapa.valor = jsonMap();
    }

    return Util.toStr( this.tipoMapa );
  }

}
