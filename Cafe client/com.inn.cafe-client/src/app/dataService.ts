import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GenericResponse } from "./ResponseDTO/GenericResponse";
import { loginResponseDTO } from "./ResponseDTO/loginResponseDTO";
import { loginRequestDTO } from "./RequestDTO/loginRequestDTO";
import { exhaustMap, Observable, take } from "rxjs";
import { User } from "./domain/User";
import { LoginService } from "./login/login.service";

@Injectable({
    providedIn: 'root'
  })

export class DataService {

    http: HttpClient = inject(HttpClient);

    signup(params: Map<string, string>) {
        return this.http.post<GenericResponse<string>>('http://localhost:8080/user/signup', params);
    }

    login(params: loginRequestDTO) {
        return this.http.post<GenericResponse<loginResponseDTO>>('http://localhost:8080/user/login', params);
    }

    socialLogin() {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }

    getSocialLoginUserData() {
        return this.http.get('http://localhost:8080/user/getSocialLoginData');
    }

    getUsers() {
        return this.doCall<GenericResponse<User[]>>('http://localhost:8080/user/getAllUsers');
    }

    doCall<T>(url: string, params?: T) {
        return this.http.get(url, params);
    } 
}