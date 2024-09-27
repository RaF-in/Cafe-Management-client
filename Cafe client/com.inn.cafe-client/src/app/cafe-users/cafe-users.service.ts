import { inject, Injectable } from "@angular/core";
import { DataService } from "../dataService";
import { catchError, exhaustMap, map, take, throwError } from "rxjs";
import { LoginService } from "../login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GenericResponse } from "../ResponseDTO/GenericResponse";
import { User } from "../domain/User";

@Injectable({
    providedIn: 'root'
  })
export class CafeUsersService {
    dataService: DataService = inject(DataService);
    loginService: LoginService = inject(LoginService);
    http: HttpClient = inject(HttpClient);
    getUsers() {
        return this.dataService.getUsers().pipe(catchError(err => this.handleError(err)), map(resp => {
            let response = (resp) as any;
            return response.data;
          }));
    }

    handleError(err: any): any {
        throwError( () => err);
    }
}