import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class CreateUserDto {
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
  address: CreateAddressDto;

  // @ApiProperty({ example: '01/03/2000' })
  // birthdate: Date;

  @ApiProperty({ example: 'Male' })
  gender: string;

  @ApiProperty({ example: 'imageNameUrl' })
  profileImage: string;

  @ApiProperty({ example: 'User' })
  role: string;

  @ApiProperty({ example: 'Active' })
  activeUser: string;
}
