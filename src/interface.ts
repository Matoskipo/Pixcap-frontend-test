export interface Employee{
    uniqueId: number;
    name:string;
    surbodinates: Employee []
}

export interface IEmployeeOrgApp{
    orgChart: Employee;

    move(employeeId: number, superVisorId:number): void;
    undo(): void;
    redo(): void;
}