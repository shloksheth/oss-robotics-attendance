// Check if user already set up
if (localStorage.getItem("userProfile")) {
  redirectUser();
}

document.getElementById("setup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const profile = {
    name: document.getElementById("name").value,
    studentId: document.getElementById("studentId").value,
    grade: document.getElementById("grade").value,
    ftcTeam: document.getElementById("ftcTeam").value,
    clockwork: document.getElementById("clockwork").checked
  };

  localStorage.setItem("userProfile", JSON.stringify(profile));
  redirectUser();
});

function redirectUser() {
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const weekday = now.getDay(); // 0=Sun, 1=Mon, ... 6=Sat

  // Determine team
  let team;
  if (weekday === 2 || weekday === 4) {
    team = profile.ftcTeam;
  } else {
    team = profile.clockwork ? "Clockwork" : profile.ftcTeam;
  }

  // Determine status
  let status;
  const isWeekend = weekday === 0 || weekday === 6;

  if (!isWeekend) {
    if (hour < 16 || (hour === 16 && minute < 10)) status = "Arriving";
    else status = "Leaving";
  } else {
    if (hour < 13) status = "Arriving";
    else status = "Leaving";
  }

  const url =
    "https://docs.google.com/forms/d/e/1FAIpQLSeQjlC_QnxZ0SUQuBsEZTCsoGuJnu6C660G9g_Zy6x2uRVY4w/viewform" +
    `?entry.105562573=${encodeURIComponent(profile.name)}` +
    `&entry.181165186=${encodeURIComponent(profile.studentId)}` +
    `&entry.1668576181=${encodeURIComponent(profile.grade)}` +
    `&entry.2092502699=${encodeURIComponent(team)}` +
    `&entry.126296504=${encodeURIComponent(status)}` +
    `&entry.506639235_hour=${hour}` +
    `&entry.506639235_minute=${minute}` +
    `&entry.1756867001_year=${year}` +
    `&entry.1756867001_month=${month}` +
    `&entry.1756867001_day=${day}`;

  window.location.href = url;
}
