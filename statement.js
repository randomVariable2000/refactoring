import { createStatementData } from "./createStatementData";


export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
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
}

