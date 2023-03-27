import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    CanActivateChild, 
    Router, 
    RouterStateSnapshot,
    UrlTree 
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// Méthode de vérification d'authentification 
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService,
                private router: Router){}

    // Permet de proteger les routes principales
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.checkLogin();
    }

    checkLogin(){
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if(authenticated){
                        return true;
                    }else{
                        this.router.navigate(['/']);
                    }
                }
            )
    }

    // permet de proteger les routes filles, mais ayant déjà accès à la route principale
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        return this.canActivate(childRoute, state);
    }
}