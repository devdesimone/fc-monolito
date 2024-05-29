import {app} from '../express'
import request from 'supertest'
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../modules/product-adm/repository/product.model";


describe('E2E test for product', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                "id": "1",
                "name": "product",
                "description": "description",
                "purchasePrice": 100,
                "stock": 10
            });
        expect(response.status).toBe(201);
        expect(response.body.id).toBe('1');
        expect(response.body.name).toBe('product');
        expect(response.body.description).toBe('description');
        expect(response.body.purchasePrice).toBe(100);
    })
})