/* eslint-disable
  @typescript-eslint/naming-convention,
  jsx-a11y/label-has-associated-control
*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';
import moment from 'moment';
import {
  updateShiftEntry,
  newShiftEntry,
  shiftList,
} from '../../store/actions/shift';
import FormDatePicker from '../UI/FormDatePicker';
import '../../styles/form.scss';
import CustomTimePicker from '../UI/CustomTimePicker';
import { RootState } from '../../store';
import AutoCompleteMap from '../UI/AutoCompleteMap';
import Map from '../UI/Map';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  date: Yup.date().required('Date is required!'),
  address: Yup.string().required('Address is required!'),
  startTime: Yup.string().required('Start Time is required!'),
  endTime: Yup.string()
    .required('End Time is required!')
    .test('is-greater', 'end time should be greater', function (value) { // eslint-disable-line func-names
      const { startTime } = this.parent;
      return moment(value, 'HH:mm').isSameOrAfter(moment(startTime, 'HH:mm'));
    }),
});

const ShiftForm = (props: any) => {
  const {
    mode,
    row: { _id, name, date, startTime, endTime, address },
  } = props;
  const { user } = useSelector((state: RootState) => state.auth);
  const [redirect, setRedirect] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {}, [props]);

  async function createUpdateRecord(values: any) {
    let results: any;
    if (mode === 'edit') {
      results = await dispatch(updateShiftEntry(values));
    } else {
      results = await dispatch(newShiftEntry(values));
    }

    if (results.action?.payload.data.response === 'success') {
      setRedirect('success');
      dispatch(shiftList());
    } else {
      setRedirect('failed');
    }
  }

  return (
    <div className="form" id={mode}>
      {redirect ? (
        <Row>
          <Col>
            <p>
              {redirect === 'success'
                ? 'Successfully added/updated the shift'
                : 'There was an error adding/updating the shift'}
            </p>
          </Col>
        </Row>
      ) : (
        <Formik
          initialValues={{
            name,
            date,
            startTime,
            endTime,
            id: _id,
            address,
            userId: user?.id,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            createUpdateRecord(values);
          }}
          render={({ errors, touched, setFieldValue, values }: any) => (
            <Form>
              <div className="row">
                <div
                  className={`form-group col-md-12 ${
                    errors.name && touched.name && 'has-error'
                  }`}
                >
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    type="text"
                  />
                  {errors.name && touched.name && (
                    <span className="help-block">{errors.name}</span>
                  )}
                </div>
              </div>
              <Row>
                <div
                  className={`form-group col-md-12 col-sm-12 ${
                    errors.date && touched.date && 'has-error'
                  }`}
                >
                  <label htmlFor="date">Date</label>
                  <FormDatePicker
                    name="date"
                    currVal={values.date}
                    onChangeVal={setFieldValue}
                    className="form-control"
                    placeholder="Date"
                  />
                  {errors.date && touched.date && (
                    <span className="help-block">{errors.date}</span>
                  )}
                </div>
              </Row>
              <Row>
                <div
                  className={`form-group col-md-12 col-sm-12 ${
                    errors.date && touched.date && 'has-error'
                  }`}
                >
                  <label htmlFor="date">Location</label>
                  <AutoCompleteMap />
                  <Map mapHeight={200} />
                  {errors.date && touched.date && (
                    <span className="help-block">{errors.date}</span>
                  )}
                </div>
              </Row>
              <Row>
                <div
                  className={`form-group col-md-6 col-sm-12 ${
                    errors.startTime && touched.startTime && 'has-error'
                  }`}
                >
                  <label htmlFor="startTime">Start Time: </label>
                  <CustomTimePicker
                    name="startTime"
                    currVal={values.startTime}
                    onChangeVal={setFieldValue}
                    placeholder="Start Time"
                  />
                  {errors.startTime && touched.startTime && (
                    <span className="help-block">{errors.startTime}</span>
                  )}
                </div>
                <div
                  className={`form-group col-md-6 col-sm-12 ${
                    errors.endTime && touched.endTime && 'has-error'
                  }`}
                >
                  <label htmlFor="endTime">End Time: </label>
                  <CustomTimePicker
                    name="endTime"
                    currVal={values.endTime}
                    onChangeVal={setFieldValue}
                    placeholder="End Time"
                  />
                  {errors.endTime && touched.endTime && (
                    <span className="help-block">{errors.endTime}</span>
                  )}
                </div>
              </Row>
              <Row>
                <div className="col-lg-12 col-md-12 row-btn">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </Row>
            </Form>
          )}
        />
      )}
    </div>
  );
};

export default ShiftForm;
