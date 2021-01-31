/* eslint-disable
  prefer-template,
  arrow-body-style
*/
import React, { FC, useEffect } from 'react';
import { getDayMonthYear } from '../../helpers/common';
import '../../styles/ruler.scss';

interface PropsType {
  shifts: any,
}
const halfHours = ["00", "30"];
  
const Ruler: FC<PropsType> = ({ shifts } : PropsType) => {
  useEffect(() => {}, [shifts]);

  const getDateItems = () => {
    const times = [];
    for(let i = 0; i < 24; i += 1){ 
      for(let j = 0; j < 2; j += 1){
        if( i > 0) {
          times.push(`${i}:${halfHours[j]}`);
        } else {
          times.push(`99:${halfHours[j]}`);
        }
      }
    };
    return times;
  }

  const renderSchedules = () => {
    return getDateItems().map((hour) => {
      return (
        <div className={`time start-${hour.replace(/:/g,'')}`}>
          {hour.replace('99', '00')}
        </div>
      );
    })
  }

  const getSlot = (hour: string) => {
    if(('0' + hour).slice(-5) >= '12:00') {
      return 'afternoon';
    }

    return 'morning';
  }

  const parseTime = (time: string) => {
    console.log(time);
    let hours = parseInt(time.split(':')[0], 10);
    let minutes = parseInt(time.split(':')[1], 10);

    if(minutes > 15  && minutes < 45) {
      minutes = 30;
    } else {
      if (minutes > 45) {
        hours += 1;
      }
      minutes = 0;
    }

    if(hours > 23 || hours < 1) {
      hours = 99;
    }

    const newTime = `${ hours }${('0' + minutes).slice(-2)}`;

    return newTime;
  }

  const renderShifts = () => {
    return shifts.map((sh: any) => {
      const shiftSlot = getSlot(sh.startTime);
      return (
        <div
          id={sh.id}
          className={`event stage-${shiftSlot} start-${parseTime(sh.startTime)} end-${parseTime(sh.endTime)} length-4`}
        >
          { sh.name }
          <span>{ getDayMonthYear(sh.date) }</span>
          <span>{ `${sh.startTime} - ${sh.endTime}` }</span>
        </div>
      )
    });
  }

  return (
    <div className="scheduleContainer" key="schedule">
      { renderSchedules() }
      { renderShifts() }
    </div>
  )
};

export default Ruler;
