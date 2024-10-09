import { createApp } from 'vue';
import CoreModule from './core';
import CallModule from './call';
import ReportingModule from './reporting';
import AIModule from './ai';
// Import other modules as needed

const modules = [
  CoreModule,
  CallModule,
  ReportingModule,
  AIModule,
  // Add other modules
];

export function registerModules(app) {
  modules.forEach(module => {
    // Register routes
    if (module.routes) {
      module.routes.forEach(route => app.router.addRoute(route));
    }

    // Register store modules
    if (module.store) {
      app.store.registerModule(module.name, module.store);
    }

    // Register components
    if (module.components) {
      Object.entries(module.components).forEach(([name, component]) => {
        app.component(name, component);
      });
    }

    // Initialize module
    if (module.init) {
      module.init(app);
    }
  });
}

export function initializeApp() {
  const app = createApp(/* root component */);
  registerModules(app);
  return app;
}