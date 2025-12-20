export const currencyConfig = {
    INR: { locale: 'en-IN', currency: 'INR', symbol: '₹', rate: 1, flag: '🇮🇳' },
    PKR: { locale: 'en-PK', currency: 'PKR', symbol: 'Rs', rate: 3.32, flag: '🇵🇰' },
    USD: { locale: 'en-US', currency: 'USD', symbol: '$', rate: 0.012, flag: '🇺🇸' },
    GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£', rate: 0.0095, flag: '🇬🇧' },
    CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥', rate: 0.087, flag: '🇨🇳' },
    AUD: { locale: 'en-AU', currency: 'AUD', symbol: 'A$', rate: 0.018, flag: '🇦🇺' },
    JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥', rate: 1.82, flag: '🇯🇵' }
};

const displayCurrency = (num, currencyCode = 'INR') => {
    const config = currencyConfig[currencyCode] || currencyConfig.INR;
    
    // Convert the number based on the rate
    const convertedNum = num * config.rate;

    const formatter = new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 2
    });

    return formatter.format(convertedNum);
};

export default displayCurrency;