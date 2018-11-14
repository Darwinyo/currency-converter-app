import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyItem from './currencyItem';
import { shallow } from 'enzyme';
const currProps = {
    currencyCode: 'IDR',
    currencyQuantity: 5,
    currencyPriceUnit: 200
}

describe('Currency Item Tests', () => {
    const onDeleteMockCallBack = jest.fn();
    const comp = shallow(<CurrencyItem
        currency={currProps}
        currencyQuantity={currProps.currencyQuantity}
        onDelete={onDeleteMockCallBack} />);

    describe('UI Tests', () => {
        it('should render currency code properly', () => {
            const expected = (
                <span key="currencyCode">
                    {currProps.currencyCode}
                </span>
            );

            expect(comp.contains(expected)).toBeTruthy();
        });
        it('should render currency Total properly', () => {
            const expected = (
                <span key="currencyTotal">
                    {currProps.currencyQuantity * currProps.currencyPriceUnit}
                </span>
            );

            expect(comp.contains(expected)).toBeTruthy();
        });

        it('should render currency exchange rate properly', () => {
            const expected = (
                <span key="currencyExchangeRate">
                    1 USD = {currProps.currencyCode} {currProps.currencyPriceUnit}
                </span>
            );

            expect(comp.contains(expected)).toBeTruthy();
        });
    })
    describe('Functionality Tests', () => {
        it('should emit event onDelete when button Remove clicked', () => {
            const btn = comp.find('.currencyItem__button');
            expect(btn).toHaveLength(1);
            btn.simulate('click');
            expect(onDeleteMockCallBack.mock.calls.length).toEqual(1);
        });
    })
})

