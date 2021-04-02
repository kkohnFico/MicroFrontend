import {Routes} from '@angular/router';
import {TextEditorComponent} from './text-editor.component';

export const EDITOR_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: TextEditorComponent,
            }
        ]
    }
];
