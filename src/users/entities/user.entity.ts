import { Roles } from 'src/utility/common/user-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'varchar', length: 50, default: Roles.USER})
  roles: Roles;
}
