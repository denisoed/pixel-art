import { boot } from 'quasar/wrappers';
import Tetikus from '@namchee/tetikus';
import '@namchee/tetikus/dist/tetikus.css';

export default boot(({ app }) => {
  app.use(Tetikus);
});
