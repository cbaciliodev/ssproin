import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { environment as env } from 'src/environments/environment';
import { TipoMapa } from 'src/app/models/tipoMapa.model';
import { Util } from 'src/app/commons/util.model';

const URL = env.URI_API.concat('files/');

declare function initMap2( );
declare function loadMap2ByURL2( url: string );
declare function loadMap2( kml: string );
declare function jsonMap2( );
declare function setFormType2( tipoFormulario: number );


@Component({
  selector: 'app-mapa-upload-2',
  templateUrl: './mapa-upload.component.html',
  styleUrls: ['./mapa-upload.component.css']
})
export class MapaUpload2Component implements OnInit {

  // Parametros de ingreso
  @Input() data = '';

  tipoMapa: TipoMapa = new TipoMapa();
  fileName = '';

  public uploader: FileUploader = new FileUploader({ url: URL.concat('/upload'), itemAlias: 'file' });

  constructor() { }

  ngOnInit() {
    initMap2( );

    this.tipoMapa.tipo = env.TIPO_FORMULARIO.MAPA;

    if ( !Util.isEmpty( this.data ) ) {
      const dataJson = Util.toJson( this.data );
      this.tipoMapa.tipo = dataJson.tipo;
      loadMap2( this.data );
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any ) => {
      const resp = JSON.parse(response);
      this.fileName = resp.data.filename;
      this.tipoMapa.tipo = env.TIPO_FORMULARIO.ARCHIVO;
      loadMap2ByURL2( URL.concat(this.fileName) );
     };
  }

  tipoFormaMapa( typeForm: number ) {
    setFormType2( typeForm );
    this.tipoMapa.tipo = env.TIPO_FORMULARIO.MAPA;
  }

  /* Invocar este método para poder obtener el mañpa generado */
  mapGenerated() {

    if ( Util.equiv( this.tipoMapa.tipo, env.TIPO_FORMULARIO.ARCHIVO ) ) {
      this.tipoMapa.valor = URL.concat(this.fileName);
    } else {
      this.tipoMapa.valor = jsonMap2();
    }

    return Util.toStr( this.tipoMapa );
  }

}
