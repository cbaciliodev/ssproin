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

  constructor(public _usuario : UsuarioService , private activeroute :ActivatedRoute,private router :Router) { }

  ngOnInit() {

  if(this.activeroute.snapshot.queryParamMap.get('id')){
    this.id=this.activeroute.snapshot.queryParamMap.get('id');
    this.actualizar=true;
  } 
      this.formUsuario= new FormGroup({
      nombre : new FormControl('',Validators.required),
      correo : new FormControl('',[Validators.required,Validators.email]),
      perfil : new FormControl('USER_PERFIL',Validators.required),
      password : new FormControl('',Validators.required),
      vpassword : new FormControl('',Validators.required),

    })
  }

  actualizarUsuario(id){
      this._usuario.selectOne(id).subscribe(res =>{
        this.usuario=res.usuario;
        console.log(res.usuario);
       
    })  
  }  

  public invalid(field) {
    return this.formUsuario.get(field).invalid && this.formUsuario.get(field).touched;
  }

  registarUsuario(){
  
  if(this.formUsuario.invalid){
    this.invalido=true;
    return;}
  if(this.formUsuario.value.password!=this.formUsuario.value.vpassword){
    this.passiguales=true;
      return;
  }
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
      })
    return
  }
  this._usuario.crearUsuario(usuario)
  .subscribe(res =>{
    swal('Good job!', 'Usuario Registrado', 'success');
  })
  this.router.navigate( ['/usuario'] );

  }
}
