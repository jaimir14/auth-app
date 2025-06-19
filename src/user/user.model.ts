import {
  Table,
  Column,
  Model,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  apiUrl: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = 10;
      const password = await bcrypt.hash(instance.get('password'), saltRounds);
      instance.set('password', password);
    }
  }
}
