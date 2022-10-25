import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
@Table({ tableName: 'users', timestamps: true })
export class UserEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  changedpassword: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  emailconfirmed: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  refreshtoken: string;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  createdat: 'created_date';

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  updatedat: 'updated_at';
}
