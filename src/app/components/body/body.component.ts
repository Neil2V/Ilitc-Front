import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  

  
  cliente: Cliente = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    fechaNacimiento: '',
    direccion: '',
    email: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router ,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
    
  ){
    
  }

  ngOnInit(): void {
    //const cliente = this.activatedRoute.snapshot.params['cliente'];
  }


  registrarCliente(): void{

   
    const cliente = new Cliente(this.cliente.nombres, this.cliente.apellidoPaterno, this.cliente.apellidoMaterno,
       this.cliente.sexo, this.cliente.fechaNacimiento, this.cliente.direccion, this.cliente.email);

      this.clienteService.registrarCliente(cliente).subscribe(
        response => {
          this.toastr.success(response, 'Ok !', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.success(`Error, ${err}`, 'Ok !', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.log("error: ",err);
          this.router.navigate(['/']);
        }
        
      );

      

  }

  updateCliente(): void{

  }

  deleteCliente(): void{

  }
}
