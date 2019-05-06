import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-app-perfil',
  templateUrl: './app-perfil.component.html',
  styleUrls: []
})
export class AppPerfilComponent implements OnInit {

  formPerfil: FormGroup;

  actualizar = false;
  private accion1: Array<string> = [];
  private accion2: Array<string> = [];
  private accion3: Array<string> = [];
  private accion4: Array<string> = [];
  private accion5: Array<string> = [];
  private accion6: Array<string> = [];
  
  constructor(public _perfil:PerfilService,private router :Router, private activeroute :ActivatedRoute) { }

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

    if(this.activeroute.snapshot.queryParamMap.get('id')){
      this.actualizarPerfil(this.activeroute.snapshot.queryParamMap.get('id'));
      this.actualizar=true;
    }

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
    this.tiggerFields();
    if(this.formPerfil.invalid) return;


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

    if(this.actualizar){

      console.log(perfil);
              this._perfil.updatePerfil( this.activeroute.snapshot.queryParamMap.get('id'), perfil)
              .subscribe(res =>{
                console.log(res);
              swal('Good job!', 'Usuario Actualizado', 'success');
          })
            return
      }
    this._perfil.crearPerfil(perfil).subscribe(res =>{
      swal('Bien!', 'Perfil Registrado', 'success');
      this.router.navigate( ['/perfil'] );
      })
  }

  private tiggerFields() {
    Object.keys(this.formPerfil.controls).forEach(field => {
      let _control = this.control(field);
      if (_control instanceof FormControl)
        _control.markAsTouched({ onlySelf: true });
    });
  }

  public actualizarPerfil(id){
    this._perfil.selectOne(id).subscribe(res =>{
      console.log('este es el perfil',res.data);
      
      this.formPerfil= new FormGroup({
        nombre: new FormControl(res.data.nombre,Validators.required),
        Editar1 : new FormControl((res.data.pagina1.find(d => d === "Editar")? true :false)),
        Evaluar1: new FormControl((res.data.pagina1.find(d => d === "Evaluar")? true :false)),
        Ver1: new FormControl((res.data.pagina1.find(d => d === "Ver")? true :false)),

        Editar2 : new FormControl((res.data.pagina2.find(d => d === "Editar")? true :false)),
        Evaluar2: new FormControl((res.data.pagina2.find(d => d === "Evaluar")? true :false)),
        Ver2: new FormControl((res.data.pagina2.find(d => d === "Ver")? true :false)),

        Editar3 : new FormControl((res.data.pagina3.find(d => d === "Editar")? true :false)),
        Evaluar3: new FormControl((res.data.pagina3.find(d => d === "Evaluar")? true :false)),
        Ver3: new FormControl((res.data.pagina3.find(d => d === "Ver")? true :false)),

        Editar4 : new FormControl((res.data.pagina4.find(d => d === "Editar")? true :false)),
        Evaluar4: new FormControl((res.data.pagina4.find(d => d === "Evaluar")? true :false)),
        Ver4: new FormControl((res.data.pagina4.find(d => d === "Ver")? true :false)),

        Editar5 : new FormControl((res.data.pagina5.find(d => d === "Editar")? true :false)),
        Evaluar5: new FormControl((res.data.pagina5.find(d => d === "Evaluar")? true :false)),
        Ver5: new FormControl((res.data.pagina5.find(d => d === "Ver")? true :false)),

        Editar6 : new FormControl((res.data.pagina6.find(d => d === "Editar")? true :false)),
        Evaluar6: new FormControl((res.data.pagina6.find(d => d === "Evaluar")? true :false)),
        Ver6: new FormControl((res.data.pagina6.find(d => d === "Ver")? true :false))
      });

  }) 
  }

  public control(field): AbstractControl { return this.formPerfil.get(field) };
  public invalid(field) { return this.formPerfil.get(field).invalid && this.formPerfil.get(field).touched; }

}
