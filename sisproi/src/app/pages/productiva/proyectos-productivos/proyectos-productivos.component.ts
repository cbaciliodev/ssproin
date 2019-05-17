import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductivaService } from 'src/app/services/productiva.service';
import { AccionService } from 'src/app/services/accion.service';
import swal from 'sweetalert';
import { MapaUploadComponent } from 'src/app/components/mapa-upload/mapa-upload.component';

@Component({
  selector: 'app-proyectos-productivos',
  templateUrl: './proyectos-productivos.component.html',
  styleUrls: []
})
export class ProyectosProductivosComponent implements OnInit {

  @ViewChild('ubicacionGeografica') mapaUpload: MapaUploadComponent;

  constructor(private activeroute :ActivatedRoute, public _accion: AccionService, public _productiva :ProductivaService,private router :Router) { }
  tipoFormulario:string = '';
  idFormulario:string = '';
  actualizar=false;
  public productivaForm: FormGroup;


  ngOnInit() {
    this.activeroute.params.subscribe( params => {
      this.tipoFormulario = params['sector'];
      this.idFormulario = params['id'];

      this.productivaForm = new FormGroup({
        sector_proyecto : new FormControl( this.tipoFormulario ),
        nombre_proyecto : new FormControl('', Validators.required),
        ubicacion :new FormControl('')
      });

      this.actualizarProductiva();
    });
  }

  public actualizarProductiva(){
    
    if( typeof this.idFormulario !== 'undefined' ){
      this.actualizar = true;
      this._productiva.get( this.idFormulario ).subscribe(res =>{

        this.mapaUpload.data = res.data.ubicacion ;
        this.mapaUpload.cargarMapa();

        this.productivaForm= new FormGroup({
            sector_proyecto : new FormControl( this.tipoFormulario ),
            nombre_proyecto : new FormControl(res.data.nombre_proyecto, Validators.required),
            ubicacion :new FormControl(res.data.ubicacion)
         });
    }) ;
  }
}
public invalido(field) { return this.productivaForm.get(field).invalid && this.productivaForm.get(field).touched; }

nombreaux=false;
public guardar(){

  if(this.productivaForm.invalid){
    if(this.productivaForm.get('nombre_proyecto').invalid)this.nombreaux = true;
    return ;
  } 


  let productiva = this.productivaForm.value;
  productiva.ubicacion = this.mapaUpload.mapGenerated();

    if(this.actualizar){
      this._productiva.update(this.idFormulario, productiva)
      .subscribe(
        res => {
         swal('Bien!', 'Proyecto Actualizado', 'success');
         this.router.navigate( ['/listproductiva/'+this.tipoFormulario] );
        }
      );
    } else{
    this._productiva.save(productiva)
      .subscribe(
        res => {
         swal('Bien!', 'Proyecto registrado', 'success');
         this.router.navigate( ['/listproductiva/'+this.tipoFormulario] );
        }
      );
    }
  }
  
}
