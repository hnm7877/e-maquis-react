import { Filters } from './Filters';
import './bilan.css';

export const Bilan = () => {
  return (
    <div className='bilan'>
      <Filters />
      <div className='bilan-content'></div>
    </div>
  );
};
