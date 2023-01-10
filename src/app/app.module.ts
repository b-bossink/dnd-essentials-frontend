import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CampaignCreationComponent } from './component/pages/campaign/campaign-creation/campaign-creation.component';
import { CampaignComponent } from './component/pages/campaign/campaign/campaign.component';
import { EditCampaignComponent } from './component/pages/campaign/edit-campaign/edit-campaign.component';

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
    StatsGenerationComponent,
    CampaignCreationComponent,
    CampaignComponent,
    EditCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'character/create', component: CharacterCreationComponent },
      { path: 'character', component: AllCharactersComponent },
      { path: 'character/:id', component: CharacterComponent },
      { path: 'character/:id/edit', component: EditCharacterComponent },
      { path: 'campaign/create', component: CampaignCreationComponent },
      { path: 'campaign', component: AllCampaignsComponent },
      { path: 'campaign/:id', component: CampaignComponent },
      { path: 'campaign/:id/edit', component: EditCampaignComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent } ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StatsGenerationComponent]
})
export class AppModule { }
