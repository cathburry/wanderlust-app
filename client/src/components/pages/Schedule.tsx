import React, { FC, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Ruler from '../UI/Ruler';
import '../../styles/schedule.scss';
import { shiftList } from '../../store/actions/shift';
import getDayMonthYear from '../../helpers/common';
import CustomDatePicker from '../UI/CustomDatePicker';

const Schedule: FC = () => {
  const dispatch = useDispatch();
  const { shifts } = useSelector((state: RootStateOrAny) => state.shift);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const filterDates = () => {
    return shifts
    .filter((s: any) => getDayMonthYear(s.date) === getDayMonthYear(selectedDate));
  }

  useEffect(() => {
    setFilteredShifts(filterDates());
  }, [selectedDate]);

  useEffect(() => {
    dispatch(shiftList());
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredShifts(shifts);
  }, [shifts]);

  const handleFilterShifts = (value: any) => {
    setSelectedDate(value);
  };

  return (
    <Container className="list">
      <Row className="header">
        <Col lg={6} sm={12}>
          <h4>Activitites</h4>
        </Col>
        <Col lg={6} sm={12} style={{ textAlign: 'right' }}>
          Select Date: <CustomDatePicker
            name="date"
            currVal={selectedDate}
            onChangeVal={(val) => handleFilterShifts(val)}
            className="form-control"
            placeholder="Date"
          />
        </Col>
      </Row>
      <Card className="schedule">
        <Ruler shifts={filteredShifts} />
      </Card>
    </Container>
  );
};

export default Schedule;
