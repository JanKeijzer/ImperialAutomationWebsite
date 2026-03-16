(function () {
  'use strict';

  var lang = document.documentElement.lang || 'en';

  var currencies = {
    EUR: {
      code: 'EUR',
      locale: 'nl-NL',
      unit: { en: 'euro/hour', nl: 'euro/uur', hu: 'euró/óra' },
      revenueUnit: { en: 'euro', nl: 'euro', hu: 'euró' },
      defaults: { uurloon: 45, jaaromzet: 8000000 }
    },
    GBP: {
      code: 'GBP',
      locale: 'en-GB',
      unit: { en: 'pound/hour', nl: 'pond/uur', hu: 'font/óra' },
      revenueUnit: { en: 'pound', nl: 'pond', hu: 'font' },
      defaults: { uurloon: 38, jaaromzet: 7000000 }
    },
    USD: {
      code: 'USD',
      locale: 'en-US',
      unit: { en: 'dollar/hour', nl: 'dollar/uur', hu: 'dollár/óra' },
      revenueUnit: { en: 'dollar', nl: 'dollar', hu: 'dollár' },
      defaults: { uurloon: 42, jaaromzet: 9000000 }
    },
    HUF: {
      code: 'HUF',
      locale: 'hu-HU',
      unit: { en: 'Ft/hour', nl: 'Ft/uur', hu: 'Ft/óra' },
      revenueUnit: { en: 'Ft', nl: 'Ft', hu: 'Ft' },
      defaults: { uurloon: 4500, jaaromzet: 3200000000 }
    }
  };

  var currentCurrency = null;
  var userEdited = {};

  function getCurrency() {
    var select = document.getElementById('currency-select');
    return currencies[select ? select.value : 'EUR'] || currencies.EUR;
  }

  function formatCurrency(n) {
    if (n === null || isNaN(n)) return '-';
    var cur = getCurrency();
    return new Intl.NumberFormat(cur.locale, {
      style: 'currency',
      currency: cur.code,
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
    var cur = getCurrency();
    var medewerkers = getVal('medewerkers', 6);
    var uurloon = getVal('uurloon', cur.defaults.uurloon);
    var overheadPct = getVal('overhead', 40);
    var jaaromzet = getVal('jaaromzet', cur.defaults.jaaromzet);
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
      var summaryTexts = {
        en: 'hours of downtime/year',
        nl: 'uur stilstand/jaar',
        hu: 'óra állásidő/év'
      };
      summaryEl.textContent = incidenten + ' x ' + duur + ' = ' + totalHours + ' ' +
        (summaryTexts[lang] || summaryTexts.en);
    }
  }

  function updateUnits() {
    var cur = getCurrency();
    var wageUnit = document.getElementById('unit-wage');
    var revenueUnit = document.getElementById('unit-revenue');
    if (wageUnit) wageUnit.textContent = cur.unit[lang] || cur.unit.en;
    if (revenueUnit) revenueUnit.textContent = cur.revenueUnit[lang] || cur.revenueUnit.en;
  }

  function onCurrencyChange() {
    var cur = getCurrency();

    // Reset fields the user has not manually edited
    var uurloonEl = document.getElementById('uurloon');
    var jaaromzetEl = document.getElementById('jaaromzet');
    if (uurloonEl && !userEdited.uurloon) uurloonEl.value = cur.defaults.uurloon;
    if (jaaromzetEl && !userEdited.jaaromzet) jaaromzetEl.value = cur.defaults.jaaromzet;

    updateUnits();
    calculate();
  }

  function trackEdits(e) {
    var id = e.target.id;
    if (id === 'uurloon' || id === 'jaaromzet') {
      userEdited[id] = true;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.querySelectorAll('.calc-input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', calculate);
      inputs[i].addEventListener('input', trackEdits);
    }

    var select = document.getElementById('currency-select');
    if (select) {
      select.addEventListener('change', function () {
        userEdited = {};
        onCurrencyChange();
      });
    }

    updateUnits();
    calculate();
  });
})();
