import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'mean-stack-workspace-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {


  }

  passwordValidator(control: FormControl) {
    const value = control.value.toLowerCase();
    const forbidden = value.includes('password');
    return forbidden ? { 'forbiddenPassword': { value: control.value } } : null;
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      verticalPosition: "bottom"
    })
  }

  onSubmit() {
    // console.log(this.signUpForm.value);
    this.userService.signUp(this.signUpForm.value).subscribe((res) => {
      console.log(res);
      this.showSnackBar("SignUp Successfully!")
    }, (err) => {
      console.log(err);
      this.showSnackBar("SignUp Failed!")
    })
    this.router.navigate(["/"])
  }

}
