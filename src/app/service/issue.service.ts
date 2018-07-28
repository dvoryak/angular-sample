import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue} from '../model/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private uri = 'http://localhost:9999';
  private issues: Issue[];
  constructor(private http: HttpClient) { }

  getIssues(): Issue[] {
    this.http.get<Issue[]>(this.uri + '/issues')
      .subscribe((data) => {
        console.log(data)
        this.issues = data;
      });
    console.log('Service: get issues', this.issues);
    return this.issues;
  }
  getIssueById(id) {
    return this.http.get('${this.uri}/issues/${id}');
  }
  addIssue(title, responsible, description, severity) {
    /*const issue = new Issue(title, responsible, description, severity);
    return this.http.post('${this.url}/issues', issue);*/
  }
}
