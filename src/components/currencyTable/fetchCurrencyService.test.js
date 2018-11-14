import {fetchCurrencyApiByCurrencyCode} from './fetchCurrencyService';

describe('fetchCurrencyService', () => {
    it('returns an object if status code is ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 200,
            json: () => new Promise((resolve, reject) => {
                resolve({
                    rates: { IDR: 14807.0128717266 }
                })
            }),
        }))

        expect(fetchCurrencyApiByCurrencyCode()).resolves.toEqual({ groceries: [] })
    })

    it('throws an error if status code is not ok', () => {
        window.fetch = jest.fn().mockImplementation(() => ({
            status: 500,
        }))

        expect(fetchCurrencyApiByCurrencyCode()).rejects.toEqual(Error('Error fetching'))
    })
})