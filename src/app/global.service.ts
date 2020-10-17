import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private _http: HttpClient
  ) { }

  // httpポスト処理
  // @param {string} _postUrl - 送信URL
  // @param {any} _trans_data - 送信データ（デフォルト空）
  // @return {Observable<any>} http.post処理のレスポンス
  public http(_postUrl: string, _trans_data: any = ''): Observable<any> {
    let ret: Observable<any>;
    let postUrl: string;
    postUrl = _postUrl;
    ret = this._http.post(postUrl, _trans_data, HTTP_OPTIONS)
    .pipe(
      timeout(5000),
      catchError(this.handleError())
    );
    return ret;
  }

   // Observable のエラーを返却します
   // @param 無し
   // @return {Observable<any>}
   private handleError(): any {
     return (error: any): Observable<any> => {
       const ret = {
         'status': error.status
         , 'data': error.statusText + '/' + error.url
       };
       return throwError(ret);
     };
   }
}
