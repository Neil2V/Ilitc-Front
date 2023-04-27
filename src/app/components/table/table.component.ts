import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { MessageService } from 'src/app/service/message.service';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSeleccionado: Cliente = {
    nombres: '', apellidoPaterno: '', apellidoMaterno: '', sexo: '', fechaNacimiento: new Date('DD-MM-YYYY'), direccion: '', email: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private messageService: MessageService,
    private bodyComponent: BodyComponent
  ){}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void{
    this.clienteService.listClientes().subscribe(
      data => {
        this.clientes = data;
        console.log("clientes: ",this.clientes);
      },
      err => {
        console.log(err);
      }
    )
  }

  seleccionarCliente(cliente: Cliente) : void {
    this.clienteSeleccionado = cliente;
    this.messageService.event.emit(cliente)
    this.bodyComponent.getMessage();
  }

}
