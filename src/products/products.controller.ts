import { Controller, Get, Delete, Post, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
        this.productsService = productsService;
    }

    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
    }

    @Get('/:id')
    getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = this.productsService.getById(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    @Post('/')
    create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }

    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() productData: UpdateProductDTO,
    ) {
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found');

        this.productsService.updateById(id, productData);
        return { success: true };
    }

    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
      if (!this.productsService.getById(id))
        throw new NotFoundException('Product not found');
      this.productsService.deleteById(id);
      return { success: true };
    }    


}
