import { Component, OnInit, OnChanges  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/service/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  
  public formLogin !: FormGroup;
  
  cliente: Cliente = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    fechaNacimiento: new Date(),
    direccion: '',
    email: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router ,
    private toastr: ToastrService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ){
    
  }

  ngOnInit(): void {
    
    this.formLogin = this.formBuilder.group({
      id: [, []],
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', []],
      apellidoMaterno: ['', []],
      sexo: ['', []],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', []],
      email: ['', [Validators.required, Validators.email]]
    });

    this.getMessage();

  }

  public getMessage(): void{

    this.messageService.event.subscribe( data => {
    const response3 = {
      id: data.id,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      sexo: data.sexo,
      fechaNacimiento: this.datePipe.transform(new Date(data.fechaNacimiento),"yyyy-MM-dd"),
      direccion: data.direccion,
      email: data.email
    }

      this.formLogin.patchValue(response3);
    } );

    
  }

  registrarCliente(): void{

   
    const cliente = new Cliente(this.formLogin.value.nombres, this.formLogin.value.apellidoPaterno, this.formLogin.value.apellidoMaterno,
      this.formLogin.value.sexo, this.formLogin.value.fechaNacimiento, this.formLogin.value.direccion, this.formLogin.value.email);

      this.clienteService.registrarCliente(cliente).subscribe(
        response => {
          this.toastrService.success(response, 'Ok !',{
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {

          this.toastr.error(`Error, ${err}`, 'Ok !', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.log("error: ",err);
          this.router.navigate(['/']);
        }
        
      );
  }

  updateCliente(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    
    this.clienteService.updateCliente(id, this.formLogin.value).subscribe(
      response => {
        this.toastrService.success(response, 'Ok !',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastrService.error(err, 'Fail !',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

  deleteCliente(): void{
    console.log(this.formLogin.value);
    const id = this.activatedRoute.snapshot.params['id'];
    this.clienteService.deleteCliente(id).subscribe(
      response => {
        this.toastrService.success(response, 'Ok !',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastrService.error(err, 'Fail !',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    )
  }
}
