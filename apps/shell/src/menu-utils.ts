import { loadRemoteModule } from './federation-utils';
import { Routes } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import {ResourcesComponent} from './app/resources/resources.component';

export function addChildrenRoutes(options: any[]): Routes {
  const lazyRoutes: Routes = options.map(o => ({
    path: o.mfeConfig.routePath,
    loadChildren: () => loadRemoteModule(o.mfeConfig).then(m => m[o.mfeConfig.ngModuleName]),
    data: { url: o.url }
  }));

  APP_ROUTES.find(route => route.component === ResourcesComponent).children = lazyRoutes;
  return APP_ROUTES;
}
