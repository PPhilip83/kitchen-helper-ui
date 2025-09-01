import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Recipe {
  pkId: number;
  name: string;
  instructions: string;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[] | null>(`${this.baseUrl}/recipes`).pipe(
      map((res) => res ?? []),
      catchError((err) => throwError(() => err))
    );
  }
}
