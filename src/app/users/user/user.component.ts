import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	user: {id: number, name: string};
	paramsSubscription: Subscription

	constructor(private route: ActivatedRoute) { }
	// ActivatedRoute nous permettra d'acceder aux informations presentes dans un URL
	ngOnInit() {
		// Ici nous recuperons les parametres de l'url de maniere non dynamiques (Ceux qui sont courants)
		// Donc lors d'un changement de parametres, l'on ne peut pas les recuperer
		this.user = {
			id: this.route.snapshot.params['id'],
			name: this.route.snapshot.params['name']
		}
		// Pour cela nous devons utiliser un observateur d'évènement, 
		// qui ecoute à un changement de valeur des parametres d'url
		this.paramsSubscription = this.route.params
									.subscribe(
										(params: Params) => {
											this.user.id = params['id'];
											this.user.name = params['name'];
										}
									);
	}

	ngDestroy(){
		// Permet de detruire les donnees qui seront stockes en memoire lorsque l'on fermera le composant
		this.paramsSubscription.unsubscribe();
	}

}
