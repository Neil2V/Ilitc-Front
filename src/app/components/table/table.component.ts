import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSeleccionado: Cliente = {
    nombres: '', apellidoPaterno: '', apellidoMaterno: '', sexo: '', fechaNacimiento: '', direccion: '', email: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router
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

  seleccionarCliente(cliente: any) : void {
    
    this.clienteSeleccionado = cliente;
    this.router.navigate(['/'], { state: { cliente: this.clienteSeleccionado } });
  }

}
