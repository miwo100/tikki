import { Store, StoreEnhancer, createStore, compose } from "redux";
import { AppState, default as reducer } from "./reducers";
import { OpaqueToken } from '@angular/core';

export const AppStore = new OpaqueToken('App.store');

let devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

let store: Store<AppState> = createStore<AppState>(
  reducer,
  compose(devtools)
);

export function storeFactory(){ return store };




