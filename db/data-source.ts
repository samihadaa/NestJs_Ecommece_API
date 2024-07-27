import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv';
config()
export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABAS_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/db/migrations/*{.ts,.js}'],
    logging:false,
    synchronize: false,
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;