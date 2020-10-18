import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  //*/
  ///*
  {
    path: '',
    // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  //*/
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  // :status / 0(new) or 1(renew)
  // :name / map name
  // :number / map number
  {
    path: 'edit/:status/:name/:number',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  // :name / map name
  // :number / map number
  {
    path: 'game/:name/:number',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
