import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any, metadata: ArgumentMetadata){
       value = value.toUpperCase();

       if (!this.isStatusValid(value)){
           throw new BadRequestException(`${value} is an invalid status`); 
       }

        return value; 
    }
    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status); // -1 if 'status' not in the array
        return idx !== -1;
    }
}
