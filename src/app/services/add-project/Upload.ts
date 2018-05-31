export class Upload {
    owner_id: String;
    project_id: String;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File, project_id: String) {
        this.file = file;
        this.project_id = project_id;
        this.progress = 0;
    }
}
