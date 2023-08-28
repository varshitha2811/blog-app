import { Component,ViewChild,ElementRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';

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
  isSuccess: boolean = false;
  user: any;
  author_name:string='';  
  userName:string='';
  
  @ViewChild('myCheckbox') myCheckboxRef!: ElementRef<HTMLInputElement>;
  constructor(private blogService: BlogService,private authService :AuthService) { }
  ngOnInit(){
    this.user = this.authService.getLoggedInUser();
    this.author_name = this.user.name;
    this.userName=this.user.username;
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
      userName:this.userName,
    };
    this.isSuccess = true;
    this.author = this.capitalizeFirstLetter(this.author);
    this.blogService.addBlog(newBlog);
    this.isSuccess = true;
    this.resetForm();
    if (this.myCheckboxRef) {
      this.myCheckboxRef.nativeElement.checked = false;
    }
  }
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
    if (!this.tags.includes(this.capitalizeFirstLetter(tag))) {
      this.tags.push(this.capitalizeFirstLetter(tag));
    } else {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }
}
