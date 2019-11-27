import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule } from '@angular/router';

//importar Componentes

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgEditComponent } from './components/ng-edit/ng-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationComponent } from './components/publication/publication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupsComponent } from './components/groups/groups.component';

import {UserGuard} from './services/user.guard';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';



const appRoutes: Routes = [
{path: '', component : LoginComponent},
{path: 'home', component : HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'registro', component: RegisterComponent},
{path: 'mis-datos' , component: NgEditComponent,canActivate: [UserGuard]},
{path: 'gente', component: UsersComponent,canActivate: [UserGuard]},
{path: 'publicacion', component: PublicationComponent,canActivate: [UserGuard]},
{path: 'publicacion/:page', component: PublicationComponent,canActivate: [UserGuard] },
{path: 'gente/:page', component: UsersComponent,canActivate: [UserGuard]},
{path: 'timeline',component: TimelineComponent,canActivate: [UserGuard]},
{path: 'perfil/:id',component: ProfileComponent,canActivate: [UserGuard]},
{path: 'acercadenosotros', component: AcercaComponent, canActivate:[UserGuard]},
{path: 'grupos',component: GroupsComponent},
{path: 'grupos/:id',component: GroupsComponent},
{path: 'listagrupos/:id',component:ListausuariosComponent},
{path:'**',component: HomeComponent}

];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);