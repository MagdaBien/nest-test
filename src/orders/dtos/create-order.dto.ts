import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}