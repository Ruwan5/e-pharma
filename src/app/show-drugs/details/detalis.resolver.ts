import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { CrudService } from '../../inventory/shared/crud.service';

@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(public crud: CrudService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      console.log(userId)
      this.crud.getDrugDetails(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}