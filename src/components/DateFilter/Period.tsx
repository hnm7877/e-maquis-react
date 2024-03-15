import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PrevIcon } from '../../assets/svgs/PrevIcon';
import { NextIcon } from '../../assets/svgs/NextIcon';
import { helperDate, helperResetDate } from '../../helpers/helperDate';

const LabelsList = [
  { label: 'Jour', value: 'day' },
  { label: 'Semaine', value: 'week' },
  { label: 'Mois', value: 'month' },
  { label: 'Année', value: 'year' },
] as const;

export const Period = ({
  date,
  onChange,
  periodType,
  onPeriodType,
}: {
  date: Date | null;
  onChange: (date: Date | null) => void;
  onPeriodType: (periodType: string) => void;
  periodType: (typeof LabelsList)[number]['value'];
}) => {
  const labelSelected = LabelsList.find(
    (item) => item.value === periodType
  )?.value;

  const handleSelectLabel = (value: string) => {
    onPeriodType(value);
  };

  const calendarViewType =
    (labelSelected && ['day', 'week'].includes(labelSelected)) || !labelSelected
      ? 'month'
      : labelSelected === 'year'
      ? 'decade'
      : 'year';

  return (
    <div className='date-filter-period'>
      <div className='date-period-labels'>
        {LabelsList.map((item, index) => {
          return (
            <div
              key={index}
              className={`date-period-label ${
                labelSelected === item.value ? 'date-period-label--active' : ''
              }`}
              onClick={() => handleSelectLabel(item.value)}
            >
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className='date-period-calendars'>
        <Calendar
          prevLabel={<PrevIcon />}
          nextLabel={<NextIcon />}
          formatMonth={(locale, date) =>
            helperDate(date || new Date(), 'MMM').slice(0, 3)
          }
          formatShortWeekday={(locale, date) => helperDate(date, 'dd')}
          view={calendarViewType}
          onClickDecade={(date) => onChange(date)}
          onClickMonth={(date) => onChange(date)}
          onClickYear={(date) => onChange(date)}
          onClickDay={(date) => onChange(date)}
          value={
            labelSelected === 'week'
              ? [
                  date,
                  helperResetDate(date || new Date())
                    .add(+6, 'day')
                    .toDate(),
                ]
              : date
          }
        />
      </div>
    </div>
  );
};
