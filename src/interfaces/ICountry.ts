export interface ICountry {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  
  capital: string[];
  region: string;
  
  translations: Record<string, Record<string, string>>; // Um mapa de linguagens para suas respectivas traduções
  
  latlng: number[]; // Latitude e longitude
}