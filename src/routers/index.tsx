import { createBrowserRouter } from 'react-router-dom';
import { Bilan } from '../views/bilan';
import { App } from '../views';

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'bilan',
        element: <Bilan />,
      },
    ],
  },
]);
