import {Routes, Data} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
    }, {
        path: 'textEditor',
        loadChildren: () => import('./editor/text-editor.module')
            .then(m => m.TextEditorModule),
        data: { url: 'http://www.json-generator.com' }
    }
];
