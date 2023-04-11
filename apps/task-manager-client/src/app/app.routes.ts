import { Route } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const appRoutes: Route[] = [
    { path: "", component: LoginFormComponent },
    { path: "signup", component: SignUpFormComponent },
    { path: "tasks", component: TaskComponent },
    { path: "addtask", component: TaskFormComponent },
];
