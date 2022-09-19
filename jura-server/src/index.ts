import 'reflect-metadata';
import App from './app';

const app = new App();
app.run().catch(() => {
  throw new Error('App failed to start');
});
