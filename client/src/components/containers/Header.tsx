import React, { FC, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../UI/Button';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {

  }, [user]);

  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={!authenticated ? "/" : "/shifts"}>Wanderlust App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {authenticated &&
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/shifts">Activities</Nav.Link>
            <Nav.Link href="/schedule">Schedule</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }
      <Navbar.Collapse className="justify-content-end">
      {!authenticated ? <div className="buttons">
          <Button text="Sign up" onClick={() => history.push('/signup')} className="is-primary" />
          <Button text="Sign in" onClick={() => history.push('/signin')} />
        </div>
        :
        <div>
          <Navbar.Text>
            Signed in as: <a href="#">{user?.firstName}</a>
          </Navbar.Text>&nbsp;&nbsp;
          <Button text="Sign out" onClick={logoutClickHandler} />
        </div>
      }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;