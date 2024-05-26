import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { PlaceOrderInputDto, PlaceOrderOutputDto } from "./checkout.facade.interface";

export interface UseCasesProps {
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._placeOrderUseCase = useCasesProps.placeOrderUseCase;
    }

    placeOrder(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        return this._placeOrderUseCase.execute(input);
    }
}