//repositories manage entities in an encapsulated manner 
// (pt a nu supraaglomera serviciile si cu operatiunile necesare db..)
// the repository will be called from the service

import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

// <Task> is imported from the entity, not the model
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const {status, search } = filterDto;
        //query builder is used when there is no predefined func:
        // 'task' will be used in the querries to reffer to the task entity
        const query = this.createQueryBuilder('task'); 

        if(status){ // localhost:3000/tasks?status=DONE  checks for tasks with the 'DONE' status
            //the second argument (the object) gives the value for the ':status' variable
            //u just provide {status} and it will use the status we get from filterDto above
            //aka the one inputed by the client
            query.andWhere('task.status = :status', {status})
        }
        //andWhere instead of 'where' because u don't want the 2 methods to overwrite eachOther
        // 'like' is similar to =, but allows a partial match, filter whiteSpace etc
        // pui in obj '%' pt ca vrei sa gaseasca si daca nu e exact match
        if(search){// localhost:3000/tasks?status=DONE&search=ana  
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = new Task();
        const {title, description} = createTaskDto;
        //now i have access to the title and description from the dt, i add them to the new task
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
    
}