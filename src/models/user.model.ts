import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @Unique
  @Column
  phone: string;

  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
