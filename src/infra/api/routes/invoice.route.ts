import express, {Request, Response} from "express"
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    try {
        const usecase = InvoiceFacadeFactory.create();

        const output = await usecase.find({
            id: req.params.id
        });

        res.send(output);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});