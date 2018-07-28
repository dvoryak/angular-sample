import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Issue} from '../model/issue';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private uri = 'http://localhost:9999';

  constructor(private http: HttpClient) {
  }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.uri + '/issues');
  }

  getIssueById(id): Observable<Issue> {
    return this.http.get<Issue>(this.uri + '/issues/' + id);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(this.uri + '/issues', issue);
  }

  deleteIssue(id) {
    return this.http.delete(this.uri + '/issues/' + id);
  }

  updateIssue(id: String, title: any, responsible: any, description: any, severity: any, status: any) {
    return this.http.put(this.uri + '/issues/' + id,
      {
        title: title,
        responsible: responsible,
        description: description,
        severity: severity,
        status: status
      });
  }
}
