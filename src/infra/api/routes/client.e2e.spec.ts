import { app, sequelize } from '../express'
import request from 'supertest'
import {Sequelize} from "sequelize-typescript";
import InvoiceItemModel from "../../../modules/invoice/repository/item.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import {ClientModel} from "../../../modules/client-adm/repository/client.model";


describe('E2E test for client', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        const response = await request(app)
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
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe('João da Silva');
        expect(response.body.email).toBe('x@x.com');
        expect(response.body.street).toBe('Rua dos Bobos');
        expect(response.body.number).toBe('123');
        expect(response.body.city).toBe('São Paulo');
    });
});