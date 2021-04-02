import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EDITOR_ROUTES} from './text-editor.routes';
import {TextEditorComponent} from './text-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TextEditorService} from './text-editor.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [TextEditorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(EDITOR_ROUTES),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [TextEditorService],
})
export class TextEditorModule { }
