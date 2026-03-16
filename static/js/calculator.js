(function () {
  'use strict';

  var lang = document.documentElement.lang || 'en';
  var locale = lang === 'nl' ? 'nl-NL' : 'en-GB';

  function formatCurrency(n) {
    if (n === null || isNaN(n)) return '-';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(n);
  }

  function getVal(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback;
    var v = parseFloat(el.value);
    return isNaN(v) ? fallback : v;
  }

  function calculate() {
    var medewerkers = getVal('medewerkers', 6);
    var uurloon = getVal('uurloon', 45);
    var overheadPct = getVal('overhead', 40);
    var jaaromzet = getVal('jaaromzet', 8000000);
    var productieuren = getVal('productieuren', 1800);
    var incidenten = getVal('incidenten', 10);
    var duur = getVal('duur', 3);

    var labour = medewerkers * uurloon;
    var overhead = labour * (overheadPct / 100);
    var lostProduction = productieuren > 0 ? jaaromzet / productieuren : 0;
    var costPerHour = labour + overhead + lostProduction;
    var totalHours = incidenten * duur;
    var totalCost = costPerHour * totalHours;

    document.getElementById('res-labour').textContent = formatCurrency(labour);
    document.getElementById('res-overhead').textContent = formatCurrency(overhead);
    document.getElementById('res-lost').textContent = formatCurrency(lostProduction);
    document.getElementById('res-per-hour').textContent = formatCurrency(costPerHour);
    document.getElementById('res-total').textContent = formatCurrency(totalCost);

    var summaryEl = document.getElementById('res-summary');
    if (summaryEl) {
      summaryEl.textContent = incidenten + ' x ' + duur + ' = ' + totalHours + ' ' +
        (lang === 'nl' ? 'uur stilstand/jaar' : 'hours of downtime/year');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.querySelectorAll('.calc-input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', calculate);
    }
    calculate();
  });
})();
