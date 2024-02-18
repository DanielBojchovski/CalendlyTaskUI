import { inject } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { JWTService } from "../Services/jwt.service";

export const authGuard = (state: RouterStateSnapshot) => {

    const jwtService = inject(JWTService);
    const router = inject(Router);

    if (jwtService.isLoggedIn() && jwtService.decodeToken()?.roles?.includes("ADMIN")) {
        return true;
    }

    return router.navigate(['/login'], { state: { returnUrl: state.url } });
};