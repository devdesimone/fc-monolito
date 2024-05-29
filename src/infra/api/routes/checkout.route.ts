import express, {Request, Response} from "express"
import {PlaceOrderInputDto} from "../../../modules/checkout/usecase/place-order/place-order.dto";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const usecase = CheckoutFacadeFactory.create();

    try {
        const checkoutDto: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };

        const output = await usecase.execute(checkoutDto);

        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});