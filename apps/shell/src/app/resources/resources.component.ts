import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './resources.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'micro-frontend-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources$: Observable<any>;
  cols = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'created', header: 'Created' },
    { key: 'actions', header: '' },
  ];
  constructor(
    private resourcesService: ResourcesService,
  ) { }

  ngOnInit(): void {
    this.resources$ = this.resourcesService.getResources();
  }
}
