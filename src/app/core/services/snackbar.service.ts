import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components';
// import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
// import { TranslateService } from '@ngx-translate/core';
// above import (SnackBarComponent from ../components/snack-bar/snack-bar.component) 
// is intentionally to avoid circular dependencies

@Injectable()

export class SnackBarService {

    private durationInSeconds = 10;
    private snackBarMessageBody: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _snackBar: MatSnackBar) {
    }

    // public setSnackBarMessage(message: any) {
    //     let body: any = null;
    //     if (message) {
    //         body = {
    //             message
    //         };
    //     }
    //     this.snackBarMessageBody.next(body);
    // }
    public setSnackBarMessage(messageData: { message: string, status: number }) {
        this.snackBarMessageBody.next(messageData);
    }


    getSnackMessage(): Observable<any> {
        return this.snackBarMessageBody.asObservable();
    }

    initSnackBar = () => {
        this.getSnackMessage().subscribe(body => {
            if (body) {
                this.openSnackBar(body);
            }
        })
    }

    openSnackBar(body: any) {
        if (body) {
            this._snackBar.openFromComponent(SnackBarComponent, {
                duration: this.durationInSeconds * 1000,
                data: body
            });
        }
    }

    closeSnackBar() {
        this._snackBar.dismiss()
    }
}
