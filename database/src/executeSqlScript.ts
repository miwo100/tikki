import * as fs from "fs";
import * as sequelize from "sequelize";
import { Sequelize } from "sequelize";

function executeSqlScript(queryInterface: sequelize.QueryInterface, filePath: string): Promise<any>{
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: 'utf-8'}, (err, sqlToExecute) => {
            if(err) {reject(err);}
            else
            {
                queryInterface.sequelize.query(sqlToExecute)
                .then(
                    (data) => {resolve('Execution successfull');},
                    (error) => {console.log(error.message); reject(error.message);}
                    );
            }
        });
    });
}

export { executeSqlScript };