import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }


    canActivate() {
        let identity = this._userService.getIdentity();
        console.log(identity);
        if (identity && (identity.userrol == 'ROLE_USER' || identity.userrol == 'ROLE_ADMIN')) {
            console.log('el rol es');
            console.log(identity.userrol);
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }



    }

}