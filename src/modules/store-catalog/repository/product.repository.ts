import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map(
            (product) => {
                const result = product.dataValues;
                return new Product({
                    id: new Id(result.id),
                    name: result.name,
                    description: result.description,
                    salesPrice: result.salesPrice,
                });
            }
        );
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: {
                id: id,
            },
        });
        const result = product.dataValues;
        return new Product({
            id: new Id(result.id),
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice,
        });
    }
}
