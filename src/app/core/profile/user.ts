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
  idea_list: Array<Object>;
  project_list: Array<Object>;

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
    this.idea_list = null;
    this.project_list = null;
  }
}
