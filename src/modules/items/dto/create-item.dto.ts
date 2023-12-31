import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Types {
  Shoes = 'Shoes',
  Cap = 'Cap',
  Hoodie = 'Hoodie',
  Shirt = 'Shirt',
  Coat = 'Coat',
  Trousers = 'Trousers',
}

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(Types, { each: true })
  @IsNotEmpty()
  type: Types;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  sex?: string | undefined | null;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsArray()
  @ArrayMinSize(1)
  sizes: number[];

  @IsArray()
  @ArrayMinSize(1)
  url_image: string[];
}
