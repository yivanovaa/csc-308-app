const StockPortfolio = require('./stock_portfolio.js');

beforeEach(() => {
    myStock = new StockPortfolio();
});

afterEach(() => {
    myStock = null;
});

test('Testing create stock', () => {
    expect(myStock).toBeDefined();
});

test('Testing initial stocks is empty', () => {
    expect(Object.keys(myStock.stocks).length).toBe(0);
});

test('Testing is empty - true', () => {
    expect(myStock.isEmpty()).toBe(true);
});

test('Testing is empty - false', () => {
    myStock.addStock("*", 10);
    expect(myStock.isEmpty()).toBe(false);
});

test('Testing add stock - new stock', () => {
    myStock.addStock("#", 10);
    expect(myStock.stocks["#"]).toBe(10);
});

test('Testing add stock - already exists', () => {
    myStock.addStock("$", 10);
    myStock.addStock("$", 15);
    expect(myStock.stocks["$"]).toBe(25);
});

test('Testing add stock - invalid quantity (zero)', () => {
    expect(() => myStock.addStock("AWA", 0)).toThrow("Quantity must be a positive number");
});

test('Testing add stock - invalid quantity (negative)', () => {
    expect(() => myStock.addStock("AWA", -5)).toThrow("Quantity must be a positive number");
});

test('Testing add stock - invalid symbol', () => {
    expect(() => myStock.addStock("", 10)).toThrow("Invalid stock symbol");
});

test('Testing sell stock success', () => {
    myStock.addStock("%", 10);
    myStock.sellStock("%", 5);
    expect(myStock.stocks["%"]).toBe(5);
});

test('Testing sell stock - not enough stocks to sell', () => {
    myStock.addStock("^", 10);
    expect(() =>  myStock.sellStock("^", 15)).toThrow("Not possible to sell this number of shares.");
});

test('Testing sell stock - stock does not exist', () => {
    expect(() =>  myStock.sellStock("&", 15)).toThrow("Stock doesn't exist");
});

test('Testing sell stock - invalid quantity (zero)', () => {
    myStock.addStock("GMR", 10);
    expect(() => myStock.sellStock("GMR", 0)).toThrow("Quantity must be a positive number");
})

test('Testing count unique stocks', () => {
    myStock.addStock("*", 10);
    myStock.addStock("$", 15);
    myStock.addStock("%", 20);
    expect(myStock.countUnique()).toBe(3);
});

test('Testing count unique stocks after one stock sold out', () => {
    myStock.addStock("*", 10);
    myStock.addStock("$", 15);  
    expect(myStock.countUnique()).toBe(2);
    myStock.sellStock("$", 15);  
    expect(myStock.countUnique()).toBe(1);
    expect(myStock.stocks["$"]).toBeUndefined();
});

/*
Reflection:
I was able to follow the TDD practice for the most part of the assignment, 
but I accidentally solved some of the steps earlier while refactoring. 
For example, while writing tests for isEmpty, I realized I also needed 
a way to add stocks so I could test the case where there are stocks. 
Another example was when I thought about edge cases for selling stocks — 
I had written a test to attempt selling more stocks than owned, 
and in order for this test to pass, I implemented a later step earlier. 
Overall, I think TDD is a good way to approach a problem, but if it’s 
for an entire class (like testing all StockPortfolio methods and edge cases), 
it’s hard to strictly go one function at a time since some functions depend on others.
*/