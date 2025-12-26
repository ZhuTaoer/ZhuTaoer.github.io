var newDiv = document.createElement("div");
newDiv.innerHTML = '<span id="time"></span>';

document.addEventListener("DOMContentLoaded", function() {
      var div1 = document.getElementsByClassName("statistics")[0];
      var div2 = document.getElementsByClassName("beian")[0];

      if (div1 && div2) {
            div1.parentNode.insertBefore(newDiv, div2);
            var timeEl = document.getElementById("time");
            if (timeEl) {
                  function pad(n) { return n < 10 ? "0" + n : n; }
                  function formatNow() {
                        var d = new Date();
                        var y = d.getFullYear();
                        var m = pad(d.getMonth() + 1);
                        var day = pad(d.getDate());
                        var h = pad(d.getHours());
                        var min = pad(d.getMinutes());
                        var s = pad(d.getSeconds());
                        return y + "-" + m + "-" + day + " " + h + ":" + min + ":" + s;
                  }
                  function tick() {
                        timeEl.textContent = formatNow();
                  }
                  tick();
                  setInterval(tick, 1000);
            }
      }
});