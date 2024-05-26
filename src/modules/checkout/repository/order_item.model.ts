import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import OrderModel from "./order.model";
import ProducStorageCatalogtModel from "../../store-catalog/repository/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export class OrderItemModel extends Model {
    @ForeignKey(() => OrderModel)
    @PrimaryKey
    @Column({allowNull: false})
    declare orderId: string;

    @ForeignKey(() => ProducStorageCatalogtModel)
    @PrimaryKey
    @Column({allowNull: false})
    declare productId: string;

    @BelongsTo(() => OrderModel)
    orders: OrderModel[];
}