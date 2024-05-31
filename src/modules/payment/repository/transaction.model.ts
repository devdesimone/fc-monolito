import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "transactions",
  timestamps: true,
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false, field: "order_id" })
  declare orderId: string;

  @Column({ allowNull: false })
  declare amount: number;

  @Column({ allowNull: false })
  declare status: string;

}
