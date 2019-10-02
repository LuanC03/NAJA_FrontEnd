import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    shared: SharedService;

    constructor(){
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest : any;

        if(this.shared.isLoggedIn()){
            authRequest = req.clone({
                setHeaders:{
                    'Authorization' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJuYWphIiwic3ViIjoiNWQ5MjY0MmZjOWRhMTA1MDA0NmQ2YWZlIiwiaWF0IjoxNTY5OTY5MzU5MDQxLCJleHAiOjE1NzAwNTU3NTkwNDF9.wN0VD2_LsVKmnlMHyY4VQPF99ygrCt6nr2inelpYWwk'
                }
            });
            return next.handle(authRequest);
        }else{
            return next.handle(req);
        }
    }
}