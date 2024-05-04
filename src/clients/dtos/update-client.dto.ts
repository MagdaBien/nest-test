import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClientDTO {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
