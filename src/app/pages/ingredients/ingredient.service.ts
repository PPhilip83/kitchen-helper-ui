import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ingredient } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly ingredientsUrl = `${this.baseUrl}/ingredients`;

  constructor(private http: HttpClient) {
    console.log('ENV apiBaseUrl =', environment.apiBaseUrl);
    console.log('ingredientsUrl =', this.ingredientsUrl);
  }

  list(query?: string) {
    const url = query?.trim()
      ? `${this.ingredientsUrl}?query=${encodeURIComponent(query.trim())}`
      : this.ingredientsUrl;
    console.log('GET →', url);
    return this.http.get<Ingredient[] | null>(url).pipe(map((r) => r ?? []));
  }

  create(request: { name: string; have: boolean }) {
    console.log('POST →', this.ingredientsUrl);
    return this.http.post<Ingredient>(this.ingredientsUrl, request);
  }

  toggleHave(pkId: number, nextValue: boolean): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/${pkId}/have?value=${nextValue}`;
    return this.http.patch<Ingredient>(url, null);
  }

  remove(pkId: number): Observable<void> {
    const url = `${this.ingredientsUrl}/${pkId}`;
    return this.http.delete<void>(url);
  }
}
