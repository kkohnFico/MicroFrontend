import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  getResources() {
    return of([{
      id: 'bUETOlmAqG',
      name: 'dogs.json',
      type: 'text',
      editors: '',
      updated: '2019-02-03 10:08:02',
    }, {
      id: 'cgdQJWtRXC',
      name: 'cats.json',
      type: '',
      editors: '',
      updated: '2019-02-03 10:08:02',
    }]);
  }

  editorLookup(): Observable<any[]> {
    return of([
      {
        url: 'http://www.json-generator.com',
        type: 'mfe',
        parent: {},
        dependencies: {},
        mfeConfig: {
          // For Loading
          remoteEntry: 'http://localhost:5000/remoteEntry.js',
          remoteName: 'mfe',
          exposedModule: './Module',
          // For Routing
          displayName: 'Text Editor',
          routePath: 'textEditor',
          ngModuleName: 'TextEditorModule',
        }
      }
    ]);
  }
}
