import { prop } from '@typegoose/typegoose';

export default class Customer {

    @prop()
    name!: String;
    @prop()
    document!: String;
    @prop()
    email!: String;
    @prop()
    phone!: String;
}