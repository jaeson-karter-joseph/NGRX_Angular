import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "../../types/currentUser.interface";
import { Inject, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { authActions } from "./action";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistentServiceService } from "../../services/persistent-service.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistentSerice = inject(PersistentServiceService)
) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistentSerice.set('accessToken', currentUser.token);
                    return authActions.registerSuccess({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailure({ errors: errorResponse.error.errors }))
                })
            )
        })
    )
}, { functional: true })

export const redirectAfterSubmitEffect = createEffect((actions$ = inject(Actions), router = Inject(Router)) => {
    return actions$.pipe(ofType(authActions.registerSuccess),
        tap(() => {
            router.navigateByUrl('/')
        }))

})