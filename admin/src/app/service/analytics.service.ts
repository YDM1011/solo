import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewPage, AnalyticsPage } from '../service/interface';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    constructor(private http: HttpClient) {} 
        
    getOverview(id): Observable<OverviewPage> {
        return this.http.get<OverviewPage>('/api/overview/'+id)
    }

    
    
}