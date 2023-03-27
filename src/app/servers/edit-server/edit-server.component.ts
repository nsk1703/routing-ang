import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate.service';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate{
	server: {id: number, name: string, status: string};
	serverName = '';
	serverStatus = '';
	allowEdit = false;
	changedSaved = false;

	constructor(private serversService: ServersService,
				private activeRoute: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		// Ici nous voulons recuperer les parametres de l'url
		// La premiere methode le permet, mais pas de maniere dynamique,
		// Donc seulement dans le cas où la page où nous serons conduit ne change pas l'url pour l'element suivant
		// console.log(this.activeRoute.snapshot.queryParams);
		// console.log(this.activeRoute.snapshot.fragment);
		// Nous recuperons dynamiquement les donnees du queryParams de l'url
		this.activeRoute.queryParams
			.subscribe(
				(queryParams: Params) => {
					console.log('query', queryParams['allowEdit']);
					this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
				}
			);
		this.activeRoute.fragment.subscribe(); 
		
		// On recupère l'id de l'url en paramètre
		const id = +this.activeRoute.snapshot.params['id'];
		
		this.server = this.serversService.getServer(id);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
	}

	onUpdateServer() {
		this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
		this.changedSaved = true;
		this.router.navigate(['../'], {relativeTo: this.activeRoute})
	}

	// Permet de surveiller la navigation de l'utilisateur, lorsqu'il quittera la page d'edition
	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if(!this.allowEdit){
			return true;
		}

		if(this.serverName !== this.server.name || this.serverStatus !== this.server.status || !this.changedSaved){
			return confirm("Voulez-vous vraiment quitter le formulaire?")
		}else{
			return true;
		}
	}

}
