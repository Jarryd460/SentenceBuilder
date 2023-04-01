import { ProblemDetails } from 'sentencebuilder-api-client-sdk-typescriptangular';

export interface AppState {
    apiStatus: ApiStatus;
    apiResponseMessage: string;
    error: ProblemDetails | null;
}

export enum ApiStatus {
    Unknown,
    Success,
    Failure
}