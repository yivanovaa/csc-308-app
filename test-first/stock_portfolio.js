class StockPortfolio {
    constructor() {
        this.stocks = {};
    }

    addStock(symbol, quantity) {  
        if (typeof symbol !== 'string' || symbol.trim() === '') {
        throw new Error("Invalid stock symbol");
        }
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error("Quantity must be a positive number");
        }

        if (this.stocks[symbol]) {
            this.stocks[symbol] += quantity;
        } else {
            this.stocks[symbol] = quantity;
        }
    }

    isEmpty() {
        return Object.keys(this.stocks).length === 0;
    }

    sellStock(symbol, quantity) {
        if (typeof symbol !== 'string' || symbol.trim() === '') {
            throw new Error("Invalid stock symbol");
        }
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error("Quantity must be a positive number");
        }

        if (!this.stocks[symbol]) {
            throw new Error("Stock doesn't exist");
        }else if (this.stocks[symbol] < quantity) {
            throw new Error("Not possible to sell this number of shares.");
        }else {
            this.stocks[symbol] -= quantity;
            if (this.stocks[symbol] === 0) {
                delete this.stocks[symbol];
            }
        }
    }

    countUnique() {
        return Object.keys(this.stocks).length;
    }
}

module.exports = StockPortfolio;