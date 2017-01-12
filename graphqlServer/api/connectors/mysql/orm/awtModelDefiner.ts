import * as Sequelize from "sequelize";

export function awtModelDefiner(sequelize, DataTypes): AwtModel { 
  return sequelize.define("awt",
        {
          id: {type: Sequelize.BIGINT(11), 
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true},
          collaborator: { type: Sequelize.STRING },
          issue: { type: Sequelize.STRING },
          description: { type: Sequelize.STRING },
          duration: { type: Sequelize.FLOAT },
          workdate: { type: Sequelize.DATE },
          start: { type: Sequelize.DATE },
          end: { type: Sequelize.DATE },
          paid: { type: Sequelize.BOOLEAN },
          consolidated: { type: Sequelize.BOOLEAN }
        },
        {
          tableName: "awt",
          timestamps: true,
          createdAt: "created_at",
          updatedAt: "updated_at" 
        }
  );
}

// AwtModel interface, needs three interfaces to be defined
export interface AwtAttributes {
  id?: number;
  collaborator: string;
  issue: string;
  description: string;
  duration: number;
  start?: number;
  end?: number;
  paid?: boolean;
  consolidated?: boolean;
}
export interface AwtInstance extends Sequelize.Instance<AwtAttributes>, AwtAttributes{}
// this is the orm model interface
export interface AwtModel extends Sequelize.Model<AwtInstance, AwtAttributes>{}



