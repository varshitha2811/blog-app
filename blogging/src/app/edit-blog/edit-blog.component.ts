import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, blog } from '../blog.service';
import { Observable } from 'rxjs';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  id!: string;
  blogData: blog = {
    title: '',
    author: '',
    description: [],
    tags: [],
    url: '',
    time: "",
    comments: [],
    userName: '',
  };
  customTags: String = '';
  tags: string[] = [];
  charCount: number = 0;
  validDescritption: boolean = false;
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.blogService.getBlogById(this.id).subscribe(data => {
        this.blogData = data;
        this.customTags = this.blogData.tags.join(', ');
        this.description = this.blogData.description.join('  ');
      });
    });
  }

  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    upload: (file: File) => {
      return new Observable<HttpEvent<UploadResponse>>();
    },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  onCustomTagsInputChange(): void {
    const inputTags = this.customTags.split(',').map(tag => tag.trim());
    const validTags = inputTags.filter(tag => tag !== '');
    this.tags = validTags;
  }
  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
    this.customTags = this.tags.join(', ');
  }
  isHtml(content: string): boolean {
    return /<[a-z][\s\S]*>/i.test(content);
  }
  countChar() {
    this.charCount = this.blogData.description.length
    if (this.charCount >= 25) {
      this.validDescritption = true;
    }
  }
  areAllFieldsFilled(): boolean {
    return (
      this.blogData.title.trim() !== ''
    );
  }
  submitBlog(): void {
    const descriptionParagraphs = this.description.split('\n');
    const defaultUrl = 'https://images.unsplash.com/photo-1505744386214-51dba16a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1306&q=80';
    this.blogData = {
      title: this.blogData.title,
      author: this.blogData.author,
      description: descriptionParagraphs,
      tags: this.tags,
      url: this.blogData.url ? this.blogData.url : defaultUrl,
      comments: this.blogData.comments,
      time: new Date().toString(),
      userName: this.blogData.userName,
    };
    this.blogService.updateBlog(this.id, this.blogData).subscribe(
      (updatedBlog) => {
        this.router.navigate(['/blog/profile']);
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          console.error('Validation error:', error.error);
        } else {
          console.error('Error updating blog post:', error);
        }
      }
    );
  }
}
