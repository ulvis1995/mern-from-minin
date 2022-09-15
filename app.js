import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import path from 'path';
import {router} from './routes/auth.routes.js';
import {routerLink} from './routes/link.routes.js';
import { routerRedirect } from './routes/redirect.routes.js';

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth', router);
app.use('/api/link', routerLink);
app.use('/t', routerRedirect);

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
  })
};

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
  } catch (error) {
    console.log('server error', error.message);
    process.exit(1);
  }
};

start();

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));