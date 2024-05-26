export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutputDto {
  id: string;
  name: string;
  email: string;
  document: string;
  street: string;
  city: string;
  complement: string;
  number: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}