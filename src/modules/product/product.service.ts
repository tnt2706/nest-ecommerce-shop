import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, Electronic, Clothing } from './schemas';

@Injectable()
class ProductService {
  static productRegistry = {};

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Clothing.name) private clothingModel: Model<Clothing>,
    @InjectModel(Electronic.name) private electronicModel: Model<Electronic>,
  ) {}

  static async registerProductType(type, classRef): Promise<void> {
    ProductService.productRegistry[type] = classRef;
  }

  async create(req: any, createProductDto: any): Promise<ProductDto> {
    const { userId } = req?.user;
    const { product_type } = createProductDto;

    const productClass = ProductService.productRegistry[product_type];
    if (!productClass) {
      throw new BadRequestException(`Invalid product type ${product_type}`);
    }

    return new productClass({
      product_shop: userId,
      product_type,
      payload: createProductDto,
      productModel: this.productModel,
      clothingModel: this.clothingModel,
      electronicModel: this.electronicModel,
    }).createProduct();
  }
}

class ProductClass {
  protected readonly product_name: string;
  protected readonly product_thumb: string;
  protected readonly product_description: string;
  protected readonly product_price: number;
  protected readonly product_quantity: number;
  protected readonly product_shop: string;
  protected readonly product_type: string;
  protected readonly product_attributes: any;
  protected readonly clothingModel: any;
  protected readonly electronicModel: any;
  protected readonly productModel: any;
  constructor({
    product_type,
    payload,
    productModel,
    clothingModel,
    electronicModel,
  }) {
    const {
      product_name,
      product_thumb,
      product_description,
      product_price,
      product_quantity,
      product_attributes,
      product_shop,
    } = payload;

    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_shop = product_shop;
    this.product_type = product_type;
    this.product_attributes = product_attributes || [];
    this.productModel = productModel;
    this.clothingModel = clothingModel;
    this.electronicModel = electronicModel;
  }

  async createProduct(productId): Promise<any> {
    const newProduct = await this.productModel.create({
      ...this,
      _id: productId,
    });

    return newProduct;
  }
}

class ElectronicClass extends ProductClass {
  async createProduct(): Promise<any> {
    const newElectronic = await this.electronicModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newElectronic)
      throw new BadRequestException('Create electronic error !');

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestException('Create product error !');

    return newProduct;

    return null;
  }
}

class ClothingClass extends ProductClass {
  async createProduct(): Promise<any> {
    const newClothing = await this.clothingModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newClothing) throw new BadRequestException('Create clothing error !');

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestException('Create product error !');

    return newProduct;

    return null;
  }
}

ProductService.registerProductType('Electronics', ElectronicClass);
ProductService.registerProductType('Clothing', ClothingClass);

export default ProductService;
