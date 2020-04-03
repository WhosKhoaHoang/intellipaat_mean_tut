import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import List from "src/app/models/list";
import Task from "src/app/models/task"
import { TaskService } from "src/app/task.service";


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

    ngOnInit(): void {
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

    deleteList(list: List) {
      // You don't want to pass this.listId because this.listId refers to
      // the CURRENTLY SELECTED LIST, not necessarily the list that just got
      // its X button clicked...
      this.taskService.deleteList(list._id)
          .subscribe(() => this.lists = this.lists.filter(l => l._id !== list._id));
    }

    addTaskClick() {
      if (!this.listId) {
        alert("Please select a list to add tasks to");
        return
      }

      this.router.navigate(["./new-task"], { relativeTo: this.route });
    }
}
