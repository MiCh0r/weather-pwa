import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    public get<T>(url: any): Promise<T> {
        return this.http.get<T>(url)
            .toPromise();
    }

    public post<T>(url: any, data: any): Promise<T> {
        return this.http.post<T>(url, data)
            .toPromise();
    }

    public put<T>(url: any, data: any): Promise<T> {
        return this.http.put<T>(url, data)
            .toPromise();
    }

    public patch<T>(url: any, data: any): Promise<T> {
        return this.http.patch<T>(url, data)
            .toPromise();
    }

    public delete<T>(url: any): Promise<T> {
        return this.http.delete<T>(url)
            .toPromise();
    }
}
