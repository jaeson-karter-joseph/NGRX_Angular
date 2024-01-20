import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "./store/action";
import { RegisterRequest } from "./store/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { selecIsSumitting } from "./store/selectors";
import { AuthStateInterface } from "../types/authState.interface";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { selectValidationErrors } from "./store/reducers";
import { combineLatest } from "rxjs";
import { BackendErrorMessagesComponent } from "../backend-error-messages/backend-error-messages.component";


@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessagesComponent]
})

export class RegisterComponent {
    title = 'mediumClone_angular';

    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
    })

    data$ = combineLatest({
        isSubmitting : this.store.select(selecIsSumitting),
        backendError : this.store.select(selectValidationErrors)
    })


    constructor(private fb: FormBuilder,
        private store: Store<{ auth: AuthStateInterface }>
        , private authServce: AuthService) {
        this.onSubmit();
    }

    onSubmit() {
        console.log(this.form.getRawValue());
        const request: RegisterRequest = {
            user: this.form.getRawValue()
        }
        this.store.dispatch(authActions.register({ request }));
        this.authServce.register(request).subscribe((res) => {
            console.log(res);
        });

    }
}