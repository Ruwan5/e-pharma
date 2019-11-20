import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../users_list/firebase.service';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.firebaseService.getPeople(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}