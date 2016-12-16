import { Routes, RouterModule } from '@angular/router';
//import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  // {
  //   path: 'register',
  //   loadChildren: () => System.import('./register/register.module')
  // }
];

export const routing = RouterModule.forChild(routes);
