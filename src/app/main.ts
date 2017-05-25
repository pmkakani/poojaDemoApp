import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import 'zone.js';
import 'reflect-metadata';

platformBrowserDynamic().bootstrapModule(AppModule);
