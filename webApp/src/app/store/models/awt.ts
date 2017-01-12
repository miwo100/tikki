export interface Awt{
    id : number;
    collaborator: string;
    issue: string;
    description: string;
    duration: number;
    workdate: Date;
    start?: Date;
    end?: Date;
    paid: Boolean;
    consolidated: Boolean;
    createdAt: Date;
    updatedAt: Date;
}
