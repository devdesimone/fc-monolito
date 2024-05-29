import {app} from '../express'
import request from 'supertest'
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import {ClientModel} from "../../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/item.model";


describe('E2E test for checkout', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel, ClientModel, InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a checkout', async () => {
        const client = await request(app)
            .post('/clients')
            .send({
                "address": "Rua dos Bobos, 0, São Paulo - SP, 08550-080",
                "name": "João da Silva",
                "email": "x@x.com",
                "city": "São Paulo",
                "state": "SP",
                "complement": "Apto 101",
                "document": "35524438901",
                "number": "123",
                "street": "Rua dos Bobos",
                "zipCode": "08550-080"
            });
        const product = await request(app)
            .post('/products')
            .send({
                "id": "1",
                "name": "product",
                "description": "description",
                "purchasePrice": 100,
                "stock": 10
            });
        // erro ao salvar order
        const response = await request(app)
            .post('/checkout')
            .send({
                "clientId": client.body.id,
                "products": [
                    {
                        "productId": "1"
                    }
                ]
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe('approved')
    }, 50000)

});