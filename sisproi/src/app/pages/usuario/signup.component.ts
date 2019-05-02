import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { Router,ActivatedRoute} from '@angular/router';
import { Parametro } from 'src/app/models/parametro.model';
import { environment as env } from 'src/environments/environment';
import { Profile01Component } from '../profile/profile01.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  profile : Profile01Component;
  @Input() pagePerfil:Boolean;
  actualizar= false;
  usuario:Usuario;
  formUsuario: FormGroup;
  passiguales =false;
  correoDuplicado=false;
  correoIncorrecto=false;
  passwordedit=false;
  todoSectores=false;
  passwordaux:string;
  passworInvalid=false;
  passworValid=false;
  passworInsegura=false;
  perfilAdminSelect=false;
  perfilUsuario;
  private sector: Array<Parametro> = [];
  private sectores: Array<Parametro> = [];
  private sectoraux: Array<string> = [];
  private accion: Array<string> = [];

  constructor(public _usuario : UsuarioService , private activeroute :ActivatedRoute,private router :Router) { }

  ngOnInit() {
    this.perfilUsuario=JSON.parse(localStorage.getItem('usuario')).perfil;
    this.configParametros();
    this.formUsuario= new FormGroup({
      nombre : new FormControl('',Validators.required),
      correo : new FormControl('',[Validators.required,Validators.email]),
      passwordAct: new FormControl({value: ''},Validators.required),
      password : new FormControl(''/* {value: '', disabled: true} */,Validators.required),
      vpassword : new FormControl(''),
      perfil: new FormControl('',Validators.required),
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

  public selectPerfilAdmin(){
    this.changeSector(7);
    this.perfilAdminSelect=true;

  }

  passwordEdit(){

    this.formUsuario.get('passwordAct').setValue('');
    this.formUsuario.get('password').setValue('');
    this.formUsuario.get('vpassword').setValue('');
    this.passwordedit=true; 

  }

  passwordEditCancel(){
    this.passwordedit=false;
    this. passworInvalid=false;
    this.formUsuario.get('passwordAct').setValue('');
    this.formUsuario.get('password').setValue(this.passwordaux);
    this.formUsuario.get('vpassword').setValue(this.passwordaux);
  }

  validar(pass:string,vpass:string){ 
    if(this.perfilUsuario=='Administrador' && !this.pagePerfil==true){// pagePefil es true o undefine
      this.passworValid=true;
      return null;
    }else{

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

    
  }
 
  
  actualizarUsuario(id){
      this._usuario.selectOne(id).subscribe(res =>{
        this.usuario=res.data;
        console.log('este es el perfil',res.data.perfil);
        
        this.formUsuario= new FormGroup({
          nombre : new FormControl(res.data.nombre,Validators.required),
          correo : new FormControl(res.data.correo,[Validators.required,Validators.email]),
          passwordAct: new FormControl({value: ''}),
          password : new FormControl(res.data.password,Validators.required),
          vpassword : new FormControl(res.data.password),
          Editar : new FormControl((res.data.accion.find(d => d === "AEDITAR")? true :false)),
          Evaluar: new FormControl((res.data.accion.find(d => d === "AEVALUAR")? true :false)),
          Ver: new FormControl((res.data.accion.find(d => d === "AVER")? true :false)),
          perfil : new FormControl(res.data.perfil,Validators.required),
 
        },{validators : this.validar('password','vpassword') });
          this.passwordaux=res.data.password;
          console.log(res.data.password)
          //obtener sectores
          for(let i=0 ;i<res.data.sector.length;i++){
            let sector01 = this.sector.find(d => d.nombre === res.data.sector[i]);
            this.sectores.push({alias:sector01.alias,nombre:sector01.nombre});
          }
          if(res.data.perfil=='Administrador')this.selectPerfilAdmin();
    })  
  }  

  public invalid(field) {
    return this.formUsuario.get(field).invalid && this.formUsuario.get(field).touched;
  }

  public validarCorreo(){
    this.correoDuplicado = false;
    this.correoIncorrecto = false;
    return 
  }

  public acciones(){
    this.accion=[];
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
  
  nombreaux=false;
  correoInv=false;
  accionesInv=false;
  sectoresInv=false;
  passInv=false;
  vpassInv=false;
  perfilInv=false;

  registarUsuario(){
 console.log(this.formUsuario.invalid);
    if(this.formUsuario.invalid || this.acciones() || this.sectoresValid()){

      if(this.formUsuario.get('nombre').invalid)this.nombreaux = true;
      if(this.formUsuario.get('correo').invalid)this.correoInv = true;
      if(this.formUsuario.get('password').invalid)this.passInv = true;
      if(this.formUsuario.get('vpassword').invalid)this.vpassInv = true;
      if(this.formUsuario.get('perfil').invalid)this.perfilInv = true;
      if(this.acciones())this.accionesInv = true;
      if(this.sectoresValid())this.sectoresInv = true;
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
        this.formUsuario.value.perfil,
        this.sectoraux,
        this.accion
      );
   
    if(this.actualizar){

        if(this.passwordedit){
        var user = new Usuario(this.formUsuario.get('nombre').value,this.formUsuario.get('correo').value,this.formUsuario.get('passwordAct').value);
       
       
          if(this.perfilUsuario=='Administrador'  && !this.pagePerfil==true){
              this.passworInvalid=false;
            
              this._usuario.updateUsuario(this.activeroute.snapshot.queryParamMap.get('id'),usuario)
                    .subscribe(res =>{
                      if(localStorage.getItem('id')==this.activeroute.snapshot.queryParamMap.get('id')){
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                        this.profile.ngOnInit();//para acttualizar el panel de perfil
                      }
                    swal('Good job!', 'Usuario Actualizado', 'success');
                })
                return
          }else{
            
        //para verificar que se ala contraseña es la correcta, y poder cambiarla
        this._usuario.login(user)
         .subscribe(res => {
           this.passworInvalid=false;
           this._usuario.updateUsuario(this.activeroute.snapshot.queryParamMap.get('id'),usuario)
           .subscribe(res =>{
            if(localStorage.getItem('id')==this.activeroute.snapshot.queryParamMap.get('id')){
              localStorage.setItem('usuario', JSON.stringify(usuario));
              this.profile.ngOnInit();
            }
           swal('Good job!', 'Usuario Actualizado', 'success');
       })
         return     
         }, _ => {
           this.passworInvalid=true;
            return
         })
        }
        }else{  
                this._usuario.updateUsuario(this.activeroute.snapshot.queryParamMap.get('id'),{
                nombre : this.formUsuario.value.nombre,
                correo: this.formUsuario.value.correo,
                perfil: this.formUsuario.value.perfil,
                sector: this.sectoraux,
                accion:this.accion
              })
                .subscribe(res =>{
                  if(localStorage.getItem('id')==this.activeroute.snapshot.queryParamMap.get('id')){
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    this.profile.ngOnInit();
                  }
                swal('Good job!', 'Usuario Actualizado', 'success');
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
