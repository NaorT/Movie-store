import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {
  @Input() movie: Movie;
  @Output() movieEdited: EventEmitter<Movie> = new EventEmitter<Movie>();
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  saveAndcloseModal() {
    this.movieEdited.emit(this.movie);
  }

  

}
