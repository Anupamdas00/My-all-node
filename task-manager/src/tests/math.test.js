const { fahrenheitToCelsius, celsiusToFahrenheit } = require('../math');

test('Should convert fahrenheit to celcious', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Should convert cen to fah', () => {
    const fah = celsiusToFahrenheit(0);
    expect(fah).toBe(30)
})
