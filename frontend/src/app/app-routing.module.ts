import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateProjectComponent } from './admin/pages/create-project/create-project.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateUserProfileComponent } from './pages/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UsersComponent } from './admin/components/users/users.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { ProjectRequestComponent } from './pages/project-request/project-request.component';
import { IdeasComponent } from './pages/ideas/ideas.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard],
    data: { roles: ['admin'] } 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'update-profile', component: UpdateUserProfileComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ViewProjectComponent },
  { path: 'project-request', component: ProjectRequestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
