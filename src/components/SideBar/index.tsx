import { useState } from 'react';
import { SIDEBAR_DATA } from '../../data/sidebar';
import './sidebar.css';

export const SideBar = () => {
  const [indexActive, setIndexActive] = useState<null | number>(null);

  const handleSelectItem = (index: number) => {
    setIndexActive((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <nav className='sidebar'>
      <div className='logo d-flex justify-content-between'>
        <a className='large_logo' href='/dashboard'>
          <img src='img/paresseux_sous_officiel.png' alt='' />
        </a>
        <div className='sidebar_close_icon d-lg-none'>
          <i className='ti-close'></i>
        </div>
      </div>
      <ul id='sidebar_menu'>
        {SIDEBAR_DATA.map((item, kIndex) => {
          return (
            <li className='' key={kIndex}>
              <a
                className='has-arrow'
                href='#'
                aria-expanded='false'
                onClick={() => {
                  handleSelectItem(kIndex);
                }}
              >
                <div className='nav_icon_small'>
                  <img src={item.img} alt='' />
                </div>
                <div className='nav_title'>
                  <span>{item.title}</span>
                </div>
              </a>
              <div
                className={`list-group sub-menu ${
                  indexActive === kIndex ? 'open' : ''
                }`}
              >
                <ul className='list-group'>
                  {item.subMenu?.map((subItem, index) => {
                    return (
                      <li className='list-group-item' key={index}>
                        <a href={subItem.link}>
                          {subItem.title}{' '}
                          {!!subItem.beta && (
                            <span className='badge badge-info'>Bêta</span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
