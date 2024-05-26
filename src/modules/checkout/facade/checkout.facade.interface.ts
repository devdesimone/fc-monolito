export interface PlaceOrderInputDto {
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface PlaceOrderOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}

export default interface CheckoutFacadeInterface {
    placeOrder(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto>;
}