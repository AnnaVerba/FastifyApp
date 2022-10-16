import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'movies', timestamps: true })
export class Movie extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: true })
  rating: number;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  createdat: 'created_date';

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: true })
  updatedat: 'updated_at';
}
