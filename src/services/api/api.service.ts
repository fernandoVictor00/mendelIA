import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getAnalysisResult(params: { sequence?: string; url?: string }) {
    try {
      const { data } = await axios.post('http://localhost:5000/', params);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
