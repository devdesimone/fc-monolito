import {app, sequelize} from '../express'
import request from 'supertest'
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import {ClientModel} from "../../../modules/client-adm/repository/client.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../../modules/invoice/repository/item.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import {v4 as uuidv4} from 'uuid';
import ProducStorageCatalogtModel from "../../../modules/store-catalog/repository/product.model";
import ProductOrder from "../../../modules/checkout/repository/product.order.model";


describe('E2E test for checkout', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });
        sequelize.addModels([ProductModel, ProducStorageCatalogtModel, ClientModel, InvoiceModel, InvoiceItemModel, TransactionModel, ProductOrder]);
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

        const productId = uuidv4();

        const product = await request(app)
            .post('/products')
            .send({
                "id": productId,
                "name": "product",
                "description": "description",
                "purchasePrice": 100,
                "stock": 10
            });

        const response = await request(app)
            .post('/checkout')
            .send({
                "clientId": client.body.id,
                "products": [
                    {
                        "productId": product.body.id,
                    }
                ]
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe('approved');
    });

});