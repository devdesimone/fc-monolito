import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };

    const product = await productFacade.addProduct(input);

    const productResult = await ProductModel.findOne({ where: { id: product.id } });
    const result = productResult.dataValues;
    expect(result).toBeDefined();
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    };
    const product = await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: product.id });

    expect(result.productId).toBeDefined()
    expect(result.stock).toBe(input.stock);
  });
});
