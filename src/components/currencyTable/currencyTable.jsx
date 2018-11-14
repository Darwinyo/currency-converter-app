import React, { Component } from 'react';
import { Card, TextField, Button } from "@material-ui/core";
import CurrencyItem from './../currencyItem/currencyItem';
import './currencyTable.scss';

export let defaultCode = ['IDR', 'SGD', 'JPY', 'CNY'];

class CurrencyTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            currencyQuantity: 1,
            currencyCodeInput: ''
        };
        
        this.handleCodeInputChanged = this.handleCodeInputChanged.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleQuantityInputChanged = this.handleQuantityInputChanged.bind(this);
        this.handleAddCurrency = this.handleAddCurrency.bind(this);
    }

    /** Handle Delete Currency Item */
    handleDelete(code) {
        let currencies = this.state.currencies.filter(y => y.currencyCode !== code);
        this.setState({ currencies });
    }

    /** Handle Quantity Input Value Changed */
    handleQuantityInputChanged(event) {
        this.setState({ currencyQuantity: event.target.value });
    }

    /** Handle Code Input Value Changed */
    handleCodeInputChanged(e) {
        this.setState({ currencyCodeInput: (e.target.value + '').toUpperCase() });
    };


    /** Handle Add Currency */
    async handleAddCurrency(code) {
        this.setState({ currencyCodeInput: '' });
        if (code !== '' && !this.state.currencies.some(x => x.currencyCode === code)) {

            const res = await this.props.fetchCurrencyApiByCurrencyCode(code);

            if (res !== undefined) {
                const currency = {
                    currencyCode: (res.currencyCode + '').toUpperCase(),
                    currencyPriceUnit: res.currencyPriceUnit
                };

                this.setState({ currencies: [...this.state.currencies, currency] });
            }
        }
    }

    async componentDidMount() {
        let results = [];
        for (let i = 0; i < defaultCode.length; i++) {
            const element = defaultCode[i];
            const res = await this.props.fetchCurrencyApiByCurrencyCode(element);
            results.push(res);
        }
        this.setState({ currencies: results });
    }

    render() {
        return (
            <Card className="currencyTable__container">
                <Card className="currencyTable__inputContainer">
                    <span className="currencyTable__currName">USD</span>
                    <TextField
                        className="currencyTable__textField"
                        fullWidth
                        variant="outlined"
                        type="number"
                        onChange={this.handleQuantityInputChanged}
                        value={this.state.currencyQuantity}>
                    </TextField>
                </Card>

                {
                    this.state.currencies.map(cur => {
                        return (
                            <div key={cur.currencyCode} className="currencyTable__item">
                                <CurrencyItem
                                    onDelete={this.handleDelete}
                                    currency={cur}
                                    currencyQuantity={this.state.currencyQuantity}>
                                </CurrencyItem>
                            </div>
                        )
                    })
                }

                <Card className="currencyTable__footerContainer">
                    <TextField
                        fullWidth
                        className="currencyTable__textField"
                        variant="outlined"
                        type="text"
                        placeholder="CNY, IDR"
                        onChange={this.handleCodeInputChanged}
                        value={this.state.currencyCodeInput}>
                    </TextField>
                    <Button
                        onClick={() => this.handleAddCurrency(this.state.currencyCodeInput)}
                        className="currencyTable__button">Add</Button>
                </Card>
            </Card >
        );
    }
}

export default CurrencyTable;