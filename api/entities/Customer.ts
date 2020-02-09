import { prop } from '@typegoose/typegoose';

export default class Customer {

    @prop({ required: true })
    name!: String;
    @prop({ required: true, minlength: 13, maxlength: 13 })
    document!: String;
    @prop({ required: true })
    email!: String;
    @prop({required: false})
    phone!: String;
}