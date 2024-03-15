import './dateFilter.css';
import './customCalendar.css';
// import Fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import { DateAndHour } from './DateAndHour';
import { useEffect, useReducer, useState } from 'react';
import { CalendarIcon } from '../../assets/svgs/CalendarIcon';
import { DateType } from './DateType';
import { Period } from './Period';
import { helperDate, helperResetDate } from '../../helpers/helperDate';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { filterDateAction } from '../../redux/filters';
import { ButtonCustom } from '../ButtonCustom';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'DATE_TYPE':
      return {
        ...state,
        dateType: action.payload,
        periodType: action.payload === 'period' ? 'day' : state.periodType,
      };

    case 'FROM_DATE':
      return {
        ...state,
        fromDate: action.payload,
      };

    case 'TO_DATE':
      return {
        ...state,
        toDate: action.payload,
      };

    case 'PERIOD_TYPE':
      return {
        ...state,
        periodType: action.payload,
      };

    case 'INIT':
      return {
        ...state,
        ...action.payload,
      };

    default:
      break;
  }
};

export const DateFilter = () => {
  const dispatch = useAppDispatch();

  const dateRedux = useAppSelector((s) => s.filters.date);
  console.log('👉 👉 👉  ~ file: index.tsx:56 ~ dateRedux:', dateRedux);
  const [isOpen, setIsOpen] = useState(false);
  const [date, dateDispatch] = useReducer(reducer, {
    dateType: 'from',
    fromDate: new Date(),
    toDate: new Date(),
  });

  const handleChangeDateType = (dateType: string) => {
    dateDispatch({ type: 'DATE_TYPE', payload: dateType });
  };

  const handleChangeDate = (date: Date | null, type: 'to' | 'from') => {
    dateDispatch({
      type: type === 'to' ? 'TO_DATE' : 'FROM_DATE',
      payload: date,
    });
  };

  const handlePeriodType = (periodType: string) => {
    dateDispatch({ type: 'PERIOD_TYPE', payload: periodType });
  };

  const handleSubmit = () => {
    //TODO : dispatch
    const fromDate = date.fromDate;
    const toDate = date.toDate;
    const periodType = date.periodType;
    const dateType = date.dateType;

    // date from date and time
    const newFromDate = new Date(helperDate(fromDate, 'MM/DD/YYYY'));
    // date to date and time
    const newToDate = new Date(helperDate(toDate, 'MM/DD/YYYY'));
    if (dateType !== 'period') {
      switch (periodType) {
        case 'equal':
          dispatch(
            filterDateAction({
              fromDate: newFromDate,
              toDate: newFromDate,
              dateType: dateType,
            })
          );
          break;
        default:
          dispatch(
            filterDateAction({
              fromDate: newFromDate,
              toDate: newToDate,
              dateType: dateType,
            })
          );
          break;
      }
    } else {
      let date = newFromDate;
      let nextDay = helperResetDate(newFromDate).add(1, 'day').toDate();

      switch (periodType) {
        case 'week':
          nextDay = helperResetDate(newFromDate).add(6, 'day').toDate();
          break;
        case 'month':
          date = new Date(
            new Date(newFromDate.setDate(1)).setHours(0, 0, 0, 0)
          );
          nextDay = helperResetDate(new Date(date))
            .add(1, 'month')
            .add(-1, 'day')
            .toDate();
          break;

        case 'year':
          date = new Date(
            new Date(newFromDate.setMonth(0)).setHours(0, 0, 0, 0)
          );
          nextDay = helperResetDate(new Date(date))
            .add(1, 'year')
            .add(-1, 'day')
            .toDate();
          break;

        default:
          break;
      }

      const nextDayFormat = new Date(
        helperDate(nextDay, 'MM/DD/YYYY') + ' ' + helperDate(nextDay, 'HH:mm')
      );

      dispatch(
        filterDateAction({
          fromDate: date,
          toDate: nextDayFormat,
          dateType: dateType,
          periodType,
        })
      );
    }

    setIsOpen(false);
  };

  const beforeText = date.dateType === 'before' ? 'Avant le' : 'Après le';

  useEffect(() => {
    if (dateRedux.dateType && (dateRedux.fromDate || dateRedux.toDate)) {
      dateDispatch({
        type: 'INIT',
        payload: {
          dateType: dateRedux.dateType,
          fromDate: dateRedux.fromDate,
          toDate: dateRedux.toDate,
          periodType: dateRedux.periodType,
        },
      });
    }
  }, [dateRedux]);

  return (
    <div className='date-filter'>
      <p
        onClick={() => setIsOpen((prev) => !prev)}
        className='date-filter-time'
      >
        <CalendarIcon />:{' '}
        {dateRedux.dateType &&
          (!['period', 'between'].includes(dateRedux.dateType) ||
            dateRedux.periodType === 'day') && (
            <>
              {dateRedux.dateType &&
                ['before', 'after'].includes(dateRedux.dateType) &&
                beforeText}{' '}
              <span className='date-filter-time__date'>
                {helperDate(dateRedux.fromDate, 'DD/MM/YYYY')}
              </span>
            </>
          )}
        {(dateRedux.dateType === 'between' ||
          (dateRedux.dateType === 'period' &&
            dateRedux.periodType !== 'day')) && (
          <>
            du{' '}
            <span className='date-filter-time__date'>
              {helperDate(dateRedux.fromDate, 'DD/MM/YYYY')}
            </span>{' '}
            au{' '}
            <span className='date-filter-time__date'>
              {' '}
              {helperDate(
                dateRedux.periodType === 'week'
                  ? helperResetDate(dateRedux.fromDate || new Date())
                      .add(+6, 'day')
                      .toDate()
                  : dateRedux.toDate,
                'DD/MM/YYYY'
              )}
            </span>
          </>
        )}
      </p>
      {isOpen && (
        <div className='date-filter-dropdown'>
          <DateType value={date.dateType} onChange={handleChangeDateType} />
          {date.dateType !== 'period' && (
            <>
              <DateAndHour
                dateType={date.dateType === 'before' ? 'to' : 'from'}
                date={
                  date[(date.dateType === 'before' ? 'to' : 'from') + 'Date']
                }
                onChange={handleChangeDate}
              />
              {date.dateType === 'between' && (
                <>
                  <p className='date-filter-dropdown-between'>Et</p>
                  <DateAndHour
                    dateType='to'
                    date={date.toDate}
                    onChange={handleChangeDate}
                  />
                </>
              )}
            </>
          )}

          {date.dateType === 'period' && (
            <Period
              date={date.fromDate}
              periodType={date.periodType}
              onPeriodType={handlePeriodType}
              onChange={(date) => handleChangeDate(date, 'from')}
            />
          )}
          <ButtonCustom onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
};
