import { createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.states';

export const selectAppState = createFeatureSelector<AppState>('appState');
