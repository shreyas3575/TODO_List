import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponseModel, ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  taskObj: Task = new Task();
  taskList: ITask[] = [];
  masterService = inject(MasterService);

  ngOnInit(): void{
      this.loadAllTask();
  }

  loadAllTask(){
    this.masterService.getAllTaskList().subscribe((res:ApiResponseModel)=>{
    this.taskList = res.data;
    })
  }

  addTask(){
    this.masterService.addNewtask(this.taskObj).subscribe((res: ApiResponseModel)=>{
      if(res.result){
        alert('Task Created Sucessfuly');
        this.taskObj = new Task();
      }
    },error=>{
      alert('API Call Error')
    })
  }
  updateTask(){
    this.masterService.updateTask(this.taskObj).subscribe((res:ApiResponseModel)=>{
      if(res.result){
        alert('Task Updated Successfully');
        this.loadAllTask();
        this.taskObj=new Task();
      }
    },error=> {
      alert('API Call Error')
    })
  }

  onDelete(id: number){
    const isConfirm = confirm("Are You sure want to Delete");
    if(isConfirm){
      this.masterService.deleteTask(id).subscribe((res: ApiResponseModel)=>{
        if(res.result){
          alert('Task Delete Successfully');
          this.loadAllTask();
        }
      },error=>{
        alert('API Call Error')
      })

    }
    
  }
  
  onEdit(item:Task){
    this.taskObj = item;
    setTimeout(()=>{
      const dat = new Date(this.taskObj.dueDate);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth()+1)).slice(-2);
      const today = dat.getFullYear()+ '-' + (month) + '-' + (day);
      const dateField = document.getElementById('textDate');

     (<HTMLInputElement>document.getElementById('textDate')).value = today
    }, 1000);
  }


}
 