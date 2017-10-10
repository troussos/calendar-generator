'use strict';

var makecalendar = function makecalendar(year) {
  var doc = new window['jsPDF']('landscape', 'mm', 'a4');
  doc['setFontSize'](12);
  doc['setFont']("helvetica", "bold");
  doc['setTextColor'](160);

  for (var x = 30, y = 30, month = 0; month <= 12; x = 30, y += 12, month++) {
    if (month == 0) {
      //First row is the year
      for (var i = 0; i < 4; i++, x += 6.3) {
        var YYYY = year.toString();
        doc['text'](x, y, YYYY[i]);
      }
    } else {
      // Then come the actual months
      var daysInMonth = new Date(year, month, 0).getDate();

      for (var day = 1; day <= daysInMonth; day++) {
        var weekday = new Date(year, month - 1, day - 1).getDay();
        var DD = day.toString();

        doc['setTextColor'](weekday == 5 || weekday == 6 ? 100 : 160);
        doc['text'](x, y, DD);day < 10 ? x += 6.3 : x += 8.2;
      }
    }
  }
  return doc;
};

var app = {
  el: '#calendar',
  data: {
    currentYear: new Date().getFullYear(),
    year: new Date().getFullYear()
  },
  methods: {
    getPDF: function getPDF() {
      var year = this.year;
      var doc = makecalendar(year);
      doc['save']('Calendar ' + year + ' (A4).pdf');
      //doc['output']('dataurlnewwindow')
    }
  }
};

document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
    new Vue(app);
  }
};