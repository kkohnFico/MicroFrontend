import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class TextEditorService {
    private baseUrl:string;
    constructor(private http: HttpClient) {}

    /**
     * Could also change id to be full url
     * @param id
     */
    getAsset(id: string):Observable<any> {
        const url = `${this.baseUrl}/api/json/get/${id}?indent=2`
        return this.http.get(url, {responseType: 'text'}).pipe(tap(csv => console.log({csv})));
    }

    setBaseUrl(url:string){
        this.baseUrl = url;
    }
}
