import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService, Comment, blog } from '../blog.service';

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
  comment_id: string= '';
  ErrorMessage: string = '';
  errorStatus: boolean = false;
  postId: string = '';
  comments: Comment[] = [];
  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id') || '';
      if (this.postId) {
        this.blogService.getBlogById(this.postId).subscribe(
          (data) => {
            this.blogData = data;
           
            let commentObject: Comment = {
              name: this.userName,
              comment: this.newComment
            };

            this.blogService.addComment(this.postId, commentObject).subscribe(
              (response) => {
                console.log('Comment added successfully:', response);
                this.blogData.comments.push(commentObject);
              },
              (error) => {
                console.error('Error adding comment:', error);
              }
            );

            this.user = this.authService.getLoggedInUser();
            this.name = this.user.name;
            this.userName = this.user.username;
          },
          (error) => {
            console.error('Error fetching blog post:', error);
          }
        );
      }
    });

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
      const commentObject: Omit<Comment, 'id'> = {
        name: this.userName,
        comment: this.newComment,
        
      };
      console.log('Comment Object:', commentObject);
      if (this.postId) {
        this.blogService.addComment(this.postId, commentObject).subscribe(
          (response) => {
            console.log('Comment added successfully:', response);
            this.blogData.comments.push(commentObject);
          },
          (error) => {
            console.error('Error adding comment:', error);
          }
        );
      } else {
        console.error('Invalid postId');
      }
  
      this.newComment = '';
    } else {
      this.errorStatus = true;
      this.ErrorMessage = 'Please add a comment to the post';
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
