import {Employee} from './interface'
import {EmployeeOrgApp} from './classes'
const ceo: Employee={
   uniqueId: 1,
   name:"Mark Zukerberg",
   surbodinates: [
    {
        uniqueId:5,
        name: "Sarah Donald",
        surbodinates:[
            {
                uniqueId:3,
                name: "Cassandra Reynolds",
                surbodinates:[
                    {
                        uniqueId:4,
                        name:"Mary Blue",
                        surbodinates:[]
                    },
                    {
                        uniqueId:5,
                        name:"Bob Saget",
                        surbodinates:[
                            {
                                uniqueId:6,
                                name:"Tina Teff",
                                surbodinates:[
                                    {
                                        uniqueId:7,
                                        name:"Will Turner",
                                        surbodinates:[]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        uniqueId:9,
        name: "Tyler Simpson",
        surbodinates:[
            {
                uniqueId:15,
                name:"Harry Tobs",
                surbodinates:[
                    {
                        uniqueId:17,
                        name: "Thomas Brown",
                        surbodinates:[]
                    }
                ]
            },
            {
                uniqueId:20,
                name:"George Carrey",
                surbodinates:[]
            },
            {
                uniqueId:21,
                name:"Gary Styles",
                surbodinates:[]
            }
        ]
    },
    {
        uniqueId:11,
        name: " Bruce Willis",
        surbodinates:[]
    },
    {
        uniqueId:13,
        name: "Georgina Flangy",
        surbodinates:[
            {
                uniqueId:22,
                name:"Sophie Turner",
                surbodinates:[]
            }
        ]
    },
    
   ]
}

const app = new EmployeeOrgApp(ceo)

// first argument is surbodinate and second argument is supervisor
// move surbodinate under supervisor array of surbodinates
app.move(5,13)
app.undo()
app.redo()

