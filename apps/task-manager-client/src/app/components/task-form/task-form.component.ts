import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mean-stack-workspace-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {

  @Output() taskCreated: EventEmitter<any> = new EventEmitter();

  taskForm!: FormGroup;

  updateData: any | null = null;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private taskService: TaskService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.description) {
      this.updateData = this.data;
    }

    this.taskForm = this.fb.group({
      description: [this.data?.description || "", [Validators.required]],
      completed: [this.data?.completed || false]
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.showSnackbar('Please enter a valid task.');
      return;
    }
    // console.log(this.taskForm.value);

    this.taskService.createTask(this.taskForm.value).subscribe((res) => {
      this.taskForm.reset();

      this.showSnackbar('Task added successfully!');

      this.taskCreated.emit();

      this.router.navigate(['/tasks'], { replaceUrl: true });
    }, (err) => {
      this.showSnackbar('Something went wrong!');
    });
  }

  updateForm() {
    this.taskService.updateTask(this.updateData._id, this.taskForm.value).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

}
