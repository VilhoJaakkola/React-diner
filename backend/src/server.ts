import app from './app';
import {config} from './config/config';

// eslint-disable-next-line no-undef
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, (): void => {
    // eslint-disable-next-line no-undef
  console.log(`Server running on port ${config.APP_PORT}`);
});