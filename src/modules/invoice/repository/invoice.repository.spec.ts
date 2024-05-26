import {Sequelize} from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./item.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([InvoiceItemModel, InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new invoice", async () => {
        const repository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Teste",
            document: "12345678901",
            address: new Address({
                street: "Rua Teste",
                number: "123",
                complement: "complemento",
                city: "Teste",
                state: "Teste",
                zipCode: "12345678",
            }),
            items: [
                new Product({
                    id: new Id("1"),
                    name: "Teste",
                    price: 10,
                }),
                new Product({
                    id: new Id("2"),
                    name: "Teste 2",
                    price: 20,
                }),
            ],
        });
        await repository.create(invoice);

        const result = await InvoiceModel.findOne({
            where: {id: "1"},
            include: [InvoiceItemModel],
        });

        const invoiceData = result.dataValues;
        invoiceData.items = invoiceData.items.map((item: any) => item.dataValues);
        expect(invoiceData).toBeDefined();
        expect(invoiceData.id).toBe(invoice.id.id);
        expect(invoiceData.name).toBe(invoice.name);
        expect(invoiceData.document).toBe(invoice.document);
        expect(invoiceData.street).toBe(invoice.address.street);
        expect(invoiceData.number).toBe(invoice.address.number);
        expect(invoiceData.complement).toBe(invoice.address.complement);
        expect(invoiceData.city).toBe(invoice.address.city);
        expect(invoiceData.state).toBe(invoice.address.state);
        expect(invoiceData.zipcode).toBe(invoice.address.zipCode);
        expect(invoiceData.items[0].id).toBe(invoice.items[0].id.id);
        expect(invoiceData.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceData.items[0].price).toBe(invoice.items[0].price);
        expect(invoiceData.items[1].id).toBe(invoice.items[1].id.id);
        expect(invoiceData.items[1].name).toBe(invoice.items[1].name);
        expect(invoiceData.items[1].price).toBe(invoice.items[1].price);
        expect(invoiceData.total).toBe(30);
    });

    it("should find an invoice", async () => {
        const repository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Teste",
            document: "12345678901",
            address: new Address({
                street: "Rua Teste",
                number: "123",
                complement: "complemento",
                city: "Teste",
                state: "Teste",
                zipCode: "12345678",
            }),
            items: [
                new Product({
                    id: new Id("1"),
                    name: "Teste",
                    price: 10,
                }),
                new Product({
                    id: new Id("2"),
                    name: "Teste 2",
                    price: 20,
                }),
            ],
        });
        await repository.create(invoice);

        const result = await repository.find(invoice.id.id);

        expect(result).toBeDefined();
        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(30);
    });
});
