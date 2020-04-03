import { Component, OnInit } from '@angular/core';
import List from "src/app/models/list";
import Task from "src/app/models/task"
import { TaskService } from "src/app/task.service";
import { ActivatedRoute, Router, Params } from "@angular/router";


// THINK: This module contains all of the event
//        handlers associated with the view

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

    // Instead of grabbing values from URL
    // parameters each time, you can use
    // these variables here instead and
    // use "this" to access them.
    lists: List[] = [];
    tasks: Task[] = [];
    listId: string;

    constructor(
      private taskService: TaskService,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

    ngOnInit() {
        // NOTE: This subscribe() method is like a callback function
        this.taskService.getLists().subscribe((lists: List[]) => this.lists = lists);
        this.route.params.subscribe((params: Params) => {
          this.listId = params.listId;
          if (!this.listId) return;
          this.taskService.getTask(this.listId)
              .subscribe((tasks: Task[]) => this.tasks = tasks);
        });
    }

    onTaskClick(task: Task) {
      this.taskService.setCompleted(this.listId, task)
          .subscribe(() => task.completed = !task.completed);
    }

    deleteTask(task: Task) {
      this.taskService.deleteTask(this.listId, task._id)
          .subscribe((task: Task) => this.tasks = this.tasks.filter(t => t._id !== task._id));
    }
}
