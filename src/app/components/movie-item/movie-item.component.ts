import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../models';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
@Input() movie: Movie;
@Output() movieEdited: EventEmitter<Movie> = new EventEmitter<Movie>();
  constructor() { }

  ngOnInit() {
  }

  editMovie() {
    this.movieEdited.emit(this.movie);
  }

}
