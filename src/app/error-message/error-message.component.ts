import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  errorMessage: string;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // On passe les donnees de la route a une variable
    this.activeRoute.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message']
      }
    )
  }

}
