import React, { Component } from 'react';
import './currencyItem.scss';
import { Button, Card } from '@material-ui/core';

class CurrencyItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card className="currencyItem">
                <div className="currencyItem__detail-container">
                    <div className="currencyItem__title">
                        <span key="currencyCode">
                            {this.props.currency.currencyCode}
                        </span>
                        <span key="currencyTotal">
                            {this.props.currencyQuantity * this.props.currency.currencyPriceUnit}
                        </span>
                    </div>
                    <div className="currencyItem__exchangeRate">
                        <span key="currencyExchangeRate">
                            1 USD = {this.props.currency.currencyCode} {this.props.currency.currencyPriceUnit}
                        </span>
                    </div>
                </div>

                <Button className="currencyItem__button"
                    onClick={() => this.props.onDelete(this.props.currency.currencyCode)}>
                    Remove
                </Button>
            </Card>
        );
    }
}

export default CurrencyItem;