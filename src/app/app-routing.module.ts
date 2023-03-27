import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./notFound/page-not-found/page-not-found.component";
import { ServerResolver } from "./resolvers/server-resolver";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { CanDeactivateGuard} from "./services/can-deactivate.service";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
	{
		path: "", 
		component: HomeComponent
	},
	{
		path: "users", 
		component: UsersComponent, 
		children: [
			{path: ":id/:name", component: UserComponent},
		]
	},
	{
		path: "servers", 
        // Ici nous restreignons l'acces a la route /servers qui est la route principale
        // canActivate: [AuthGuardService],
        // Ici on protege suelement les routes filles, mais on a déjà accès a la route /servers
        // CanDeactivate permet de verifier si l'on quitte la route
        canActivateChild: [AuthGuardService],
		component: ServersComponent, 
		children: [
			{path: ":id", component: ServerComponent, resolve: {server: ServerResolver}},
			{   path: ":id/edit", 
                canDeactivate: [CanDeactivateGuard],
                component: EditServerComponent
            }
		]
	},   
	// Ce chemin doit toujours etre le dernier,car c'est lui qui gere la redirection
	// au cas l'on entre n'importe quoi dans l'url
	// {path: "not-found", component: PageNotFoundComponent},

    // Ici nous passons les donnees static a la route qui pourront etre recupéré dans 
    // le composant statiquement et exploité
    {path: "not-found", component: ErrorMessageComponent, data: {message: 'Page Not Found'}},
	{path: "**", redirectTo: "/not-found"}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}