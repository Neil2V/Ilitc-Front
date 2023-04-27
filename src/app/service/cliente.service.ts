import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteUrl = "http://localhost:8080/ilitc/cliente";


  constructor(
    private httpCliente: HttpClient
  ) { }

  public listClientes(): Observable<Cliente[]>{
    return this.httpCliente.get<Cliente[]>(this.clienteUrl+"/list");
  }

  public registrarCliente(cliente: Cliente): Observable<any>{
    return this.httpCliente.post(this.clienteUrl+"/create", cliente, {responseType: 'text'});
  } 

  public updateCliente(id: number, cliente: Cliente): Observable<any>{
    return this.httpCliente.put(this.clienteUrl+`/update/${id}`, cliente, {responseType: 'text'});
  }

  public deleteCliente(id: number): Observable<any>{
    return this.httpCliente.delete(this.clienteUrl+`/delete/${id}`, {responseType: 'text'});
  }

}
