const departures = [
    { time: "01:29", vessel: "Dolphin 2", destination: "Stulang Laut", status: "Scheduled" },
    { time: "06:45", vessel: "Dolphin 2", destination: "Stulang Laut", status: "Scheduled" },
    { time: "13:30", vessel: "Dolphin 5", destination: "Stulang Laut", status: "Scheduled" },
    { time: "16:45", vessel: "Dolphin 2", destination: "Stulang Laut", status: "Scheduled" }
  ];
  
  const tbody = document.getElementById("departure-body");
  
  function checkGateStatus() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    departures.forEach(dep => {
        const depTime = dep.time.split(":");
        const depHour = parseInt(depTime[0]);
        const depMinute = parseInt(depTime[1]);

        // Waktu 1 jam sebelum keberangkatan
        const gateOpenHour = depHour - 1;
        const gateOpenMinute = depMinute;

        // Jika waktu sekarang lebih besar atau sama dengan waktu Gate Open, ubah status menjadi "Gate Open"
        if (currentHour > gateOpenHour || (currentHour === gateOpenHour && currentMinute >= gateOpenMinute)) {
            if (dep.status === "Scheduled") {
                dep.status = "Gate Open";
            }
        }

        // Jika waktu sekarang lebih besar atau sama dengan waktu keberangkatan, ubah status menjadi "Departed"
        if (currentHour > depHour || (currentHour === depHour && currentMinute >= depMinute)) {
            if (dep.status === "Gate Open") {
                dep.status = "Departed";
            }
        }
    });
}

// Panggil fungsi untuk cek status setiap detik
setInterval(() => {
    checkGateStatus();
    renderDepartures(); // Render ulang tampilan setelah perubahan status
}, 1000); // Update setiap detik

// Fungsi untuk menggambar ulang tabel dengan status terbaru
function renderDepartures() {
    tbody.innerHTML = ''; // Kosongkan dulu tbody
    departures.forEach(dep => {
        const row = document.createElement("tr");
        const statusClass = dep.status.toLowerCase().replace(" ", "-");

        row.innerHTML = `
            <td><img src="dolphin.png" alt="Agent Logo" class="agent-logo"></td>
            <td>${dep.time}</td>
            <td>${dep.vessel}</td>
            <td>${dep.destination}</td>
            <td><span class="status ${statusClass}">${dep.status}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Render awal halaman
renderDepartures();

  departures.forEach(dep => {
    const row = document.createElement("tr");
    const statusClass = dep.status.toLowerCase().replace(" ", "-");
  
    row.innerHTML = `
      <td><img src="dolphin.png" alt="Agent Logo" class="agent-logo"></td>
      <td>${dep.time}</td>
      <td>${dep.vessel}</td>
      <td>${dep.destination}</td>
      <td><span class="status ${statusClass}">${dep.status}</span></td>
    `;
  
    tbody.appendChild(row);
  });

  const currentDateElement = document.getElementById("current-date");

  // Mendapatkan tanggal hari ini
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  
  // Format tanggal menjadi string (misalnya 14/04/2025)
  const formattedDate = `${day} ${month}`;
  
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}:${seconds}`;
  
    document.getElementById("current-time").textContent = currentTime;
  }
  
  // Jalankan sekali untuk langsung tampil
  updateTime();
  // Update setiap detik
  setInterval(updateTime, 1000);


  // Menampilkan tanggal di elemen
  currentDateElement.textContent = formattedDate;
  
  
