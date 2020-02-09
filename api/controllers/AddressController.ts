import { BaseHttpController, controller, httpGet, requestParam, httpPost, requestBody, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../constant/types';
import AddressesRepository from '../repositories/AddressesRepository';
import Address from '../entities/Address';

@controller("/customers/:customerId/addresses")
export default class AddressesController extends BaseHttpController{

    constructor(
        @inject(TYPES.AddressesRepository) 
        private addressRepository:AddressesRepository
    ){
        super();
    }

    @httpGet("/")
    public async list(
        @requestParam('customerId') customerId:String
    ){
        try {
            var addresses = await this.addressRepository.fetch(customerId);
            return this.json(addresses, 200);
        }
        catch(err) {
            return this.json(err, 500);
        }  
    }

    @httpPost('/')
    public async create(
        @requestParam('customerId') customerId: string,
        @requestBody() address: Address
    ){
        try {
            var response = await this.addressRepository.create(customerId, address);
            return this.json(response, 201);
        } 
        catch(err) {
            return this.json(err, 400);
        }
    }

    @httpDelete('/:addressId')
    public async delete(
        @requestParam('customerId') customerId: String,
        @requestParam('addressId') addressId: String
    ){
        await this.addressRepository.remove(customerId, addressId);
        return this.statusCode(200);
    }
}