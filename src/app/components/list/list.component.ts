import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../service/issue.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import {Issue} from '../../model/issue';
import {logger} from 'codelyzer/util/logger';
import {log} from 'util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }
  fetchIssues() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      log('Data requested');
      log(this.issues);
    });
  }
  editIssue(id) {
    this.router.navigate(['/edit' + id]);
  }
  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
