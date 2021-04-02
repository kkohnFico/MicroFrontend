import {Component, OnInit} from '@angular/core';
import {ResourcesService} from './resources/resources.service';
import {addChildrenRoutes} from '../menu-utils';
import {Router} from '@angular/router';

@Component({
  selector: 'micro-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shell';
  constructor(private lookupService: ResourcesService, private router: Router) {
  }
  ngOnInit(): void {
    /*
    * call editor lookup service
    * call config service then build routes
    * */
    this.lookupService.editorLookup().subscribe(mfes => {
      const routes = addChildrenRoutes(mfes);
      this.router.resetConfig(routes);
    });
  }
}
