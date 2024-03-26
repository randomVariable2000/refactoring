import './style.css';
import { statement } from './counter.js';
import plays from './plays.json';
import invoices from './invoices.json';

document.querySelector('#app').innerHTML = `
  <div style="white-space: pre-wrap">
  ${statement(invoices[0], plays)}
  </div>
`;

setupCounter(document.querySelector('#counter'));
