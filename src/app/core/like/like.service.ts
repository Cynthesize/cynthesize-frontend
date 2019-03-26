import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private apollo: Apollo) {}

  /**
   * LikeOrDislike
   */
  public likeOrDisLike(filteredInfo: object) {
    const mutation = filteredInfo['mutation'];
    delete filteredInfo['mutation'];
    return this.apollo
      .mutate<any>({
        mutation: mutation,
        variables: filteredInfo
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
