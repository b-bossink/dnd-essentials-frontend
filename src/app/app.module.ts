import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CharacterComponent } from './component/pages/character/character/character.component'
import { CharacterCreationComponent } from './component/pages/character/character-creation/character-creation.component';
import { LoginComponent } from './component/pages/login/login.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { AllCharactersComponent } from './component/pages/character/all-characters/all-characters.component';
import { EditCharacterComponent } from './component/pages/character/edit-character/edit-character.component';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterCreationComponent,
    LoginComponent,
    RegisterComponent,
    AllCharactersComponent,
    EditCharacterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'character/create', component: CharacterCreationComponent },
      { path: 'character', component: AllCharactersComponent },
      { path: 'character/:id', component: CharacterComponent },
      { path: 'character/:id/edit', component: EditCharacterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent } ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
