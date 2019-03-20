import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { Router,ActivatedRoute} from '@angular/router';
import { Parametro } from 'src/app/models/parametro.model';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  actualizar= false;
  usuario:Usuario;
  formUsuario: FormGroup;
  passiguales =false;
  invalido=false;
  correoDuplicado=false;
  correoIncorrecto=false;
  passwordedit=false;
  todoSectores=false;
  passwordaux:string;
  passworInvalid=false;
  passworValid=false;
  passworInsegura=false;
  private sector: Array<Parametro> = [];
  private sectores: Array<Parametro> = [];
  private sectoraux: Array<string> = [];
  private accion: Array<string> = [];



  constructor(public _usuario : UsuarioService , private activeroute :ActivatedRoute,private router :Router) { }

  ngOnInit() {
    this.configParametros();
    this.formUsuario= new FormGroup({
      nombre : new FormControl('',Validators.required),
      correo : new FormControl('',[Validators.required,Validators.email]),
      passwordAct: new FormControl({value: '', disabled: true},Validators.required),
      password : new FormControl(''/* {value: '', disabled: true} */,Validators.required),
      vpassword : new FormControl('',Validators.required),
      Editar : new FormControl(false),
      Evaluar: new FormControl(false),
      Ver: new FormControl(false)
 

    },{validators : this.validar('password','vpassword') })

    if(this.activeroute.snapshot.queryParamMap.get('id')){
      this.actualizarUsuario(this.activeroute.snapshot.queryParamMap.get('id'));
      this.actualizar=true;
    } 
   
  }


  public configParametros() {
    this.sector = JSON.parse(localStorage.getItem(env.PARAMETRO.NIVEL_1))
    this.sector.push({alias:'TODOS',nombre:'TODOS'});
    ;
  }

  public changeSector(i) {

    if (!i) return;
    let dep = this.sector[i];

    if(dep.nombre==='TODOS'){
      this.sectores = [];
      for(let i =0;i<(this.sector.length - 1);i++){
        this.sectores.push(this.sector[i]);
      }  
    }else{

    let exist = this.sectores.find(d => d.nombre === dep.nombre);
     if (exist) return; 
    this.sectores.push(dep);
    }
  }

  public removeSector(i) {
    this.sectores.splice(i,1);
  } 


  passwordEdit(){

    this.formUsuario.controls['passwordAct'].enable(); 
    this.formUsuario.get('passwordAct').setValue('');
    this.formUsuario.get('password').setValue('');
    this.formUsuario.get('vpassword').setValue('');
    this.passwordedit=true; 

  }
  passwordEditCancel(){
    this.passwordedit=false;
    this. passworInvalid=false;
    this.formUsuario.controls['passwordAct'].disable(); 
    this.formUsuario.get('passwordAct').setValue('');
    this.formUsuario.get('password').setValue(this.passwordaux);
    this.formUsuario.get('vpassword').setValue(this.passwordaux);

  }
  validar(pass:string,vpass:string){ 
    return (group:FormGroup)=>{
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      if(re.test(group.controls[pass].value)){
        this.passworValid=true;
      }else{this.passworValid=false;}
      if(group.controls[pass].value==group.controls[vpass].value ){
        return null;
      } 
      return {
        sonIguales: true
      };
    };
  }
 
  
  actualizarUsuario(id){
      this._usuario.selectOne(id).subscribe(res =>{
        this.usuario=res.data;
        
        this.formUsuario= new FormGroup({
          nombre : new FormControl(res.data.nombre,Validators.required),
          correo : new FormControl(res.data.correo,[Validators.required,Validators.email]),
          passwordAct: new FormControl({value: '', disabled: true}),
          password : new FormControl(res.data.password,Validators.required),
          vpassword : new FormControl(res.data.password,Validators.required),
          Editar : new FormControl((res.data.accion.find(d => d === "AEDITAR")? true :false)),
          Evaluar: new FormControl((res.data.accion.find(d => d === "AEVALUAR")? true :false)),
          Ver: new FormControl((res.data.accion.find(d => d === "AVER")? true :false))
 
        },{validators : this.validar('password','vpassword') });
          this.passwordaux=res.data.password;
          //obtener sectores
          for(let i=0 ;i<res.data.sector.length;i++){
            let sector01 = this.sector.find(d => d.nombre === res.data.sector[i]);
            this.sectores.push({alias:sector01.alias,nombre:sector01.nombre});
          }
    })  
  }  

  public invalid(field) {
    return this.formUsuario.get(field).invalid && this.formUsuario.get(field).touched;
  }

  public validarCorreo(){
    this.correoDuplicado = false;
    this.invalido=false;
    this.correoIncorrecto=false;
    return 
  }

  public acciones(){
   if(this.formUsuario.value.Editar)this.accion.push("AEDITAR");
   if(this.formUsuario.value.Evaluar)this.accion.push("AEVALUAR");
   if(this.formUsuario.value.Ver)this.accion.push("AVER");
   if(!this.formUsuario.value.Editar && !this.formUsuario.value.Evaluar && !this.formUsuario.value.Ver){
     return true;}
   else{return false;}
  }
  public sectoresValid(){
    this.sectoraux =[];
    for(let i=0;i<this.sectores.length;i++){
      this.sectoraux[i]=this.sectores[i].nombre;
    }

    if(this.sectoraux.length<1){
      return true;
    }else{
      return false;}
   }
  

  registarUsuario(){
    
    if(this.acciones() || this.sectoresValid()){
      this.invalido=true;
      return ;} 

    if(this.formUsuario.invalid){
      this.invalido=true;
      return;
    } 

    let re = /\S+@\S+\.\S+/;  
    if(!re.test(this.formUsuario.value.correo)){
        this.correoIncorrecto=true;
      return
    } 
   
    if(!this.passworValid){
      this.passworInsegura=true;
      return;
    }

      //si formulario es valido continuo con el registro
    this._usuario.duplicidadCorreo(this.formUsuario.value.correo).subscribe(res=>{

      if(res.data.length>0 && !this.actualizar){
        this.correoDuplicado=true;
        return
      } //si no hay duplicidad en correo continuo con el registro

      
      let usuario =  new Usuario(
        this.formUsuario.value.nombre,
        this.formUsuario.value.correo,
        this.formUsuario.value.password,
        this.sectoraux,
        this.accion
      );
    
    if(this.actualizar){

        if(this.passwordedit){
        var user = new Usuario(this.formUsuario.get('nombre').value,this.formUsuario.get('correo').value,this.formUsuario.get('passwordAct').value);
        this._usuario.login(user)
         .subscribe(res => {
           this.passworInvalid=false;
           this._usuario.updateUsuario(this.activeroute.snapshot.queryParamMap.get('id'),usuario)
           .subscribe(res =>{
           swal('Good job!', 'Usuario Actualizado', 'success');
           this.router.navigate( ['/usuario'] );
       })
         return     
         }, _ => {
           this.passworInvalid=true;
            return
         })
        }else{
          this._usuario.updateUsuario(this.activeroute.snapshot.queryParamMap.get('id'),usuario)
          .subscribe(res =>{
          swal('Good job!', 'Usuario Actualizado', 'success');
          this.router.navigate( ['/usuario'] );
      })
        return
    }
    return 
      }
      this._usuario.crearUsuario(usuario)
      .subscribe(res =>{
      swal('Good job!', 'Usuario Registrado', 'success');
      this.router.navigate( ['/usuario'] );
      })
      })      

    }
}
