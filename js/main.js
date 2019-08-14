const presets = [
  {
    'title': '5K',
    'distance': {
      'km': 5,
      'mi': 3.10686
    }
  },
  {
    'title': '10K',
    'distance': {
      'km': 10,
      'mi': 6.21371
    }
  },
  {
    'title': '½ Marathon',
    'distance': {
      'km': 21.0975,
      'mi': 13.10937873
    }
  },
  {
    'title': 'Marathon',
    'distance': {
      'km': 42.195,
      'mi': 26.2187575
    }
  },
  {
    'title': '50K',
    'distance': {
      'km': 50,
      'mi': 31.0686
    }
  }
];

$('#calculateTime').on('click', function() {
  let timeHours = '';
  let timeMinutes = '';
  let timeSeconds = '';

  const distance = parseFloat($('#distance').val());
  if (isNaN(distance) || (distance < 0)) {
    alert('Please fill the distance field properly.');
    $('#time_hours').val(timeHours);
    $('#time_minutes').val(timeMinutes);
    $('#time_seconds').val(timeSeconds);
    return;
  }

  const pace = {
    'hours': parseInt($('#pace_hours').val()),
    'minutes': parseInt($('#pace_minutes').val()),
    'seconds': parseInt($('#pace_seconds').val())
  };

  if ((isNaN(pace.hours) || (pace.hours < 0))
    ||(isNaN(pace.minutes) || (pace.minutes < 0) || (pace.minutes > 59))
    ||(isNaN(pace.seconds) || (pace.seconds < 0) || (pace.seconds > 59))) {
    alert("Please fill the pace's fields properly.");
    $('#time_hours').val(timeHours);
    $('#time_minutes').val(timeMinutes);
    $('#time_seconds').val(timeSeconds);
    return;
  }

  const output = ((pace.hours * 3600) + (pace.minutes * 60) + pace.seconds) * parseFloat(distance);

  timeHours = parseInt(output / 3600);
  timeMinutes = parseInt((output - (timeHours * 3600)) / 60);
  timeSeconds = parseInt(output - (timeHours * 3600) - (timeMinutes * 60));

  $('#time_hours').val(timeHours);
  $('#time_minutes').val(timeMinutes);
  $('#time_seconds').val(timeSeconds);
});

$('#calculateDistance').on('click', function() {
  let distance = '';

  const time = {
    'hours': parseInt($('#time_hours').val()),
    'minutes': parseInt($('#time_minutes').val()),
    'seconds': parseInt($('#time_seconds').val())
  };

  if ((isNaN(time.hours) || (time.hours < 0))
    ||(isNaN(time.minutes) || (time.minutes < 0) || (time.minutes > 59))
    ||(isNaN(time.seconds) || time.seconds < 0) || (time.seconds > 59)) {
    alert("Please fill the time's fields properly.");
    $('#distance').val(distance);
    return;
  }

  const pace = {
    'hours': parseInt($('#pace_hours').val()),
    'minutes': parseInt($('#pace_minutes').val()),
    'seconds': parseInt($('#pace_seconds').val())
  };

  if ((isNaN(pace.hours) || (pace.hours < 0))
    ||(isNaN(pace.minutes) || (pace.minutes < 0) || (pace.minutes > 59))
    ||(isNaN(pace.seconds) || (pace.seconds < 0) || (pace.seconds > 59))) {
    alert('Please fill the pace\'s fields properly.');
    $('#distance').val(distance);
    return;
  }

  const timeInSeconds = ((time.hours * 3600) + (time.minutes * 60) + time.seconds);
  const paceInSeconds = ((pace.hours * 3600) + (pace.minutes * 60) + pace.seconds);
  const output = timeInSeconds / paceInSeconds;

  $('#distance').val(output.toFixed(3));
});

$('#calculatePace').on('click', function() {
  let paceHours = '';
  let paceMinutes = '';
  let paceSeconds = '';

  const time = {
    'hours': parseInt($('#time_hours').val()),
    'minutes': parseInt($('#time_minutes').val()),
    'seconds': parseInt($('#time_seconds').val())
  };

  if ((isNaN(time.hours) || (time.hours < 0))
    ||(isNaN(time.minutes) || (time.minutes < 0) || (time.minutes > 59))
    ||(isNaN(time.seconds) || time.seconds < 0) || (time.seconds > 59)) {
    alert("Please fill the time's fields properly.");
    $('#pace_hours').val(paceHours);
    $('#pace_minutes').val(paceMinutes);
    $('#pace_seconds').val(paceSeconds);
    return;
  }

  const distance = parseFloat($('#distance').val());
  if (isNaN(distance) || (distance < 0)) {
    alert('Please fill the distance field properly.');
    $('#pace_hours').val(paceHours);
    $('#pace_minutes').val(paceMinutes);
    $('#pace_seconds').val(paceSeconds);
    return;
  }

  const output = ((time.hours * 3600) + (time.minutes * 60) + time.seconds) / distance;

  paceHours = parseInt(output / 3600);
  paceMinutes = parseInt((output - (paceHours * 3600)) / 60);
  paceSeconds = parseInt(output - (paceHours * 3600) - (paceMinutes * 60));

  $('#pace_hours').val(paceHours);
  $('#pace_minutes').val(paceMinutes);
  $('#pace_seconds').val(paceSeconds);
});

$('#system').on('change', function() {
  const system = $('#system option:selected').text();
  if (system == 'Metric') {
    $('#unit').text('/km');
  } else {
    $('#unit').text('/mi');
  }

  const selectedPreset = $('#preset option:selected').text();
  if (selectedPreset != 'Pick an event') {
    let preset = '';
    presets.forEach(function(element) {
      if (element.title == selectedPreset) {
        preset = element;
      }
    });

    let distance = '';
    if (system == 'Metric') {
      distance = preset.distance.km;
    } else {
      distance = preset.distance.mi;
    }
    $('#distance').val(distance);
  }
});

$('#preset').on('change', function() {
  const selectedPreset = $('#preset option:selected').text();
  const system = $('#system option:selected').text();

  let preset = '';
  presets.forEach(function(element) {
    if (element.title == selectedPreset) {
      preset = element;
    }
  });

  let distance = '';
  if (system == 'Metric') {
    distance = preset.distance.km;
  } else {
    distance = preset.distance.mi;
  }
  $('#distance').val(distance);
});

$(document).ready(function() {
  $('select').material_select();

  const presetSelector = document.getElementById('preset');

  presets.forEach(function(preset) {
    const option = document.createElement('option');
    option.text = preset.title;
    presetSelector.add(option, null);
  });

  $('select').material_select();
});
