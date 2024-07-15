import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 1 })
  number: number;

  @ApiProperty({ example: 'Nombre calle' })
  street: string;

  @ApiProperty({ example: 123456 })
  zipCode: number;
}
