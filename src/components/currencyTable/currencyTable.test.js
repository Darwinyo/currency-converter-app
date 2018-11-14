import React from 'react';
import { shallow, mount } from 'enzyme';
import CurrencyTable from './currencyTable';
import { defaultCode } from './currencyTable';

describe('Currency Table Tests', () => {
    describe('UI Tests', () => {
        it('should render input currency quantity', () => {
            const comp = shallow(<CurrencyTable />);
            expect(comp.find('.currencyTable__inputContainer')).toBeTruthy();
        })
        it('should render footer container', () => {
            const comp = shallow(<CurrencyTable />);
            expect(comp.find('.currencyTable__footerContainer')).toBeTruthy();
        })
    })
    describe('Functionality Tests', () => {
        let apiMockActions;
        beforeEach(() => {
            apiMockActions = {
                fetchCurrencyApiByCurrencyCode: jest.fn()
            }
        });

        it('should set currency state on init', async () => {
            expect(defaultCode).toEqual(['IDR', 'SGD', 'JPY', 'CNY']);

            const comp = shallow(<CurrencyTable fetchCurrencyApiByCurrencyCode={apiMockActions.fetchCurrencyApiByCurrencyCode} />, { disableLifecycleMethods: true });

            const instance = comp.instance();
            apiMockActions.fetchCurrencyApiByCurrencyCode.mockImplementationOnce(() => {
                return { rates: { IDR: 14807.0128717266 } }
            })
                .mockImplementationOnce(() => {
                    return { rates: { SGD: 14807.0128717266 } }
                })
                .mockImplementationOnce(() => {
                    return { rates: { JPY: 14807.0128717266 } }
                })
                .mockImplementationOnce(() => {
                    return { rates: { CNY: 14807.0128717266 } }
                });;

            await instance.componentDidMount();
            expect(apiMockActions.fetchCurrencyApiByCurrencyCode).toHaveBeenCalled();
            expect(comp.state('currencies').length).toEqual(defaultCode.length)
        })

        it('should run handleAddCurrency Event when Button Add Clicked', () => {

            const spy = jest.spyOn(CurrencyTable.prototype, 'handleAddCurrency');
            const comp = shallow(<CurrencyTable />);


            const input = comp.find('.currencyTable__textField');
            input.last().simulate('change', { target: { value: 'CAD' } });

            const btn = comp.find('.currencyTable__button');
            expect(btn).toHaveLength(1);
            btn.simulate('click');
            expect(spy.mock.calls.length).toEqual(1);
        })

        it('should set currencyCode to empty after handleAddCurrency clicked', () => {
            jest.spyOn(CurrencyTable.prototype, 'handleAddCurrency');
            const comp = shallow(<CurrencyTable />);

            const input = comp.find('.currencyTable__textField');
            input.last().simulate('change', { target: { value: 'CAD' } });

            const btn = comp.find('.currencyTable__button');
            btn.simulate('click');
            expect(comp.state('currencyCodeInput')).toBe('');
        })

        it('should change currencyCodeInput State when codeText Changed', () => {
            const spy = jest.spyOn(CurrencyTable.prototype, 'handleCodeInputChanged');

            const comp = shallow(<CurrencyTable />);
            const expected = 'CAD';

            const input = comp.find('.currencyTable__textField');
            input.last().simulate('change', { target: { value: expected } });

            expect(spy.mock.calls.length).toEqual(1);
            expect(comp.state('currencyCodeInput')).toBe(expected);
        })

        it('should change currencyQuantity state when quantityText changed', () => {
            const spy = jest.spyOn(CurrencyTable.prototype, 'handleQuantityInputChanged');

            const comp = shallow(<CurrencyTable />);
            const expected = 12;
            const input = comp.find('.currencyTable__textField');
            input.first().simulate('change', { target: { value: expected } });

            expect(spy.mock.calls.length).toEqual(1);
            expect(comp.state('currencyQuantity')).toBe(expected)
        })
        it('should call handleDelete func when onDelete Event Raised', async () => {
            const spy = jest.spyOn(CurrencyTable.prototype, 'handleDelete');
            expect(defaultCode).toEqual(['IDR', 'SGD', 'JPY', 'CNY']);

            const comp = shallow(<CurrencyTable fetchCurrencyApiByCurrencyCode={apiMockActions.fetchCurrencyApiByCurrencyCode} />, { disableLifecycleMethods: true });

            const instance = comp.instance();
            apiMockActions.fetchCurrencyApiByCurrencyCode.mockImplementationOnce(() => {
                return { rates: { IDR: 14807.0128717266 } }
            })
                .mockImplementationOnce(() => {
                    return { rates: { SGD: 14807.0128717266 } }
                })
                .mockImplementationOnce(() => {
                    return { rates: { JPY: 14807.0128717266 } }
                })
                .mockImplementationOnce(() => {
                    return { rates: { CNY: 14807.0128717266 } }
                });;

            await instance.componentDidMount();

            comp.find('CurrencyItem').last().prop('onDelete')();

            expect(spy.mock.calls.length).toBe(1);
        })
    })
})

