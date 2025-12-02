import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    //Esto se usa solo en el método de microservicios
    @IsNumber()
    @IsPositive()
    id: number

}
