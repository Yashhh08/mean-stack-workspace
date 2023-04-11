import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mean-stack-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.userService.currentUser !== null) {
      this.showSnackBar("You are already logged in..!!")
    }
    else {
      this.router.navigate(["/"]);
    }
  }

  onLogout(event: any) {
    this.userService.logout(event).subscribe((res) => {
      if (res) {
        this.showSnackBar("Logout Successful..!!")

      }
      else {
        this.showSnackBar("Please login first..!!")

      }
    }, (err) => {
      this.showSnackBar("Something went wrong..!!");
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000,
      verticalPosition: "bottom"
    })
  }

}
