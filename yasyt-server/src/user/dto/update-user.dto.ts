import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/address/entities/address.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Juan' })
  name: string;

  @ApiProperty({ example: 'Perez' })
  lastname: string;

  @ApiProperty({ example: 'juanperez@gmail.com' })
  email: string;

  @ApiProperty({ example: 12345678 })
  phoneNumber: number;

  @ApiProperty({
    example: { number: 1, street: 'Nombre calle', zipCode: 123456 },
  })
  address: Address;

  @ApiProperty({ example: 'Male' })
  gender: string;

  @ApiProperty({ example: 'imageNameUrl' })
  profileImage: string;

  @ApiProperty({ example: 'User' })
  role: string;

  @ApiProperty({ example: 'Active' })
  activeUser: string;
}
