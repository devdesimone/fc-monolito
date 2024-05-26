import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: false
})
export default class ProducStorageCatalogtModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: true})
    declare description: string;

    @Column({allowNull: true})
    declare salesPrice: number;

    @Column({allowNull: true})
    declare purchasePrice: number;

    @Column({allowNull: true})
    declare stock: number;

    @Column({allowNull: true})
    declare createAt: Date;

    @Column({allowNull: true})
    declare updateAt: Date;

}