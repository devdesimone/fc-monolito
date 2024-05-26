import Address from "../../../@shared/domain/value-object/address"
import AddClientUseCase from "./add-client.usecase"

const MockRepository = () => {
  return {

    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add Client use case unit test", () => {

  it("should add a client", async () => {

    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)

    const input = {
      name: "Client 1",
      email: "x@x.com",
      document: "Document 1",
      address: "Address 1",
      city: "City 1",
      complement: "Complement 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
    };

    const result =  await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)

  })
})