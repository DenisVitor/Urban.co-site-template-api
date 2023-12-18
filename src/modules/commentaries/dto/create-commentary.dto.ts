import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentaryDto {
  @IsString()
  @IsNotEmpty()
  commentary: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  itemId: string;
}
