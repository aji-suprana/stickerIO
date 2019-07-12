import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.scss';
import Home from './components/home';
import StickerPage from './components/StickerPage';
import 'bootstrap/dist/css/bootstrap.css';

import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Button
} from 'reactstrap';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar dark expand="md">
            <NavbarBrand href="/">Telegram Stickers</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/" active>Home</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>
  
        <Container>
          <Router>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/stickers/:stickerName" component={StickerPage}/>
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}
