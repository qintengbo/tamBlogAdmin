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
  previewState = false; // 预览状态
  markdown = '# H1';

  constructor(
    private fb: FormBuilder
  ) { }

  // 提交表单
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(value);
  }
  // 预览md文件
  preview(): void {
    this.previewState = !this.previewState;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [ null, [ Validators.required ] ],
      classification: [ null, [ Validators.required ] ],
      text: [ null, [ Validators.required ] ],
      comment: [ null, [ Validators.required ] ]
    });
  }

}
