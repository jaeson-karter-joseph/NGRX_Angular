import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequest } from "./registerRequest.interface";
import { CurrentUserInterface } from "../../types/currentUser.interface";
import { BackendErrorInterface } from "../../types/backendError.interface";

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        'Register': props<{ request: RegisterRequest }>(),
        'Register Success': props<{ currentUser: CurrentUserInterface }>(),
        'Register Failure': props<{ errors: BackendErrorInterface }>(),
    }
});
