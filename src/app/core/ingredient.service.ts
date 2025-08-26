import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingredient {
  pkId?: number;
  name: string;
  have: boolean;
}

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private base = '/api/ingredients';

  constructor(private http: HttpClient) {}

  list(search = ''): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(
      `${this.base}?search=${encodeURIComponent(search)}`
    );
  }
  create(req: Partial<Ingredient>): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.base, req);
  }
  toggleHave(id: number, have: boolean): Observable<void> {
    return this.http.patch<void>(`${this.base}/${id}/have`, { have });
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
