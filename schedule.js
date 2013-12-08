// Create one global object to hold all application data and logic.
var app = { 
  util: {},      // utility functions
  onload: null   // called after DOM created
};

// Schedule app.onload to be called after initialization of the DOM. 
(function() {
  if (window.onload) {
    var originalOnload = window.onload;
    window.onload = function() {
      originalOnload();
      app.onload();
    };
  } else {
    window.onload = function() {
      app.onload(); 
    }
  }
})();

// generic function to create http request object 
app.util.createHttpRequest = function() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest(); 
  } else if (window.ActiveXObject) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert('This page will not function correctly; try another browser.');
      }
    }
  }
};

app.util.getParams = function() {
  var qs = document.location.search.split("+").join(" ");
  var params = {};
  var tokens;
  var re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

// function used for all communication with server
app.getGrades = function(cb) {
  var request = app.util.createHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState !== 4) return;
    if (request.status !== 200) {
      console.log('There was a problem with the request.');
      return cb(new Error(request.status));
    }
    try {
      var resData = JSON.parse(request.responseText);
    } catch(e) { alert('json parse error: ' + e.message); }
    cb(resData);
  };
  request.open('GET', '/grades.json');
  request.send();
};

app.onload = function() {
  var id = app.util.getParams()['id'];
  if (id) {
    app.getGrades(function(data) {
      var grades = data[id];
      if (!grades) {
        alert('unknown id');
        return;
      }
      app.displayGrades(grades);
    });
  }
};

app.displayGrades = function(grades) {
  var $rows = $('tr');
  for (var i = 0; i < grades.length; ++i) {
    var grade = grades[i];
    var $row = $($rows.get(i + 1));
    var $cell = $($row.children().get(2));
    var contents = '/' + $cell.html();
    if (grade !== -1) contents = grade + contents;
    $cell.html(contents);
  }
};

