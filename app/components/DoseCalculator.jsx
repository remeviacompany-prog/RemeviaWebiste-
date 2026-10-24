'use client';

import React, { useState } from 'react';

export default function DoseCalculator({ rates, productName = 'Product' }) {
  const keys = Object.keys(rates);
  const [selectedUse, setSelectedUse] = useState(keys[0] || '');
  const [qty, setQty] = useState('');

  const currentRate = rates[selectedUse] || (keys[0] ? rates[keys[0]] : [1, 'kg', 'feed', '']);
  const [amountPerUnit, unit, basis, note] = currentRate;

  const calculateOutput = () => {
    const q = parseFloat(qty);
    if (!q || q <= 0) return { val: '—', sub: 'Enter a quantity to see the amount needed.' };

    const total = q * amountPerUnit;
    let formattedVal = '';

    if (unit === 'ml' && total >= 1000) {
      formattedVal = (Math.round((total / 1000) * 100) / 100).toLocaleString('en-IN') + ' L';
    } else if (unit === 'kg' && total < 1) {
      formattedVal = (Math.round((total * 1000) * 100) / 100).toLocaleString('en-IN') + ' g';
    } else {
      formattedVal = (Math.round(total * 100) / 100).toLocaleString('en-IN') + ' ' + unit;
    }

    return { val: formattedVal, sub: note || '' };
  };

  const output = calculateOutput();

  return (
    <div className="calc">
      <div className="calc__grid">
        <label className="field">
          Application / target
          <select 
            name="use" 
            value={selectedUse} 
            onChange={(e) => setSelectedUse(e.target.value)}
          >
            {keys.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Quantity of <b>{basis}</b>
          <input 
            name="qty" 
            type="number" 
            min="0" 
            step="any" 
            placeholder="e.g. 10" 
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
      </div>

      <div className="calc__out">
        <span>Recommended {productName} required:</span>
        <b>{output.val}</b>
        <small>{output.sub}</small>
      </div>
    </div>
  );
}
