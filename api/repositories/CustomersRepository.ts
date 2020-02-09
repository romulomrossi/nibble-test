import Customer from "../entities/Customer";
import Address from '../entities/Address';

import { getModelForClass } from "@typegoose/typegoose";
import { injectable } from "inversify";

@injectable()
class CustomersRepository {

    private customersModel = getModelForClass(Customer);
    private addressesModel = getModelForClass(Address);

    public fetch(): Promise<Customer[]> {
    
        return new Promise<Customer[]>((resolve, reject) => {

            this.customersModel.find((err, customers) => {
                
                if(err)
                    reject(err);
                else 
                    resolve(customers);
            });
        });
    }

    public fetchById(id:String): Promise<Customer> {
        
        return new Promise<Customer>((resolve, reject) => {

            this.customersModel.findById(id, (err, customer:Customer) => {

                if(err || customer == null)
                    reject(err);
                else
                    resolve(customer);
            });
        });
    }
    
    public create(customer:Customer): Promise<Customer> {
        
        return new Promise<Customer>((resolve, reject) => {
            this.customersModel.create(customer, (err:any, res:Customer) => {
                if(err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }

    public update(id:String, update:Customer): Promise<Customer> {

        return new Promise<Customer>((resolve, reject) => {

            this.customersModel.findOneAndUpdate({_id: id}, update, (err, res) => {
               
                if(err)
                    reject(err);
                else
                    resolve(update);
            });
        });

    }

    public remove(id:String): Promise<void> {
       
        return new Promise<void>((resolve, reject) => {
            
            this.addressesModel.remove({customer: id}, (err) => {
                
                if(err)
                    reject(err);
                else
                    this.customersModel.deleteOne({_id: id}, (err) => {
                        if(err)
                            reject(err);
                        else
                            resolve();
                    });
            });
        });
    }
}

export default CustomersRepository;