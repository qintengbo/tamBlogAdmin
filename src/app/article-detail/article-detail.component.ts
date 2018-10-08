import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  breadcrumbText: string; // 面包屑最后一级标题
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classification: [ null, [ Validators.required ] ],
      text: [ null, [ Validators.required ] ],
      comment: [ null, [ Validators.required ] ]
    });
  }

}
