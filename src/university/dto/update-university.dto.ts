import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateUniversityDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(150, { message: 'El nombre no puede tener más de 150 caracteres' })
  name: string;
}