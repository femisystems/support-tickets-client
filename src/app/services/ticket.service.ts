import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { ISupportTicket } from 'src/app/interfaces/ticket';

@Injectable()
export class TicketService {
  private readonly baseUrl = 'api/support-tickets';
  public supportTickets: Subject<ISupportTicket[]>;
  public stats = [
    { value: 0, label: 'open tickets', type: 0 },
    { value: 0, label: 'in progress', type: 1 },
    { value: 0, label: 'done', type: 2 }
  ]

  constructor(private http: HttpClient) {
    this.supportTickets = new Subject();
  }

  all(): Observable<ISupportTicket[]> {
    return this.http.get<ISupportTicket[]>(this.baseUrl)
      .pipe(
        tap(supportTickets => this.computeStats(supportTickets)),
        catchError(this.handleError)
      );
  }

  getById(id: string): Observable<ISupportTicket> {
    return this.http.get<ISupportTicket>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(payload: ISupportTicket) {
    const reqbody = payload;
    return this.http.post<ISupportTicket>(this.baseUrl, reqbody)
      .pipe(catchError(this.handleError));
  }

  update(id: string, payload): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError(this.handleError));
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(response => {
          console.log('DELETE RESPONSE ::', response);
        }),
        catchError(this.handleError)
      );
  }

  computeStats(supportTickets: ISupportTicket[]) {
    this.stats = [
      { value: 0, label: 'open tickets', type: 0 },
      { value: 0, label: 'in progress', type: 1 },
      { value: 0, label: 'done', type: 2 }
    ];

    supportTickets.forEach(ticket => {
      if (ticket.status === 0) this.stats[0].value += 1;
      if (ticket.status === 1) this.stats[1].value += 1;
      if (ticket.status === 2) this.stats[2].value += 1;
    });
  }

  handleError(err: any) {
    const msg = err.error instanceof ErrorEvent ?
      err.error.message :
      err.message || err.statusText;

    return throwError(msg);
  }
}
