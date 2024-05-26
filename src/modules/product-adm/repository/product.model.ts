import { BelongsTo, Column, DefaultScope, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model{

  @PrimaryKey
  @Column({allowNull: false})
  declare id: string;

  @Column({allowNull: false})
  declare name: string;

  @Column({allowNull: true})
  declare description: string;

  @Column({allowNull: true})
  declare purchasePrice: number;

  @Column({allowNull: true})
  declare salesPrice: number;

  @Column({allowNull: true})
  declare stock: number;

  @Column({allowNull: true})
  declare createAt: Date;

  @Column({allowNull: true})
  declare updateAt: Date;

  // @ForeignKey(() => InvoiceModel)
  // declare invoice_id: InvoiceModel;

  // @BelongsTo(() => InvoiceModel)
  // declare invoice: InvoiceModel;

  // @ForeignKey(() => OrderModel)
  // declare order_id: string;

}