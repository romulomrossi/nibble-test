import CustomersRepository from '../repositories/CustomersRepository';
import { controller, httpGet, httpPost, httpPut, httpDelete, requestBody, requestParam, BaseHttpController } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../constant/types';
import Customer from '../entities/Customer';
import MailService from '../services/MailService';

@controller("/customers")
export default class CustomersController extends BaseHttpController {

    constructor(
        @inject(TYPES.CustomersRepository) 
        private repository: CustomersRepository, 
        @inject(TYPES.MailService)
        private mailService: MailService 
    )
    {
        super();
    } 
    
    @httpPost('/')
    public async insert(
        @requestBody() data: Customer )
    {
        try 
        {
            var response = await this.repository.create(data);
            this.mailService.send(data.name);
            return this.json(response, 200);
        } 
        catch(err) {
            return this.json(err, 500);
        }
    }

    @httpGet('/')
    public async list() 
    {
        try {
            var customers = await this.repository.fetch();        
            return this.json(customers, 200);
        }
        catch(err) {
            return this.json(err, 500);
        }
    }

    @httpGet('/:customerId')
    public async getById(
        @requestParam('customerId') customerId:String ) 
    {
        try {
            var customer = await this.repository.fetchById(customerId);
            return this.json(customer, 200);
        }
        catch(err) {
            return this.json(err, 404);
        }
    }

    @httpPut('/:customerId')
    public async putById(
        @requestBody() update:Customer, 
        @requestParam('customerId') customerId:String )
    {
        try {
            await this.repository.update(customerId, update);
            return this.json(update, 200);
        } 
        catch (err) {
            return this.json(err, 500);
        }
    }

    @httpDelete('/:customerId')
    public async removeById(
        @requestParam('customerId') customerId:String ) 
    {
        try {
            await this.repository.remove(customerId);
            return this.statusCode(200);
        } 
        catch(err) {
            return this.json(err, 500);
        }
    }
}