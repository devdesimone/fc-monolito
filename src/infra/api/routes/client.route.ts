import express, { Request, Response } from "express"
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const usecase = ClientAdmFacadeFactory.create();

    try {
        const clientDto: AddClientInputDto = {
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            complement: req.body.complement,
            document: req.body.document,
            number: req.body.number,
            street: req.body.street,
            zipCode: req.body.zipCode,
        };

        const output = await usecase.add(clientDto);

        res.status(201).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
