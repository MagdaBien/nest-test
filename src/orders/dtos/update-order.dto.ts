import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDTO {
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
