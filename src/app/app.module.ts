import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CharacterComponent } from './component/pages/character/character/character.component'
import { CharacterCreationComponent } from './component/pages/character/character-creation/character-creation.component';
import { LoginComponent } from './component/pages/login/login.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { AllCharactersComponent } from './component/pages/character/all-characters/all-characters.component';
import { EditCharacterComponent } from './component/pages/character/edit-character/edit-character.component';
import { LoadingComponent } from './component/loading/loading.component';
import { AllCampaignsComponent } from './component/pages/campaign/all-campaigns/all-campaigns.component';
import { StatsGenerationComponent } from './component/pages/character/stats-generation/stats-generation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterCreationComponent,
    LoginComponent,
    RegisterComponent,
    AllCharactersComponent,
    EditCharacterComponent,
    LoadingComponent,
    AllCampaignsComponent,
    StatsGenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'character/create', component: CharacterCreationComponent },
      { path: 'character', component: AllCharactersComponent },
      { path: 'character/:id', component: CharacterComponent },
      { path: 'character/:id/edit', component: EditCharacterComponent },
      { path: 'campaign', component: AllCampaignsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent } ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StatsGenerationComponent]
})
export class AppModule { }
