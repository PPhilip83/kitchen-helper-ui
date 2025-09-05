import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { RecipeSuggestion } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class FinderService {
  private readonly base = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly url = `${this.base}/recipes/suggestions`;

  constructor(private http: HttpClient) {}

  getSuggestions(maxMissing: number): Observable<RecipeSuggestion[]> {
    const u = `${this.url}?maxMissing=${maxMissing}`;
    return this.http
      .get<RecipeSuggestion[] | null>(u)
      .pipe(map((r) => r ?? []));
  }
}
