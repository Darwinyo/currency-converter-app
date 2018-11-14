import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyTable from './components/currencyTable/currencyTable';
import Button from '@material-ui/core/Button';
import { fetchCurrencyApiByCurrencyCode } from './components/currencyTable/fetchCurrencyService';

class App extends Component {
  render() {
    return (
      <CurrencyTable fetchCurrencyApiByCurrencyCode={fetchCurrencyApiByCurrencyCode}></CurrencyTable>
    );
  }
}

export default App;
