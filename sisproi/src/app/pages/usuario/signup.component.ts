import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  actualizar= false;
  usuario:Usuario;
  formUsuario: FormGroup
  passiguales =false;
  invalido=false;
  id='';
  correoDuplicado=false;
  correoIncorrecto=false;

  constructor(public _usuario : UsuarioService , private activeroute :ActivatedRoute,private router :Router) { }

  ngOnInit() {

  if(this.activeroute.snapshot.queryParamMap.get('id')){
    this.actualizarUsuario(this.activeroute.snapshot.queryParamMap.get('id'));
    this.actualizar=true;

  } 
      this.formUsuario= new FormGroup({
      nombre : new FormControl('',Validators.required),
      correo : new FormControl('',[Validators.required,Validators.email]),
      perfil : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),
      vpassword : new FormControl('',Validators.required),

    },{validators : this.validar('password','vpassword','correo') })
  }


  validar(pass:string,vpass:string,correo:string){
     let re = /\S+@\S+\.\S+/;   
    return (group:FormGroup)=>{
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
        console.log(res.data);
        this.formUsuario= new FormGroup({
          nombre : new FormControl(res.data.nombre,Validators.required),
          correo : new FormControl(res.data.correo,[Validators.required,Validators.email]),
          perfil : new FormControl(res.data.perfil,Validators.required),
          password : new FormControl(res.data.password,Validators.required),
          vpassword : new FormControl(res.data.password,Validators.required),
    
        });
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

  registarUsuario(){

    let re = /\S+@\S+\.\S+/;  
    if(!re.test(this.formUsuario.value.correo)){
        this.correoIncorrecto=true;
      return
    } 
   
    if(this.formUsuario.invalid){
      this.invalido=true;
      return;}
      //si formulario es valido continuo con el registro
    this._usuario.duplicidadCorreo(this.formUsuario.value.correo).subscribe(res=>{

      if(res.data.length>0){
        this.correoDuplicado=true;
        return
      } //si no hay duplicidad en correo continuo con el registro
        
      let usuario =  new Usuario(
        this.formUsuario.value.nombre,
        this.formUsuario.value.correo,
        this.formUsuario.value.password,
        this.formUsuario.value.perfil
      );
  
      if(this.actualizar){
          this._usuario.updateUsuario(this.id,usuario)
          .subscribe(res =>{
            swal('Good job!', 'Usuario Actualizado', 'success');
            this.router.navigate( ['/usuario'] );
          })
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
