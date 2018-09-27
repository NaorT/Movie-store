import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models';
import { MovieService } from '../../services/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';;

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {
  @Input() movie: Movie;
  curentEditedMovie: Movie;

  editMode: boolean;

  constructor(private movieService: MovieService, private modalService: NgbModal) { }

  ngOnInit() {
    this.curentEditedMovie = JSON.parse(JSON.stringify(this.movie));
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  editMovie(movie: Movie) {
    if (this.movieService.validateMovie(movie)) {
      this.movie.title = movie.title;
      this.movie.year = movie.year
      this.movie.runtime = movie.runtime
      this.movie.genre = movie.genre
      this.movie.director = movie.director
      this.movie.description = movie.description
      this.toggleEditMode();
    } else {
      // not valide
    }
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movie);
    this.modalService.dismissAll();
  }

}
