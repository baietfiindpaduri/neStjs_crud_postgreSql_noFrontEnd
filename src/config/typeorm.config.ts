import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '?',
    database: 'taskmanagement',
    //entities:  [__dirname + '/../**/*.entity.ts'], // entities == tables in the db
    autoLoadEntities: true,
    synchronize: true, 
};

// [__dirname + ]  
// means:
// currentDir
// ../ means one step back
// ** means any directory
// * means any file
// file ending with .entity.ts