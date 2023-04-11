import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mean-stack-workspace-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  tasks: any;

  displayedColumns: string[] = ['sr', 'description', 'status', 'update', 'delete'];

  constructor(private taskService: TaskService, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '330px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllTasks();
    })
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (err) => {
        if (err.status === 404) {
          // alert("No Tasks Found..!!");
          this.tasks = [];
        }
      }
    );
  }

  updateTask(task: any) {
    this.openDialog(task);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task._id).subscribe((res) => {
      this.showSnackBar("Deleted..!!");
      this.getAllTasks();
    }, (err) => {
      this.showSnackBar("Something went wrong..!!");
    })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000,
      verticalPosition: "bottom"
    })
  }

}
