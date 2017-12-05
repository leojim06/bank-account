import { TestBed, inject } from '@angular/core/testing';

import { AppSocketIoService } from './app.socketio.service';

describe('App.SocketioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSocketIoService]
    });
  });

  it('should be created', inject([AppSocketIoService], (service: AppSocketIoService) => {
    expect(service).toBeTruthy();
  }));
});
