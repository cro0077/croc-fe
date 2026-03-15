import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'report/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'croco/**',
    renderMode: RenderMode.Client
  }
];
