import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { Author } from '../model/authors';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url = `${baseUrl}/authors`;//alt+96

  constructor(private http:HttpClient) { } //inyectar httpClient

  list():Observable<any>{
    return this.http.get<Author[]>(this.url); //http://localhost:5000/authors
  }

  insert(author : Author){
     return this.http.post(this.url, author);
  }

}
