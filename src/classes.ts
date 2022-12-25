import { ChildProcess } from "child_process";
import { Employee, IEmployeeOrgApp } from "./interface";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  orgChart;

  previousAction: any = {};

  constructor(orgChart: Employee) {
    this.orgChart = orgChart;
  }

  move(employeeId: number, superVisorId: number) {
    // store the move operation
    this.previousAction.employeeId = employeeId;
    this.previousAction.superVisorId = superVisorId;

    // find parent of employee using employee ID
    const employeeSuperVisor = this.findEmployeeParent(
      this.orgChart.surbodinates,
      employeeId
    );

    this.previousAction.employeeSuperVisorId = employeeSuperVisor?.uniqueId;

    const supervisor = this.findEmployee(
      this.orgChart.surbodinates,
      superVisorId
    );
    if (supervisor != null) {
      let movingEmployee = employeeSuperVisor?.surbodinates.find(
        (item) => item.uniqueId === employeeId
      );
      if (employeeSuperVisor != null) {
        // store every person below the supervisor
        let surbodinates = movingEmployee?.surbodinates;
        this.previousAction.surbodinates = surbodinates;

        employeeSuperVisor.surbodinates =
          employeeSuperVisor.surbodinates.filter((employee) => {
            return employee.uniqueId !== employeeId;
          });
        if (surbodinates !== undefined) {
          employeeSuperVisor.surbodinates.push(...surbodinates);
        }
      }
      if (movingEmployee != undefined || movingEmployee != null) {
        supervisor.surbodinates.push({
          ...movingEmployee,
          ...{ surbodinates: [] },
        });
      }
      console.log({ orgChartMove: this.orgChart });
      // console.log({supervisor: supervisor})
      // console.log({employeeSupervisor: employeeSuperVisor})
    }
  }

  undo(): void {
    const employeeId = this.previousAction.employeeId;
    const previousSupervisorId = this.previousAction.employeeSuperVisorId;
    const previousSurbodinates: Employee[] = this.previousAction.surbodinates;
    const employeeParent = this.findEmployeeParent(
      this.orgChart.surbodinates,
      employeeId
    );
    if (employeeParent) {
      const employee = employeeParent?.surbodinates.find(
        (employee) => employee.uniqueId === employeeId
      );

      employeeParent.surbodinates = employeeParent.surbodinates.filter(
        (employee) => employee.uniqueId !== employeeId
      );
      const previousSupervisor = this.findEmployee(
        this.orgChart.surbodinates,
        previousSupervisorId
      );
      if (previousSupervisor) {
        previousSupervisor.surbodinates =
          previousSupervisor?.surbodinates.filter(
            (el) => -1 === previousSurbodinates.indexOf(el)
          );
        if (employee) {
          previousSupervisor?.surbodinates.push({
            ...employee,
            ...{ surbodinates: previousSurbodinates },
          });
        }
        console.log({ orgChartUndo: { ...{}, ...this.orgChart } });
      }
    }
  }
  redo(): void {
    this.move(
      this.previousAction.employeeId,
      this.previousAction.employeeSuperVisorId
    );
    console.log({ orgChartRedo: { ...{}, ...this.orgChart } });
   
  }

  findEmployeeParent(
    employeesOrgChart: Employee[],
    id: number
  ): Employee | null {
    let result;
    employeesOrgChart.some((child) => {
      if (child.surbodinates.some((e) => e.uniqueId === id)) {
        result = child;

        return (result = child);
      } else {
        return (result = this.findEmployeeParent(child.surbodinates || [], id));
      }
    });

    return result === undefined ? null : result;
  }

  findEmployee(employeesOrgChart: Employee[], id: number): Employee | null {
    let result;
    employeesOrgChart.some((child) => {
      if (child.uniqueId === id) {
        return (result = child);
      } else {
        return (result = this.findEmployee(child.surbodinates || [], id));
      }
    });
    return result === undefined ? null : result;
  }
}
