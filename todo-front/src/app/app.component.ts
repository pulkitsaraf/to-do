// app.component.ts

import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Web3Service } from '../app/services/web3.service';
import { create } from 'domain';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do Application';
   createTask: FormGroup;
   assignTask: FormGroup;
   markTask: FormGroup;
   constructor(private fb: FormBuilder,
    private web3Service: Web3Service) {
    this.createTaskForm();
    this.assignTaskForm();
    this.markTaskForm();

  }
  createTaskForm() {
    this.createTask = this.fb.group({
       name: ['', Validators.required ]
    });

  }
  assignTaskForm() {
    this.assignTask = this.fb.group({
       taskId: ['', Validators.required ],
       address:  ['', Validators.required ]
    });

  }

  markTaskForm() {
    this.markTask = this.fb.group({
       taskId: ['', Validators.required ]
    });

  }

  async createTaskonWeb(createTask: any) {
   console.log(createTask.name)
   this.web3Service.createTask(createTask.name).subscribe(result => {
    if (result) {
      window.alert(createTask.name + "Task Created ")
    }
});
  
  }

  async assignTaskonWeb(assignTask: any) {
    this.web3Service.assignTask(assignTask.taskId, assignTask.address).subscribe(result => {
     if (result) {
       window.alert("Task Assigned to :"+ assignTask.address)
     }
 });
   
   }

   async markTaskonWeb(assignTask: any) {
    this.web3Service.markTaskComplete(assignTask.taskId).subscribe(result => {
     if (result) {
       window.alert("Task Marked as Completed")
     }
 });
   
   }

}
