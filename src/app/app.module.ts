import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './notFound/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard} from './services/can-deactivate.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ServerResolver } from './resolvers/server-resolver';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UsersComponent,
		ServersComponent,
		UserComponent,
		EditServerComponent,
		ServerComponent,
		PageNotFoundComponent,
  		ErrorMessageComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [ServersService, AuthService, AuthGuardService, CanDeactivateGuard, ServerResolver],
	bootstrap: [AppComponent]
})
export class AppModule { }
