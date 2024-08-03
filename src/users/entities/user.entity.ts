import { Roles } from 'src/utility/common/user-roles.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({unique:true})
  email: string;
  @Column({select:false})
  password: string;
  @Column({ type: 'varchar', length: 50, default: Roles.USER})
  roles: Roles;
  @CreateDateColumn()
  createdAt:Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
