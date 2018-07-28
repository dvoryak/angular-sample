import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../service/issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    console.log(this.issueService.getIssues());
  }

}
