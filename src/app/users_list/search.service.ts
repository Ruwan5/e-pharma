import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable , BehaviorSubject,} from 'rxjs';
import { switchMap, map , debounceTime, distinctUntilChanged} from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  

  constructor(private afs: AngularFirestore) { }
  
  getData(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(
      switchMap((startText) => {
      const endText = startText + '\uf8ff';
      return this.afs
      .collection('users', ref =>
        ref
          .orderBy('FirstName')
          .limit(10)
          .startAt(startText)
          .endAt(endText)
      )
      .snapshotChanges()
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((changes => {
          return changes.map(c => {
            console.log(c);
            const data = c.payload.doc.data();
            const id = c.payload.doc.id;
            return { id, ...data };
          });
        }))
      )
      
      
    }))
  }
}
