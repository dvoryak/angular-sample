import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Issue} from '../../model/issue';
import {IssueService} from '../../service/issue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private issueService: IssueService,
              private route: ActivatedRoute, private sb: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }
updateIssue(title, responsible, description, severity, status) {
  this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe( () => {
    this.sb.open('Issue updated', 'OK', {
      duration: 3000
    });
  });
}

}
