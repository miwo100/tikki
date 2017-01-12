import * as models from "../connectors/mysql/orm";
//other models might have more than one connector
export class Awt{

    public getAll(context): PromiseLike<models.AwtInstance[]> { 
        return (<models.AwtModel>context.connectors.mysql.awt).all({raw: true, order: [["id", "DESC"]], limit: 5});
    }

    public add(args, context): PromiseLike<models.AwtInstance> {
        return (<models.AwtModel>context.connectors.mysql.awt).create(args);
    }
}


