import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}