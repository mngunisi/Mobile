import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyDetailsPage } from './company-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ],
  declarations: [CompanyDetailsPage]
})
export class CompanyDetailsPageModule {}
