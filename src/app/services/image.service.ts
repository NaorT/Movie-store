import { Injectable } from '@angular/core';
import * as M from '../models';
const baseUrl = "https://image.tmdb.org/t/p/"

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImage(tmdbSize: M.imgSize, imageId: string) {
    return `${baseUrl}${tmdbSize}/${imageId}`;
  }
}
