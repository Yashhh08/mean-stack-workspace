import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'mean-stack-workspace-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  @Output() loginEvent = new EventEmitter();

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000,
      verticalPosition: "bottom"
    })
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.showSnackbar("Login Successfully!");
        this.loginEvent.emit();
        this.router.navigate(["/tasks"]);
      },
      error => {
        console.error(error);
        this.showSnackbar("Failed to login. SignUp first... or Please verify Email and Password..!");
      }
    );
  }

}
