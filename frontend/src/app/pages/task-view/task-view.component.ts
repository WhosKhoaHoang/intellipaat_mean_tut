import { Component, OnInit } from '@angular/core';
import List from "src/app/models/list";
import Task from "src/app/models/task"
import { TaskService } from "src/app/task.service";

@Component({
    selector: 'app-task-view',
    templateUrl: './task-view.component.html',
    styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

    lists: List[] = [];
    tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.taskService.getLists()
            .subscribe( (lists: List[]) => this.lists = lists);
    }
}
