import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { ISupportTicket } from 'src/app/interfaces/ticket';

@Injectable()
export class TicketService {
  private readonly baseUrl = 'api/support-tickets';
  public supportTickets: Subject<ISupportTicket[]>;

  constructor(private http: HttpClient) {
    this.supportTickets = new Subject();
  }

  all(): Observable<ISupportTicket[]> {
    return this.http.get<ISupportTicket[]>(this.baseUrl);
  }

  getById(id: string): Observable<ISupportTicket> {
    return this.http.get<ISupportTicket>(`${this.baseUrl}/${id}`);
  }

  create(payload: ISupportTicket) {
    const reqbody = payload;
    return this.http.post<ISupportTicket>(this.baseUrl, reqbody);
  }

  update(id: string, payload): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => {
          response.id = id;
          return response;
        })
      );
  }
}
