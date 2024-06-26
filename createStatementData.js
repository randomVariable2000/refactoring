class PerformanceCalculator {
    constructor(perf, play) {
        this.perf = perf
        this.play = play
    }

    get amount() {
        let result = 0
        switch (this.play.type) {
            case 'tragedy':
                result = 40000;
                if (this.perf.audience > 30) {
                    result += 1000 * (this.perf.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (this.perf.audience > 20) {
                    result += 10000 + 500 * (this.perf.audience - 20);
                }
                result += 300 * this.perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${this.play.type}`);
        }
        return result
    }

    get volumeCredits() {
        let result = 0
        result += Math.max(this.perf.audience - 30, 0);
        return result
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.perf.audience > 20) {
            result += 10000 + 500 * (this.perf.audience - 20);
        }
        result += 300 * this.perf.audience;
        return result
    }

    get volumeCredits() {
        let result = super.volumeCredits
        result += Math.floor(this.perf.audience / 5);
        return result
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.perf.audience > 30) {
            result += 1000 * (this.perf.audience - 30);
        }
        return result
    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`unknown type: ${aPlay.type}`);
    }
}

export const createStatementData = (invoice, plays) => {
    const statementData = {}
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)

    return statementData

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
        const result = Object.assign({}, aPerformance)
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result
    }


    function totalVolumeCredits(data) {
        return data.performances.reduce((pre, cur) => {
            return cur.volumeCredits + pre
        }, 0)
    }

    function totalAmount(data) {
        return data.performances.reduce((pre, cur) => {
            return cur.amount + pre
        }, 0)
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }

    function amountFor(aPerformance) {
        let result = 0
        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result
    }
}