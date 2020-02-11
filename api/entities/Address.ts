import { prop, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import Customer from './Customer';


export default class Address {
    
    @prop({ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Customer
    })
    customer!: String;
    @prop({
        type:String
    })
    zipCode!: String;
    @prop({
        type:String
    })    
    state!: String;
    @prop()
    city!: String;
    @prop({
        type: String
    })
    neighborhood!: String;
    @prop({
        type:String
    })
    street!: String;
    @prop({
        type:String
    })
    additionalInfo!: String;
    @prop({
        type: String
    })
    number!: String;
    @prop({
        type:Boolean
    })
    isPrimary!: Boolean;
    @prop({
        type: String
    })
    type!: String;
}