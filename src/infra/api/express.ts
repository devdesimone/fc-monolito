import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import {clientRoute} from "./routes/client.route";
import {ClientModel} from "../../modules/client-adm/repository/client.model";
import ProductModel from "../../modules/product-adm/repository/product.model";
import StoreCatalogProductModel from "../../modules/store-catalog/repository/product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import {OrderItemModel} from "../../modules/checkout/repository/order_item.model";
import {checkoutRoute} from "./routes/checkout.route";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import {invoiceRoute} from "./routes/invoice.route";
import {productRoute} from "./routes/products.route";
import InvoiceItemModel from "../../modules/invoice/repository/item.model";
import ClientOrder from "../../modules/checkout/repository/client.order.model";
import ProductOrder from "../../modules/checkout/repository/product.order.model";

export const app: Express = express();
app.use(express.json());

app.use('/clients', clientRoute);
app.use('/products', productRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoice', invoiceRoute);

export let sequelize: Sequelize;

export async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: {force: true},
    });

    sequelize.addModels([
        ClientModel,
        ProductModel,
        OrderModel,
        ClientOrder,
        ProductOrder,
        StoreCatalogProductModel,
        TransactionModel,
        InvoiceModel,
        InvoiceItemModel,
    ]);
    //await sequelize.sync();

}

setupDb();