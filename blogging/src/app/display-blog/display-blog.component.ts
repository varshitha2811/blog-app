import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService, blog } from '../blog.service';

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

  newComment: string = '';
  user: any;
  userName: string = '';
  name: string = '';
  ErrorMessage: string = '';
  errorStatus: boolean = false;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) {
        this.blogService.getBlogById(postId).subscribe(
          (data) => {
            this.blogData = data;
          },
          (error) => {
            console.error('Error fetching blog post:', error);
          }
        );
      }
    });

    // this.blogData = this.blogs[this.blogIndex];
    this.user = this.authService.getLoggedInUser();
    this.name = this.user.name;
    this.userName = this.user.username;
    // this.blogService.getComments(this.blogIndex).subscribe(comments => {
    //   this.blogData.comments = comments;
    // });
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
        comment: this.newComment,
      };

      this.blogService.addComment(this.blogData._id, commentObject).subscribe(
        (response) => {
          console.log('Comment added successfully:', response);
          this.blogData.comments.push(commentObject);
        },
        (error) => {
          console.log("error");
          console.error('Error adding comment:', error);
        }
      );

      this.newComment = '';
    } else {
      this.errorStatus = true;
      this.ErrorMessage = 'Please add a comment to the post';
    }
  }

  // deleteComment(blogIndex: string, commentIndex: number): void {
  //   const confirmDelete = confirm('Are you sure you want to delete this comment?');
  //   if (confirmDelete) {
  //     this.blogService.deleteComment(blogIndex, commentIndex);
  //   }
  // }

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
