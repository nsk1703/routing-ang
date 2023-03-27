import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
	server: {id: number, name: string, status: string};

	constructor(private serversService: ServersService,
				private activeRoute: ActivatedRoute,
				private route: Router) { }

	ngOnInit() {
		// '+' permet la conversion en type Number
		// const id = +this.activeRoute.snapshot.params['id'];
		// this.server = this.serversService.getServer(id);

		// console.log('id',id);
    	// // Si nous voulons changer de server étant dans la page server, alors on peut utiliser
    	// this.activeRoute.params
		// 	.subscribe(
		// 		(params: Params) => {
		// 			this.server = this.serversService.getServer(+params['id']);
		// 		}
		// 	)

		// Ici nous recuperons les donnees par le resolver, ceci est efficace dans les manieres asynchrones
		// de changement d'id dans les routes
		this.activeRoute.data
				.subscribe(
					(data: Data) => {
						console.log(data)
						this.server = data['server'];
					}
				)
  	}

	onEdit(){
		// Apres avoir cliqué sur le bouton de modification, il faudrait ouvrir la page du formulaire
		// this.route.navigate(['/servers', this.server.id, 'edit']); l'on pourrait ecrire ainsi

		// Mais en ecrivant comme ceci, nous poouvons laisser angular/router savoir
		// quelle route nous designons en lui passant en relatif la route active
		// 'queryParamsHandling' nous permet de gerer le queryParams, soit en le modifiant avec "merge" comme valeur
		// Soit en le preservant avec "preserve" comme valeur
 		this.route.navigate(['edit'], {relativeTo: this.activeRoute, queryParamsHandling: 'preserve'});
	}
}
