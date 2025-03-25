import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Task } from "../../core/models/task.model";
import { TaskStatus } from "../../core/models/status.enum";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TaskFormValidator } from "../../share/directives/task-form.validator";

@Component({
  selector: "app-task-form",
  standalone: false,
  templateUrl: "./task-form.component.html",
  styleUrl: "./task-form.component.scss",
})
export class TaskFormComponent implements OnChanges {
  task!: Task;
  protected readonly TaskStatus = TaskStatus;
  @Output()
  taskAdd = new EventEmitter<Task>();
  @Input() editTask: Task | null = null;

  taskForm = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl(
      "",
      TaskFormValidator.forbiddenWordsValidator(["React", "Vue"])
    ),
    dueDate: new FormControl("", [
      Validators.required,
      TaskFormValidator.dateValidator,
    ]),
    assignee: new FormControl("", Validators.required),
    status: new FormControl(TaskStatus.TODO, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["editTask"] && this.editTask) {
      this.taskForm.patchValue(this.editTask);
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      let data = {
        ...this.taskForm.value,
        id: this.editTask ? this.editTask.id : undefined,
      };
      this.taskAdd.emit(data as Task);
      this.taskForm.reset();
    }
  }
}
