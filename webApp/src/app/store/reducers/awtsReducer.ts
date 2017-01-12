import { Action } from "redux";
import { Map, List } from "immutable";
import * as Immutable from "immutable"

import { createSelector } from "reselect";
import { AppState } from "./index";

import { Awt } from "../models";
import { AwtActions } from "../actions";

export interface AwtState {
    readonly awts: List<Awt>;
} 

const initialState: AwtState =
{
    awts: List<Awt>([])
}

export const AwtsReducer = (state: AwtState = initialState, action: Action): AwtState => {
    switch (action.type) {
        case AwtActions.LOAD_AWTS:
            const awtsToLoad = (<AwtActions.loadAwtAction>action).awts;
            return {awts: List<Awt>(awtsToLoad)};
        case AwtActions.ADD_AWT:
            const awtToAdd: Awt = (<AwtActions.addAwtAction>action).awt;
            return { awts: state.awts.push(awtToAdd) };
    default:
        return state;
    }
}

export const getAwtsState = (state: AppState): AwtState => state.awtState;
// fromJS(toJS()).toJS() generates a deep copy, where as toArray() only returns a one level deep copy
export const getAllAwtsSelector = createSelector(getAwtsState, (state: AwtState) => Immutable.fromJS(state.awts.toJS()).toJS());