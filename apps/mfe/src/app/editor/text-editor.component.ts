import {Component, OnInit} from '@angular/core';
import {TextEditorService} from './text-editor.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'micro-frontend-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  assetId:string;
  asset:string;

  constructor(
      private route: ActivatedRoute,
      private editorService: TextEditorService,
  ) {}

  ngOnInit(): void {
    /*
    * Grabbing the id and config off the router to get the asset
    * based on that id.
    * */
    combineLatest([this.route.data, this.route.params])
        .subscribe(([data,params]) => {
            console.log("token", data);
          this.editorService.setBaseUrl(data.url);
          this.assetId = params.id;
          this.editorService.getAsset(params.id).subscribe(data => {
            this.asset = data;
          });
        })
  }
}
