import DatePicker, { registerLocale } from 'react-datepicker';
import { helperDate } from '../../helpers/helperDate';
import Fr from 'date-fns/locale/fr';

registerLocale('fr', Fr);

export const DateAndHour = ({
  dateType,
  date,
  onChange,
}: {
  dateType?: 'from' | 'to';
  date: Date | null;
  onChange: (date: Date | null, type: 'from' | 'to') => void;
}) => {
  const handleChangeDate = (date: Date | null) => {
    // TODO
    if (dateType) {
      onChange(date, dateType);
    }
  };

  return (
    <div className='date-filter-dates'>
      <div>
        <DatePicker
          selected={date}
          onChange={(date) => handleChangeDate(date)}
          locale={'fr'}
          customInput={
            <div className='date-filter-dates__input'>
              <p>{helperDate(date, 'DD/MM/YYYY')}</p>
            </div>
          }
        />
      </div>
    </div>
  );
};
