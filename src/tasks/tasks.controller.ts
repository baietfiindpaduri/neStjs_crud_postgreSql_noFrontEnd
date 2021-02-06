import { Delete, Get, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import {Controller } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}


    @Get() 
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto);
    }

//ParseIntPipe will make sure the id is a number at runtime 
//because when we compile the ts -> js, js must know it is a nr
    @Get("/:id")
    getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id); 
    }

    @Delete("/:id")
    deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
                    return this.tasksService.createTask(createTaskDto)
                }

//    // localhost:3000/tasks/idul/status
    @Patch("/:id/status")
    updateTaskStatus(
       @Param("id", ParseIntPipe) id: number,
       @Body("status", TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task>  {
        return this.tasksService.updateTaskStatus(id, status);
    }



}
