import { Injectable } from '@angular/core';

      
import { Datablock } from './datablock';
import { DATABLOCKS } from './mock-datablocks';
import { Observable, of, Subject, Subscription, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap, take, filter } from 'rxjs/operators';

   

@Injectable({
  providedIn: 'root'
})
export class DatablockService {
  private baseUrl = 'http://localhost:8080/api/'; 
  private getDatablocksUrl = "DataBlocks"

  private datablockSubject: BehaviorSubject<Datablock[]>;
  private datablockRequest: Observable<Datablock[]>;
  private datablockSubscription: Subscription;


  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.datablockSubject = new BehaviorSubject([]);
  }
    
  getDatablocks(): Observable<Datablock[]> {
    this.datablockRequest = this.http.get<Datablock[]>(this.baseUrl + this.getDatablocksUrl)
    .pipe(
      catchError(this.handleError<Datablock[]>('getDatablocks', [])));

      this.datablockRequest.subscribe(
        result => this.datablockSubject.next(result),
        err => this.datablockSubject.error(err))
    return this.datablockSubject.asObservable();
  }

  onDestroy(){
    this.datablockSubscription.unsubscribe();
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

/** GET datablock by id. Will 404 if id not found */
getDatablock(id: number): Observable<Datablock> {
  
  const url = `${this.baseUrl}${this.getDatablocksUrl}/${id}`;
  return this.http.get<Datablock>(url).pipe(
    catchError(this.handleError<Datablock>(`getDatablock id=${id}`))
  );
}

  async postDatablock(id: number, size: number){
  const url = `${this.baseUrl}${this.getDatablocksUrl}/${id}`;
  var postRequest = await this.http.post<Datablock>(url,   size ).pipe(
    catchError(this.handleError<Datablock>(`created id=${id} size=${size}`)),
  ).toPromise();

  this.datablockSubject.next(await this.getDatablocks().toPromise());

  return postRequest;
}

async putDatablock(datablock : Datablock){
  const url = `${this.baseUrl}${this.getDatablocksUrl}/${datablock.id}`;
  const params = new HttpParams()
  .set('data', datablock.data)
  var putRequest = await this.http.put(url, params).pipe(
    catchError(this.handleError<Datablock>(`put id=${datablock.id}`))
  ).toPromise();

  this.datablockSubject.next(await this.getDatablocks().toPromise());
  return putRequest;
}

async deleteDatablock(id: number){
  const url = `${this.baseUrl}${this.getDatablocksUrl}/${id}`;
  var deleteRequest = this.http.delete(url).pipe(
    catchError(this.handleError<Datablock>(`deleted id=${id}`))
  ).toPromise();

  await deleteRequest;

  this.datablockSubject.next(await this.getDatablocks().toPromise());

  return deleteRequest;
}



  private log(message: string) {
    this.messageService.add(`DatablockService: ${message}`);
  }
}
