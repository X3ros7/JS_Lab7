import { Inject, Injectable } from "@angular/core";
import { Task } from "../core/models/task.model";
import { tasks as mock_tasks } from "../core/moc_data/tasks";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CONFIG_TOKEN } from "../configs/config";
import { AppConfig } from "../configs/config";
import { Observable } from "rxjs";
import { TaskStatus } from "../core/models/status.enum";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks: Task[] = [...mock_tasks];

  constructor(
    private http: HttpClient,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {}

  createTask(task: Omit<Task, "id">): Observable<Task> {
    // const maxId =
    //   this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) : 0;

    // task = { ...task, id: maxId };
    // this.tasks.push(task);
    return this.http.post<Task>(`${this.config.apiUrl}/tasks`, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const { id: _, ...taskData } = task;
    return this.http.put<Task>(`${this.config.apiUrl}/tasks/${id}`, taskData);
  }

  patchTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.config.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/tasks/${id}`);
  }

  getTasks(status?: TaskStatus): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.config.apiUrl}/tasks`, {
      params: status ? new HttpParams().set("status", status) : undefined,
    });
  }
}
