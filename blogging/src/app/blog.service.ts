import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from 'autoprefixer';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'blogData';
  private initialBlogs: any[] = [
    {
      "title": "Mastering Web Development with HTML and React",
      "author": "Alex Parker",
      "description": "A comprehensive guide to mastering web development using HTML and React, covering the fundamentals to advanced techniques.",
      "tags": ["Technology", "HTML", "Web Development", "React"],
      "url": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHRtbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Exploring New Horizons: A Traveler's Diary",
      "author": "Eva Miller",
      "description": "Join me on a journey to explore new destinations, cultures, and experiences as I document my adventures around the world.",
      "tags": ["Travel", "Lifestyle"],
      "url": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Savoring Delights: A Culinary Adventure",
      "author": "Maria Sanchez",
      "description": "Embark on a culinary adventure as I share my experiences discovering delectable cuisines and recipes from around the globe.",
      "tags": ["Food", "Lifestyle"],
      "url": "https://images.unsplash.com/photo-1497888329096-51c27beff665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Designing the Future: Creating Illustrator Masterpieces",
      "author": "Olivia Wright",
      "description": "Dive into the world of design with Illustrator and learn how to create stunning visual masterpieces that captivate your audience.",
      "tags": ["Design System", "Illustrator", "Technology"],
      "url": "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzaWduJTIwc3lzdGVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Nurturing a Thriving Business in a Digital Age",
      "author": "Mark Roberts",
      "description": "Discover strategies and insights for building and nurturing a thriving business in the dynamic landscape of the digital age.",
      "tags": ["Business", "Technology"],
      "url": "https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "The Art of Tech and Lifestyle Fusion",
      "author": "Sophia Lee",
      "description": "Explore the seamless integration of technology into modern lifestyle and the ways it shapes our daily routines.",
      "tags": ["Technology", "Lifestyle"],
      "url": "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxpZmVzdHlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "A Gastronomic Journey: Unveiling Culinary Cultures",
      "author": "Carlos Martinez",
      "description": "Embark on a gastronomic journey that unveils the rich tapestry of culinary cultures around the world, from street food to haute cuisine.",
      "tags": ["Food", "Travel"],
      "url": "https://images.unsplash.com/photo-1561380900-6ec1dc7b1464?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Digital Nomad Lifestyle: Balancing Work and Travel",
      "author": "Emily Johnson",
      "description": "Discover the joys and challenges of the digital nomad lifestyle, and learn how to balance work and travel effectively.",
      "tags": ["Travel", "Technology", "Lifestyle"],
      "url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=894&q=80",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "The Evolution of Design Systems",
      "author": "Daniel Miller",
      "description": "Trace the evolution of design systems from their inception to modern-day applications, and their impact on user experience.",
      "tags": ["Design System", "Technology", "Design"],
      "url": "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Navigating the Business Landscape: Strategies for Success",
      "author": "Jessica Turner",
      "description": "Navigate the complex world of business with effective strategies, insightful tips, and success stories from industry leaders.",
      "tags": ["Business", "Strategy"],
      "url": "https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "The Future of AI: Trends and Possibilities",
      "author": "Ryan Watson",
      "description": "Explore the exciting world of artificial intelligence, from current trends to potential future possibilities that AI offers.",
      "tags": ["Technology", "AI", "Future"],
      "url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Healthy Habits for a Balanced Lifestyle",
      "author": "Megan Adams",
      "description": "Discover practical tips and routines for maintaining a balanced lifestyle through exercise, nutrition, and self-care.",
      "tags": ["Lifestyle", "Wellness", "Health"],
      "url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VsbG5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    },
    {
      "title": "Captivating Landscapes: A Photographer's Journey",
      "author": "David Reynolds",
      "description": "Join me on a visual journey through captivating landscapes, and learn photography techniques to capture the beauty of nature.",
      "tags": ["Photography", "Travel", "Lifestyle"],
      "url": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
      "time": "2022-08-15T10:30:00"
    }
  ];
  constructor() {
    const storedData = localStorage.getItem(this.storageKey);
    if (!storedData) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.initialBlogs));
    }
  }

  addBlog(newBlog: any): void {
    const storedData = this.getStoredData();
    newBlog.tags = newBlog.tags.map((tag: string) => tag.toUpperCase());
    storedData.push(newBlog);
    localStorage.setItem(this.storageKey, JSON.stringify(storedData));
  }
  getStoredData(): any[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  deleteBlog(index: number): void {
    const storedData = this.getStoredData();
    
    if (index >= 0 && index < storedData.length) {
      storedData.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(storedData));
    }
  }

  
}
