import { Injectable } from '@angular/core';
import { LocalStorageAuthTokenName } from '../../Consts';
import { JWTModel } from '../DTOs/Models/JWTModel';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  public isLoggedIn() {
    const token = this.getAuthToken();

    if (token === null || token === undefined)
      return false;

    return true;
  }

  public saveAuthToken(authToken: string): void {
    localStorage.setItem(LocalStorageAuthTokenName, authToken);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(LocalStorageAuthTokenName);
  }

  public getBearerToken(): string | null {
    return "Bearer " + localStorage.getItem(LocalStorageAuthTokenName);
  }

  public decodeToken(): JWTModel | null {
    let token = localStorage.getItem(LocalStorageAuthTokenName);

    if (token !== null) {
      let decodedToken: JWTModel | null = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }
}
