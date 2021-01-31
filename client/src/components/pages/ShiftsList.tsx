/* eslint-disable
  react/jsx-props-no-spreading,
  no-underscore-dangle
*/
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShiftEntry, shiftList } from '../../store/actions/shift';
import CustomButton from '../UI/CustomButton';
import CustomModal from '../UI/CustomModal';
import ShiftForm from '../containers/ShiftForm';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../styles/list.scss';
import { RootState } from '../../store';
import Input from '../UI/Input';
import { getMonthDayYear } from '../../helpers/common';

const newShift: any = {
  id: null,
  name: '',
  date: '',
  startTime: '00:00',
  endTime: '23:59',
  location: '',
};

const ShiftsList = () => {
  const { shifts } = useSelector((state: RootState) => state.shift);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isOpen, toggleOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [currData, setCurrData] = useState({});
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(filteredShifts);
  }, [currData, mode, user, filteredShifts]);
  
  const filterShifts = () => {
    return shifts
    .filter((s: any) => s.name.toLowerCase().includes(nameSearch.toLowerCase()));
  }

  useEffect(() => {
    setFilteredShifts(filterShifts());
  }, [nameSearch]);

  const handleSearchShifts = (event: any) => {
    const { value } = event.target;
    setNameSearch(value);
  };

  useEffect(() => {
    setFilteredShifts(filterShifts());
  }, [shifts]);

  const toggleModal = () => {
    toggleOpen(!isOpen);
  };

  async function getAList() {
    await dispatch(shiftList());
  }

  useEffect(() => {
    getAList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function confirmDelete(e: any) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      // eslint-disable-line no-alert
      const results: any = await dispatch(deleteShiftEntry(e.target.id));

      if (results.action.payload.data.response === 'success') {
        getAList();
      }
    }
  }

  const triggerAction = (action: any, data: any) => {
    toggleModal();
    setMode(action);
    setCurrData({ ...{}, ...data });
  };

  const displayAList = () => {
    if (Object.keys(shifts).length > 0) {
      const row = filteredShifts.map((item: any) => (
        <Tr key={item.name}>
          <Td>{item.name}</Td>
          <Td>{getMonthDayYear(item.date)}</Td>
          <Td>{item.startTime}</Td>
          <Td>{item.endTime}</Td>
          <Td>
            <CustomButton
              id={item._id}
              label="Edit"
              variant="warning"
              size="sm"
              onClick={() => triggerAction('edit', item)}
            />
            &nbsp;
            <CustomButton
              id={item._id}
              label="Delete"
              variant="danger"
              size="sm"
              onClick={confirmDelete}
            />
          </Td>
        </Tr>
      ));

      return (
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">Name</Th>
              <Th scope="col">Date</Th>
              <Th scope="col">Start Time</Th>
              <Th scope="col">End Time</Th>
              <Th scope="col">Action</Th>
            </Tr>
          </Thead>
          <Tbody>{row}</Tbody>
        </Table>
      );
    }
    return (
      <p>
        <em>There are no activities at the moment.</em>
      </p>
    );
  };

  return (
    <Container className="list">
      <Row className="justify-content-md-center">
        <Col xs md="12" lg="12">
          <Row className="header">
            <Col lg={6} sm={12}>
              <h4>Activities</h4>
            </Col>
            <Col className="add-button" lg={6} sm={12}>
              <CustomButton
                label="Add Activity"
                variant="info"
                onClick={() => triggerAction('add', newShift)}
              />
              <CustomModal
                handleClose={toggleModal}
                show={isOpen}
                size="lg"
                modalHeading={`${mode === 'add' ? 'Add New' : 'Edit'} Activity`}
              >
                <ShiftForm
                  row={currData}
                  mode={mode}
                  closeModal={toggleModal}
                />
              </CustomModal>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} className="search-bar">
              <Input 
                type="text"
                name="search"
                value={nameSearch}
                onChange={(e) => handleSearchShifts(e)}
                placeholder="Search Activity Name..."
              />
            </Col>
          </Row>
          {displayAList()}
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftsList;
