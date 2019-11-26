import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {routing,appRoutingProviders} from './app.routing';
import{ HttpClientModule} from '@angular/common/http';

//Modulo custom
import { MessagesModule } from './messages/messages.module';
//componentes
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NgEditComponent } from './components/ng-edit/ng-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import {MomentModule} from 'angular2-moment';
import { PublicationComponent } from './components/publication/publication.component';
import { ProfileComponent } from './components/profile/profile.component';



declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);

//servicios
import {UserService} from './services/user.service';
import {UserGuard} from './services/user.guard';
import { GroupsComponent } from './components/groups/groups.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ListausuariosComponent } from './components/listausuarios/listausuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NgEditComponent,
    SidebarComponent,
    UsersComponent,
    TimelineComponent,
    PublicationComponent,
    ProfileComponent,
    GroupsComponent,
    AcercaComponent,
    ListausuariosComponent,
  
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    MomentModule,
    MessagesModule

  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
