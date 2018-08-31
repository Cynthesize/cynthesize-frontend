import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Component ({
	selector: 'app-project-search',
	templateUrl: './project-search.component.html',
	styleUrls: ['./project-search.component.css']
})

export class ProjectSearchComponent implements OnInit {
	searchterm: string;
	startAt = new Subject();
	endAt = new Subject();
    
    projects;

	startobs = this.startAt.asObservable();
	endobs = this.endAt.asObservable();

	constructor(private afs: AngularFirestore) {

	}

	ngOnInit() {
		Observable.combineLatest(this.startobs,this.endobs).subscribe((value) => {
			this.firequery(value[0], value[1]).subscribe((projects) => {
				this.projects = projects;
			})
		})
	}

	search($event) {
		let q = $event.target.value;
		this.startAt.next(q);
		this.endAt.next(q+"\uf8ff");
	}

	firequery(start,end) {
		return this.afs.collection('projects', ref => 
			ref.limit(5).orderBy('project_name').startAt(start).endAt(end)
		).valueChanges();
	}
}