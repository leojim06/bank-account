import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Modal } from 'ngx-modialog/plugins/vex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  toasterconfig: ToasterConfig = new ToasterConfig({
    animation: 'fade',
    timeout: 6000,
    preventDuplicates: true,
    mouseoverTimerStop: true
  });

  constructor(
    private modal: Modal,
    private toasterService: ToasterService,
  ) { }

  onClick() {
    this.modal.confirm()
      .isBlocking(true)
      .showCloseButton(false)
      .keyboard(27)
      .okBtn('Aceptar')
      .message('Este es el boton de alerta')
      .open()
      .result
      .then(result => this.toasterService.pop('success', 'Hola', 'Toaster service'))
      .catch(result => this.toasterService.pop('error', 'Hola', 'Toaster Service'));
  }
}
