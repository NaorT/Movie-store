import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../../services/movie.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {
  @Input() movie: Movie;
  @Output() movieEdited: EventEmitter<Movie> = new EventEmitter<Movie>();
  isTitleAvaliable: boolean;
  isDateValid: boolean
  titleHintMsg: string;
  dateHintMsg: string;
  
  constructor(private dateService: DateService,
               private movieService: MovieService,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.isTitleAvaliable = true;
    this.isDateValid = true;
  }

  saveAndcloseModal() {
    this.movieEdited.emit(this.movie);
  }

  validateMovieTitle(movie: Movie) {
    this.isTitleAvaliable = this.movieService.validateMovie(movie);
    if (this.isTitleAvaliable) {
      this.titleHintMsg = "title is required";
    } else {
      this.titleHintMsg = "title is already taken";
    }
  }

  validateMovieDate(movie: Movie) {
      this.isDateValid = this.dateService.validateDate(new Date(movie.year));
      if (this.isDateValid) {
        this.dateHintMsg = "released date is required";
      } else {
        this.dateHintMsg = "released date not valid";
      }
  }

  dismissModal() {
    this.modalService.dismissAll();
  }

}
