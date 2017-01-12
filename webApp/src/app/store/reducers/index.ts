import {
  Reducer,
  combineReducers 
} from "redux";

import { AwtState, AwtsReducer } from "./awtsReducer";

export interface AppState{
   awtState: AwtState; 
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    awtState: AwtsReducer
});

export default rootReducer;

export * from "./awtsReducer";