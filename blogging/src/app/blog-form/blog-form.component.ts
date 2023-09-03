import { Component, ViewChild, ElementRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Navigation, Router } from '@angular/router';

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
  comments: object | any;
  user: any;
  author_name: string = '';
  userName: string = '';
  showTitleError: boolean = false;
  charCount: number = 0;
  validDescritption: boolean = false;
  isUrlInvalid: boolean = false;

  @ViewChild('myCheckbox') myCheckboxRef!: ElementRef<HTMLInputElement>;
  titleInput: any;
  constructor(private blogService: BlogService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.author_name = this.user.name;
    this.userName = this.user.username;
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

    const newBlog = {
      title: this.title,
      author: this.author_name,
      description: descriptionParagraphs,
      tags: this.tags,
      url: this.url ? this.url : defaultUrl,
      comment: this.comments,
      time: new Date(),
      userName: this.userName,
    };
    this.blogService.addBlog(newBlog);
    this.resetForm();
    if (this.myCheckboxRef) {
      this.myCheckboxRef.nativeElement.checked = false;
    }
    this.router.navigate(['/profile']);
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

  onTagChange(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    } else {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }
}
