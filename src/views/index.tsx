import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/SideBar';

export const App = () => {
  return (
    <div className='home'>
      <SideBar />
      <div className='home__right'>
        <Outlet />
      </div>
    </div>
  );
};
