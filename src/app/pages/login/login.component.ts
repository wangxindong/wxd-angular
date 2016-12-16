import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Response,Headers,RequestOptions, RequestMethod,Request } from '@angular/http';

@Component({
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./login.css')],
    template: require('./login.html'),
})

export class Login {
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    private headers: Headers;
    private requestOptions: RequestOptions;
    private res: Response;

    constructor(fb: FormBuilder, private http: Http) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        let url = 'http://115.28.89.235/JIANONG/customerSettingsController/findAddressList.do';
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let options = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers
        });
        if (this.form.valid) {
            this.http.request(url,
                new RequestOptions(options)).subscribe((r) => {
                    console.log(r.json().result_msg);
                })
        }
    }

}