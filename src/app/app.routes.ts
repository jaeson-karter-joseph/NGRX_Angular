import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./components/register/auth.routes').then(m => m.routes)
    },
];
