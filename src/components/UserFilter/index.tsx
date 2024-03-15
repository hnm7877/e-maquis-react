import { useEffect, useState } from 'react';
import { User } from './User';
import './userFilter.css';
import { TUser, filterUsersAction } from '../../redux/filters';
import { ButtonCustom } from '../ButtonCustom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const users: TUser[] = [
  {
    nom: 'Aniki',
    prenom: 'K.O',
    email: 'aniki@gmail.com',
    role: 'admin',
    date: '12/12/2020',
  },
  {
    nom: 'Hermano',
    prenom: 'K.O',
    email: 'hermano@gmail.com',
    role: 'admin',
    date: '12/12/2020',
  },

  {
    nom: 'Ouattara',
    prenom: 'Mory',
    email: 'aniki@gmail.com',
    role: 'admin',
    date: '12/12/2020',
  },
];

export const UserFilter = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [usersSelected, setUsersSelected] = useState<TUser[]>([]);

  const usersRedux = useAppSelector((s) => s.filters.users);

  const handleClick = (user: TUser) => {
    setUsersSelected((prevUsers) => {
      if (prevUsers.find((u) => u.nom === user.nom)) {
        return prevUsers.filter((u) => u.nom !== user.nom);
      } else {
        return [...prevUsers, user];
      }
    });
  };

  const handleSubmit = () => {
    setIsOpen(false);
    dispatch(filterUsersAction(usersSelected));
  };

  useEffect(() => {
    if (usersRedux.length) {
      setUsersSelected(usersRedux);
    }
  }, [usersRedux]);

  return (
    <div className='users-filter'>
      <div
        className='users-filter--selected'
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          Employés:{' '}
          <span>{usersRedux?.map((user) => user.nom).join(' - ')}</span>
        </p>
      </div>
      {isOpen && (
        <div className='users-filter-list'>
          {users.map((user) => {
            const checked = usersSelected.find((u) => u.nom === user.nom);
            return (
              <User
                name={`${user?.nom} ${user?.prenom}(${user?.role})`}
                checked={!!checked}
                setChecked={() => {
                  handleClick(user);
                }}
                handleClick={() => {
                  handleClick(user);
                }}
              />
            );
          })}

          <ButtonCustom onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
};
