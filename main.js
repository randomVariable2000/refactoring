import './style.css';
import { statement, htmlStatement } from './statement.js';
import plays from './plays.json';
import invoices from './invoices.json';

document.querySelector('#app').innerHTML = `
  <h1 style="font-style: italic;">string statement</h1>
  <div style="white-space: pre-wrap">
  ${statement(invoices[0], plays)}
  </div>
  <hr/>

  <h1 style="font-style: italic;">html statement</h1>
  ${htmlStatement(invoices[0], plays)}
`;

