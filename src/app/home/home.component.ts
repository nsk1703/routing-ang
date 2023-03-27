import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private router: Router,
				private authService: AuthService) { }

	ngOnInit() {
	}

	redirectAfterChanges(id: number){
		// Apres des operations on redirige vers une autre page, 
		// Et on peut ajouter des parametres aussi, comme dans la vue de servers
		// pour une url, "/servers/id/edit?queryParams#upgrading"
		this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: true}, fragment: 'upgrading'});
	}

	onLogin(){
		this.authService.login();
	}

	onLogout(){
		this.authService.logout();
	}
}
