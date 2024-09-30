import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GenericResponse } from "./ResponseDTO/GenericResponse";
import { loginResponseDTO } from "./ResponseDTO/loginResponseDTO";
import { loginRequestDTO } from "./RequestDTO/loginRequestDTO";
import { exhaustMap, Observable, take } from "rxjs";
import { User } from "./domain/User";
import { environment } from "../environments/environment.development";

@Injectable({
    providedIn: 'root'
  })

export class DataService {

    http: HttpClient = inject(HttpClient);

    signup(params: Map<string, string>) {
        return this.http.post<GenericResponse<string>>(environment.DEV_SERVER_ADDRESS + 'user/signup', params);
    }

    login(params: loginRequestDTO) {
        return this.http.post<GenericResponse<loginResponseDTO>>(environment.DEV_SERVER_ADDRESS + 'user/login', params);
    }

    socialLogin() {
        window.location.href = environment.DEV_SERVER_ADDRESS + 'oauth2/authorization/google';
    }

    getSocialLoginUserData() {
        return this.http.get(environment.DEV_SERVER_ADDRESS + 'user/getSocialLoginData');
    }

    getUsers() {
        return this.doCall<GenericResponse<User[]>>(environment.DEV_SERVER_ADDRESS + 'user/getAllUsers');
    }

    doCall<T>(url: string, params?: T) {
        return this.http.get(url, params);
    } 
}