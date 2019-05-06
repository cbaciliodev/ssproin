import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-app-perfil',
  templateUrl: './app-perfil.component.html',
  styleUrls: []
})
export class AppPerfilComponent implements OnInit {

  formPerfil: FormGroup;
  private accion1: Array<string> = [];
  private accion2: Array<string> = [];
  private accion3: Array<string> = [];
  private accion4: Array<string> = [];
  private accion5: Array<string> = [];
  private accion6: Array<string> = [];
  
  constructor(public _perfil:PerfilService,private router :Router) { }

  ngOnInit() {

    this.formPerfil= new FormGroup({

      nombre: new FormControl('',Validators.required),
      Editar1 : new FormControl(false),
      Evaluar1: new FormControl(false),
      Ver1: new FormControl(false),

      Editar2 : new FormControl(false),
      Evaluar2: new FormControl(false),
      Ver2: new FormControl(false),

      Editar3: new FormControl(false),
      Evaluar3: new FormControl(false),
      Ver3: new FormControl(false),

      Editar4: new FormControl(false),
      Evaluar4: new FormControl(false),
      Ver4: new FormControl(false),

      Editar5: new FormControl(false),
      Evaluar5: new FormControl(false),
      Ver5: new FormControl(false),

      Editar6: new FormControl(false),
      Evaluar6: new FormControl(false),
      Ver6: new FormControl(false)
    });

  }

  public acciones(){
    this.accion1=[];
    this.accion2=[];
    this.accion3=[];
    this.accion4=[];
    this.accion5=[];
    this.accion6=[];

   if(this.formPerfil.value.Editar1)this.accion1.push("Editar");
   if(this.formPerfil.value.Evaluar1)this.accion1.push("Evaluar");
   if(this.formPerfil.value.Ver1)this.accion1.push("Ver");

   if(this.formPerfil.value.Editar2)this.accion2.push("Editar");
   if(this.formPerfil.value.Evaluar2)this.accion2.push("Evaluar");
   if(this.formPerfil.value.Ver2)this.accion2.push("Ver");

   if(this.formPerfil.value.Editar3)this.accion3.push("Editar");
   if(this.formPerfil.value.Evaluar3)this.accion3.push("Evaluar");
   if(this.formPerfil.value.Ver3)this.accion3.push("Ver");

   if(this.formPerfil.value.Editar4)this.accion4.push("Editar");
   if(this.formPerfil.value.Evaluar4)this.accion4.push("Evaluar");
   if(this.formPerfil.value.Ver4)this.accion4.push("Ver");

   if(this.formPerfil.value.Editar5)this.accion5.push("Editar");
   if(this.formPerfil.value.Evaluar5)this.accion5.push("Evaluar");
   if(this.formPerfil.value.Ver5)this.accion5.push("Ver");

   if(this.formPerfil.value.Editar6)this.accion6.push("Editar");
   if(this.formPerfil.value.Evaluar6)this.accion6.push("Evaluar");
   if(this.formPerfil.value.Ver6)this.accion6.push("Ver");
   /* if(!this.formPerfil.value.Editar1 && !this.formPerfil.value.Evaluar1 && !this.formPerfil.value.Ver1){
     return true;}
   else{return false;} */
  };

  public registrarPerfil(){
    this.acciones();  
    let perfil =  new Perfil(
      this.formPerfil.value.nombre,
      this.accion1,
      this.accion2,
      this.accion3,
      this.accion4,
      this.accion5,
      this.accion6
    );

    this._perfil.crearPerfil(perfil).subscribe(res =>{
      swal('Bien!', 'Perfil Registrado', 'success');
      this.router.navigate( ['/perfil'] );
      })
  }

}
