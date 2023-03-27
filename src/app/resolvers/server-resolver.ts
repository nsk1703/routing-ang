import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers/servers.service";

interface IServer {
    id: number;
    name: string;
    status: string;
}

// Le resolver nous permet de recuperer les donnees coorespondant a un parametre
// pour un route active
// Il permet de verifier si les donnees du route existe avant de la charger
@Injectable()
export class ServerResolver implements Resolve<IServer> {

    constructor(private serversService: ServersService){}

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<IServer> | Promise<IServer> | IServer 
    {
        return this.serversService.getServer(+route.params['id'])
    }
}