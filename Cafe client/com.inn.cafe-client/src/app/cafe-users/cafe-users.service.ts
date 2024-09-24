import { inject } from "@angular/core";
import { DataService } from "../dataService";
import { catchError, map, throwError } from "rxjs";

export class CafeUsersService {
    dataService: DataService = inject(DataService);
    getUsers() {
        return this.dataService.getUsers().pipe(catchError(err => this.handleError(err)), map(resp => {
            return ((resp) as any).data;
        }))
    }

    handleError(err: any): any {
        throwError( () => err);
    }
}