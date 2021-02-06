import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { create } from 'domain';
import { TaskStatus } from './task-status.enum';
import { exception } from 'console';


@Injectable()
export class TasksService {
    constructor(
        //dependency injection:
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
    //this means we can now use this.taskRepository

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto);
  }



// TaskRepository extends Repository, Repository e cel ce contine .findOne().. etc
//any async operation returns a promise
//check the method documentation (.findOne() to see what it returns)
async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

        if(!found){
        throw new NotFoundException(`getTaskById -> task with id ${id} not found`);
    } 
    return found;
}

async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);

    if (result.affected === 0){
        throw new NotFoundException(`deleteTask -> task with id ${id} not found`);
    }
    // return result;
}

async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
}

async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
 const task = await this.getTaskById(id);
 task.status = status; //change only for this local object
 await task.save(); // persist that change above to the db;
 return task;
}

}
