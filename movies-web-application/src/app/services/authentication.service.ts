import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Urls} from "../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected http: HttpClient) {
  }

  getRequestToken(): Observable<any> {
    return this.http.get<any>(`${environment.httpApi}/${Urls.CREATE_REQUEST_TOKEN}`, {
      params: new HttpParams().set('api_key', environment.apiKey)
      , headers: new HttpHeaders()
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', `Bearer ${environment.accessToken}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Content-Type')
        .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        .set('Access-Control-Allow-Credentials', 'true')
    })
  }

  getUserPermission(token: string): Observable<any> {
    return this.http.get<any>(`${Urls.GET_USER_PERMISSION}/${token}`
      , {
        params: new HttpParams()
          .set('redirect_to', 'http://localhost:4200/approved')
        , headers: new HttpHeaders()
          .set('Content-Type', 'application/json;charset=utf-8')
          .set('Authorization', `Bearer ${environment.accessToken}`)
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Headers', 'Content-Type')
          .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
          .set('Access-Control-Allow-Credentials', 'true')
      })
  }


  createNewSession(token: string): Observable<any> {
    const requestBody: { request_token: string } = {request_token: token};
    return this.http.post<any>(`${environment.httpApi}/${Urls.CREATE_SESSION}`,
      {requestBody},
      {params: new HttpParams().set('api_key', environment.apiKey)});
  }
}
