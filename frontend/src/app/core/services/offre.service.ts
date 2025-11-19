import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface OffreDto {
  id?: number;
  titre?: string;
  description?: string;
  duree?: number;
  lieu?: string;
  domaine?: string;
  competences?: string;
  competencesRequises?: string;
  avantages?: string;
  dateDebut?: string;
  dateFin?: string;
  dateLimiteCandidature?: string;
  estActive?: boolean;
  entrepriseId?: number;
  fileUrl?: string;
  remuneration?: number;
  nombrePlaces?: number;
  contactNom?: string;
  contactEmail?: string;
  statut?: string;
}

@Injectable({ providedIn: 'root' })
export class OffreService {
  private base = `${environment.apiUrl}/offres`;

  constructor(private http: HttpClient) {}

  create(offre: OffreDto, file?: File) {
    const form = new FormData();
    // Envoyer l'objet offre comme JSON dans la partie 'offre'
    form.append('offre', new Blob([JSON.stringify(offre)], { type: 'application/json' }));
    if (file) form.append('file', file);
    return this.http.post<OffreDto>(`${this.base}`, form);
  }

  findAll() {
    return this.http.get<OffreDto[]>(`${this.base}/all`);
  }

  findById(id: number) {
    return this.http.get<OffreDto>(`${this.base}/${id}`);
  }

  update(id: number, update: Partial<OffreDto>, file?: File) {
    const form = new FormData();
    Object.entries(update).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, String(v));
    });
    if (file) form.append('file', file);
    return this.http.put<OffreDto>(`${this.base}/${id}`, form);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
