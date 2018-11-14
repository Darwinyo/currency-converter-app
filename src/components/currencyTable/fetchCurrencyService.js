/** API Service */
export const fetchCurrencyApiByCurrencyCode = async (code) => {
    const url = 'https://api.exchangeratesapi.io/latest?symbols=' + (code + '').toUpperCase() + '&base=USD';

    const response = await fetch(url);
    if (response.ok) {
        const result = await response.json();

        return {
            currencyCode: code,
            currencyPriceUnit: Object.values(result.rates)[0]
        };
    } else if (response.status >= 400) {
        throw (new Error('Error fetching'))
    }
}
