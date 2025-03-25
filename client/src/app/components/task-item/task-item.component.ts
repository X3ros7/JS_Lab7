import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../core/models/task.model";
import { TaskStatus } from "../../core/models/status.enum";
import { TaskService } from "../../services/task.service";
@Component({
  selector: "app-task-item",
  standalone: false,
  templateUrl: "./task-item.component.html",
  styleUrl: "./task-item.component.scss",
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<Task>();
  protected readonly TaskStatus = TaskStatus;

  constructor(private taskService: TaskService) {}

  updateTask(): void {
    this.taskEdited.emit(this.task);
  }

  deleteTask(id: string): void {
    if (!id) return;
    this.taskDeleted.emit(id);
  }

  getStatusClass(): string {
    switch (this.task.status) {
      case TaskStatus.TODO:
        return "todo";
      case TaskStatus.IN_PROGRESS:
        return "in-progress";
      case TaskStatus.DONE:
        return "done";
      default:
        return "";
    }
  }

  updateStatus($event: Event) {
    const selectedStatus = ($event.target as HTMLSelectElement).value;
    if (!this.task.id) return;
    this.taskService
      .patchTask(this.task.id, { status: selectedStatus as TaskStatus })
      .subscribe({
        next: (updatedTask) => (this.task.status = updatedTask.status),
        error: (error) => console.error(error),
      });
  }
}
