import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';
import { MovieModalComponent } from './components/movie-modal/movie-modal.component';
import { MovieEditorComponent } from './components/movie-editor/movie-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    MovieModalComponent,
    MovieEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
