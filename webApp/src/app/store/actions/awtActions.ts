import {
  Action,
  ActionCreator
} from "redux";

import { Awt } from "../models";

export const LOAD_AWTS: string = "[Awt] Load";
export const ADD_AWT: string = "[Awt] Add";
export interface loadAwtAction extends Action{
    awts: Awt[];
};
export interface addAwtAction extends Action{
    awt: Awt;
};
export const loadAwts: ActionCreator<loadAwtAction> = 
(awts: [Awt]) => ({ 
        type: LOAD_AWTS,
        awts: awts
      });
export const addAwt: ActionCreator<addAwtAction> = 
(awt: Awt) => ({ 
        type: ADD_AWT,
        awt: awt
      });


