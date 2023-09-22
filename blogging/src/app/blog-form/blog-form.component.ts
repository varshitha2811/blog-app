import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService, blog } from '../blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  title: string = '';
  author: string = '';
  description: string = '';
  tags: string[] = [];
  url: string = '';
  time: Date | undefined;
  comments: object[] = [];
  user: any;
  author_name: string = '';
  userName: string = '';
  showTitleError: boolean = false;
  charCount: number = 0;
  validDescritption: boolean = false;
  isUrlInvalid: boolean = false;
  customTags: string = '';
  CurrentUser: any;
  currentuserName: string = '';

  @ViewChild('myCheckbox') myCheckboxRef!: ElementRef<HTMLInputElement>;
  titleInput: any;
  constructor(private blogService: BlogService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.authService.getCurrentUser().subscribe((data: any[]) => {
      this.CurrentUser = data;
      this.author_name = this.CurrentUser.name;
      this.userName = this.CurrentUser.userName;
    });
  }

  areAllFieldsFilled(): boolean {
    return (
      this.title.trim() !== '' &&
      (this.description.trim().length >= 25) &&
      this.tags.length > 0
    );
  }

  submitBlog(): void {
    const defaultUrl = 'https://images.unsplash.com/photo-1505744386214-51dba16a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1306&q=80';
    const descriptionParagraphs = this.description.split('\n');
    const customTagsArray = this.customTags.split(',').map(tag => tag.trim());

    const newBlog: blog = {
      title: this.title,
      author: this.author_name,
      description: descriptionParagraphs,
      tags: customTagsArray,
      url: this.url ? this.url : defaultUrl,
      comments: this.comments,
      time: new Date().toString(),
      userName: this.userName,
    };
    this.blogService.addBlog(newBlog).subscribe(addedBlog => {
    });
    this.resetForm();
    if (this.myCheckboxRef) {
      this.myCheckboxRef.nativeElement.checked = false;
    }
    this.router.navigate(['/blog/profile']);
  }

  countChar() {
    this.charCount = this.description.length
    if (this.charCount >= 25) {
      this.validDescritption = true;
    }
  }
  resetForm(): void {
    this.title = '';
    this.author = '';
    this.description = '';
    this.tags = [];
    this.url = '';
    this.time = undefined;
  }

  onCustomTagsInputChange(): void {
    const inputTags = this.customTags.split(',').map(tag => tag.trim());
    const validTags = inputTags.filter(tag => tag !== '');
    this.tags = validTags;
  }
  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
    this.customTags = this.tags.join(', ');
  }
}
