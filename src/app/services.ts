import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly baseUrl = 'http://localhost:5100/api'; // Base API URL

  constructor(private http: HttpClient) {}

  // Method to concatenate endpoint and make a POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    
    if(token===null){
      return this.http.post<T>(url, data);}
    else{
      
      return this.http.post<T>(url, data, { headers: headers });}
  }

  // Method to concatenate endpoint and make a GET request
  get<T>(endpoint: string): Observable<T> {
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
  const headers = new HttpHeaders({
    'Authorization': `${token}`
  });
    const url = `${this.baseUrl}/${endpoint}`;
    if(token!==null)
      return this.http.get<T>(url,{headers});
    else
    return this.http.get<T>(url);
    
  }

  // Method to concatenate endpoint and make a PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
  const headers = new HttpHeaders({
    'Authorization': `${token}`
  });
    const url = `${this.baseUrl}/${endpoint}`;
    if(token===null)
      return this.http.put<T>(url, data);
    else
      return this.http.put<T>(url, data, { headers: headers });
  }

  // Method to concatenate endpoint and make a DELETE request
  delete<T>(endpoint: string): Observable<T> {
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
      const url = `${this.baseUrl}/${endpoint}`;
      if(token===null){
        console.log('na here 1');
        return this.http.delete<T>(url);}
      else{
        console.log('na here 2');
        return this.http.delete<T>(url, { headers: headers });}
  }
}
