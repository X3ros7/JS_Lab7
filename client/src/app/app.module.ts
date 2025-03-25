import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatusFilterPipe } from "./share/pipes/status-filter.pipe";
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { withInterceptorsFromDi } from "@angular/common/http";
import { TaskStatusPipe } from './share/pipes/task-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    StatusFilterPipe,
    TaskFormComponent,
    TaskStatusPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
