import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie, imgSize } from '../../models';
import { ImageService } from '../../services/image.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  @Output() movieEdited: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() trailerClicked: EventEmitter<Movie> = new EventEmitter<Movie>();
  movieImgSrc: string;
  
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.movieImgSrc = this.imageService.getImage(imgSize.xsm, this.movie.photo);
  }

  editMovie() {
    this.movieEdited.emit(this.movie);
  }

  startTrailer() {
    this.trailerClicked.emit(this.movie);

  }

}
