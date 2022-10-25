import { Injectable } from '@angular/core';

function delay(time = 100) {
  return new Promise(resolve => setTimeout(resolve, time));
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  async error(msg: string) {
    await delay();
    alert(msg);
  }

  async notify(msg: string) {
    await delay();
    alert(msg);
  }
}
