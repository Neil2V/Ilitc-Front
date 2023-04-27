import { EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
