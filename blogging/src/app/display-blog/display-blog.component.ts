import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService, blog } from '../blog.service';
import { AuthService } from '../auth.service';
import { comma } from 'postcss/lib/list';

interface Comment {
  name: string;
  comment: string;
}
@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.scss']
})
export class DisplayBlogComponent implements OnInit {
  blogIndex!: number;
  blogData: any;
  blogs: blog[] = [];
  blog: any;
  newComment: string = '';
  user: any;
  userName: string = '';
  name: string = '';
  ErrorMessage: string = '';
  errorStatus: boolean = false;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogIndex = +params['index'];
    });
    this.blogs = this.blogService.getStoredData();
    this.blogData = this.blogs[this.blogIndex];
    this.user = this.authService.getLoggedInUser();
    this.name = this.user.name;
    this.userName = this.user.username;
    this.blogService.getComments(this.blogIndex).subscribe(comments => {
      this.blogData.comments = comments;
    });
  }

  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  isComment(comment: any): comment is Comment {
    return comment && comment.name && comment.comment;
  }

  submitComment(): void {
    if (this.newComment.trim() !== '') {
      const commentObject: Comment = {
        name: this.userName,
        comment: this.newComment
      };
      this.blogService.addComment(this.blogIndex, commentObject);
      this.newComment = '';
    }
    else {
      this.errorStatus = true;
      this.ErrorMessage = "Please add comment to post";
    }
  }

  deleteComment(blogIndex: number, commentIndex: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
      this.blogService.deleteComment(blogIndex, commentIndex);
    }
  }

  cancelComment() {
    this.newComment = '';
  }

  isDescriptionArray(description: any): boolean {
    return Array.isArray(description);
  }
  resetCommentSection() {
    this.errorStatus = false;
  }
}
