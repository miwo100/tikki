import * as Sequelize from "sequelize";
import * as orm from "./orm";


export class MySqlConnector{
  
  private connector: Sequelize.Sequelize;
  awt: orm.AwtModel;

  constructor(server: string, database: string,
              user: string, password: string)
  {
    this.connector = new Sequelize(database, user, password, {
      host: server,
      dialect: "mysql"
    });
    this.connector.authenticate()
      .then(() => { 
        console.log('Connection has been established successfully.');
        this.mapModels();
      })
      .then(() => this.connector.sync({force: true}))
      .catch((err) => {
          console.log('Unable to connect to the database:', err);
        } 
      );
  }

  mapModels(): void {
    this.awt =  this.connector.import("awt", orm.awtModelDefiner);
  }


}







//syncs all defined models with database tables, data will be deleted
//mysqlConnector.sync({ force: true })

//mysqlConnector.sync({ force: true }).then(() => {});
//resync table in case schema changes
//optinally insert test row

/*mysqlConnector.sync({ force: true }).then(() =>
{
    awt.create(
        {
            collaborator: "Michael",
            issue:  "issue #13",
            description: "issue #13 fixed",
            duration: 2.5,
            start: null,
            end: null,
            paid: true,
            consolidated: true
        }
    )
})*/