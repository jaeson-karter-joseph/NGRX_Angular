import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequest } from "../register/store/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    register(data: RegisterRequest): Observable<CurrentUserInterface> {
        const url = 'https://api.realworld.io/api/users';
        return this.http.post<AuthResponseInterface>(url, data).pipe(map(
            (response: AuthResponseInterface) => response.user
        ))
    }
}