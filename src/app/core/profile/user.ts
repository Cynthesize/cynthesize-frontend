export class User {
  username: string;
  full_name: string;
  email: string;
  is_admin: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  birth_date: Date;
  bio: string;
  technologies: Array<string>;
  social_links: Array<string>;
  // this.user = { "username": "vp", "full_name": "vivek patel", "email": "vivekjasubhai5@gmail.com", "is_admin": false, "is_staff": false, "is_superuser": false, "birth_date": null, "technologies": [], "bio": null, "social_links": [] };

  constructor() {
    this.username = null;
    this.full_name = null;
    this.email = null;
    this.is_admin = false;
    this.is_superuser = null;
    this.birth_date = null;
    this.bio = null;
    this.technologies = null;
    this.social_links = null;
  }
}
