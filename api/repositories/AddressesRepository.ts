import Customer from "../entities/Customer";
import Address from '../entities/Address';

import { getModelForClass } from "@typegoose/typegoose";
import { injectable } from "inversify";

@injectable()
class AddressesRepository {

    private CustomerModel = getModelForClass(Customer);
    private AddressModel = getModelForClass(Address);

    public fetch(customerId:String): Promise<Address[]> {

        return new Promise<Address[]>((resolve, reject) => {

            this.AddressModel.find({customer: customerId}, (err, res) => {

                if(err)
                    reject(err);
                else
                    resolve(res);
            })
        });
    }

    public create(customerId:String, address:Address): Promise<Address> {

        return new Promise<Address>((resolve, reject) => {

            address.customer = customerId;
            this.CustomerModel.findById(customerId, (err, customer) => {

                if(err || customer == null)
                    reject(err);
                else {
                    
                    this.AddressModel.updateMany(
                        { customer: customerId }, 
                        { $set: { isPrimary: !address.isPrimary } },
                        (err:any) => {
                    
                            if(err)
                                reject(new Error("Transaction failed, try again"));
                            else {
                                this.AddressModel.create(
                                    address,
                                    (err:any, res:Address) => {
                                        if(err)
                                            reject(err);
                                        else
                                        {
                                            resolve(res);
                                        }
                                    }
                                );
                            }
                        });
                }
            });
        });
    }

    public remove(customerId: String, addressId: String): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            this.CustomerModel.findById(customerId, (err, customer) => {
            
                if(err || customer == null)
                    reject(err);
                else
                    this.AddressModel.deleteOne({_id: addressId}, (err) => {
                        if(err)
                            reject(err);
                        else
                            resolve();
                    })
            })
        });
    }
}

export default AddressesRepository;