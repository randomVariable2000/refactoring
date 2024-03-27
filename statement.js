

export function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return renderPlainText(statementData, plays)

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
  }

  function renderPlainText(invoice) {
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
      result += ` ${perf.play.name}: ${usd(perf.amount)}`
      result += ` (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(invoice.totalAmount)}\n`;
    result += `You earned ${invoice.totalVolumeCredits} credits\n`;
    return result;

    function usd(num) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(num / 100)
    }
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

  function volumeCreditsFor(perf) {
    let result = 0
    // add volume credits
    result += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === perf.play.type) {
      result += Math.floor(perf.audience / 5);
    }
    return result
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

