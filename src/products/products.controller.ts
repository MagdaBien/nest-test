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

    @Get('/extended')
    getAllExtended(): any {
        return this.productsService.getAllExtended();
    }

    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
    }    

    @Get('/extended/:id')
    async getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productsService.getByIdExtended(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productsService.getById(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }    

    @Post('/')
    create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }

    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() productData: UpdateProductDTO,
    ) {
        if (!(await this.productsService.getById(id)))
            throw new NotFoundException('Product not found');

        await this.productsService.updateById(id, productData);
        return { success: true };
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.productsService.getById(id)))
            throw new NotFoundException('Product not found');
        await this.productsService.deleteById(id);
        return { success: true };
    }


}
