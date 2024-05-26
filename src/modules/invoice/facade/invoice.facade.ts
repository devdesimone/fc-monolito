import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {InvoiceFacadeInterface} from "./invoice.facade.interface";
import {
    GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate/generate.usecase.dto";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "../usecase/find/find.usecase.dto";

export interface UseCaseProps {
    find: UseCaseInterface;
    generate: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: UseCaseInterface;
    private _generateInvoiceUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findInvoiceUseCase = usecaseProps.find;
        this._generateInvoiceUseCase = usecaseProps.generate;
    }

    async generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return await this._generateInvoiceUseCase.execute(input);
    }

    async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        return await this._findInvoiceUseCase.execute(input);
    }
}