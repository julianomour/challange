import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  async getData(): Promise<any> {
    return await this.http.get('/dito-questions/events.json').toPromise();
  }

}
