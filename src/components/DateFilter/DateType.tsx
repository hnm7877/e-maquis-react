import { useState } from 'react';
import { ArrowMixVerticalIcon } from '../../assets/svgs/ArrowMixVertical';
import { COLORS } from '../../assets/constants';

const LIST = [
  {
    label: 'Égal à',
    value: 'equal',
  },
  {
    label: 'Entre le',
    value: 'between',
  },
  {
    label: 'Avant le',
    value: 'before',
  },
  {
    label: 'Après le',
    value: 'after',
  },
  {
    label: 'Par période',
    value: 'period',
  },
] as const;

export const DateType = ({
  value,
  onChange,
}: {
  value: (typeof LIST)[number]['value'];
  onChange: (value: string) => void;
}) => {
  const [showList, setShowList] = useState(false);
  const itemSelected = LIST.find((item) => item.value === value);

  return (
    <div className='date-filter-types'>
      <div
        className={`date-filter-type date-filter-type__default ${
          showList ? 'date-filter-type__default-active' : ''
        }`}
        onClick={() => setShowList(!showList)}
      >
        <p>{itemSelected?.label || 'Choisir'}</p>
        <ArrowMixVerticalIcon color={COLORS.secondary} />
      </div>

      <div
        className={`date-filter-type__list${
          showList ? ' date-filter-type__list-active' : ''
        }`}
      >
        {LIST.map((item, index) => {
          return (
            <div
              key={index}
              className='date-filter-type date-filter-type__list-item'
              onClick={() => {
                onChange(item.value);
                setShowList(false);
              }}
            >
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
