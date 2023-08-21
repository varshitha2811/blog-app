import { Component } from '@angular/core';

interface Blog {
  title: string;
  author: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogging';

  blogs: Blog[] = JSON.parse(localStorage.getItem('blogs')!) || [];

  constructor() {
    const existingData = [
      {
        "title": "Exploring the Wonders of Nature",
        "author": "Sarah Johnson",
        "description": "In this blog post, we delve into the breathtaking beauty of nature's landscapes and ecosystems. From serene forests to majestic mountains, we take a journey through the wonders that Earth has to offer.",
        "tags": ["nature", "exploration", "landscape"]
      },
      {
        "title": "The Art of Mindfulness",
        "author": "Michael Smith",
        "description": "Discover the power of mindfulness and its impact on mental well-being. This blog discusses techniques for practicing mindfulness in everyday life and how it can lead to greater clarity and peace.",
        "tags": ["mindfulness", "well-being", "meditation"]
      },
      {
        "title": "Unveiling the Mysteries of Deep Space",
        "author": "Emily Martinez",
        "description": "Embark on a cosmic journey as we unravel the mysteries of deep space. From black holes to distant galaxies, we explore the latest discoveries in astrophysics and expand our understanding of the universe.",
        "tags": ["space", "astrophysics", "cosmology"]
      },
      {
        "title": "Cooking Adventures: From Farm to Table",
        "author": "David Thompson",
        "description": "Join us as we share our culinary escapades, from visiting local farms to creating delicious recipes. This blog captures the joy of cooking and emphasizes the importance of fresh, sustainable ingredients.",
        "tags": ["cooking", "food", "recipes"]
      },
      {
        "title": "Rediscovering Classic Literature",
        "author": "Alice Williams",
        "description": "Dive into the world of classic literature and uncover timeless stories that continue to captivate readers. From Shakespearean dramas to Dickensian tales, we explore the enduring appeal of literary masterpieces.",
        "tags": ["literature", "classics", "books"]
      }
     
    ];
    localStorage.setItem("blogs", JSON.stringify(existingData));
  }
  
  addNewBlog(): void {
    // Add new data
    const newBlog: Blog = {
      title: "New Blog Title",
      author: "New Author",
      description: "New Blog Description",
      tags: ["new", "tags"]
    };
    this.blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }
  
}

