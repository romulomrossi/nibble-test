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
        required: true, 
        type:String
    })
    zipCode!: String;
    @prop({
        required: true, 
        type:String
    })    state!: String;
    city!: String;
    @prop({
        required: true, 
        type: String
    })
    neighborhood!: String;
    @prop({
        required: true, 
        type:String
    })
    street!: String;
    @prop({
        required: true, 
        type:String
    })
    additionalInfo!: String;
    @prop({
        required: true, 
        type: String
    })
    number!: String;
    @prop({
        required: true, 
        type:Boolean
    })
    isPrimary!: Boolean;
    @prop({
        required: true, 
        type: String
    })
    type!: String;
}