import { Component, OnInit } from '@angular/core';
import List from "src/app/models/list";
import Task from "src/app/models/task"
import { TaskService } from "src/app/task.service";
import { ActivatedRoute, Router, Params } from "@angular/router";


@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

    lists: List[] = [];
    tasks: Task[] = [];

    constructor(
      private taskService: TaskService,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

    ngOnInit() {
        this.taskService.getLists().subscribe((lists: List[]) => this.lists = lists);

        this.route.params.subscribe((params: Params) => {
          const listId = params.listId;
          if (!listId) return;
          this.taskService.getTask(listId)
              .subscribe((tasks: Task[]) => this.tasks = tasks);
        });
    }
}
