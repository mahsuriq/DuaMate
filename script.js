/* ==========================================
   DuaMate - Core Logic Script (script.js)
   ========================================== */

// 1. Database Doa mengikut Emosi
const duas = {
    "Happy 😊": "Alhamdulillahi Rabbil 'Alamin.\n\nMeaning: All praise belongs to Allah.",
    "Sad 😢": "Hasbunallahu wa ni'mal wakeel.\n\nMeaning: Allah is sufficient for us and He is the best disposer of affairs.",
    "Anxious 😟": "Allahumma inni a'udhu bika minal hammi wal hazan.\n\nMeaning: O Allah, I seek refuge in You from anxiety and sorrow.",
    "Angry 😠": "A'udhu billahi minash shaitanir rajim.\n\nMeaning: I seek refuge in Allah from Satan.",
    "Grateful 🤍": "Allahumma a'inni 'ala zikrika wa syukrika wa husni ibadatik.\n\nMeaning: O Allah, help me remember You and thank You.",
    "Stressed 😫": "La hawla wa la quwwata illa billah.\n\nMeaning: There is no power except with Allah.",
    "Lonely 🥺": "Rabbi inni lima anzalta ilayya min khairin faqir.\n\nMeaning: My Lord, I am truly in need of whatever good You send me.",
    "Confused 😕": "Rabbi zidni ilma.\n\nMeaning: My Lord, increase me in knowledge."
};

const reflections = {

"Happy 😊":"Alhamdulillah. Happiness is one of Allah's greatest blessings. Remember to thank Him and spread your joy to those around you. 🤍",

"Sad 😢":"Every hardship carries hidden wisdom. Allah knows your pain, and every tear you shed is known to Him. Keep making dua and trust His plan. 🌸",

"Anxious 😟":"Your future is already written by Allah. Focus on what you can do today and leave the rest to Him. 🤲",

"Angry 😠":"Take a deep breath. Strength is shown by controlling anger. Seek refuge in Allah and choose patience. 🍃",

"Grateful 🤍":"Gratitude increases blessings. Continue appreciating every small gift Allah has given you. ✨",

"Stressed 😫":"Allah never burdens a soul beyond what it can bear. You are stronger than you think. 🌿",

"Lonely 🥺":"You are never truly alone. Allah is always closer to you than anyone else. 🤍",

"Confused 😕":"When you don't know which path to take, ask Allah for guidance. He always leads sincere hearts."
};

// Database untuk Dua of the Day (Rawak)
const dailyDuas = [
    "Rabbi yassir wa la tu'assir wa tammim bil khair.\n\nMeaning: My Lord, make things easy for me and do not make them difficult, and complete them with goodness.",
    "Allahumma inni as'aluka al-afiyah.\n\nMeaning: O Allah, I ask You for well-being in this world and the next.",
    "Rabbana atina fid dunya hasanah wa fil akhirati hasanah.\n\nMeaning: Our Lord, give us in this world that which is good and in the Hereafter that which is good.",
    "Allahumma mutahhir al-qulub.\n\nMeaning: O Allah, Purifier of hearts, make our hearts firm on Your religion."
];

// 2. Live Date & Time Counter (Jam Bergerak)
function updateClock() {
    const now = new Date();
    
    // Format Tarikh (Contoh: Friday, July 3, 2026)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("live-date").innerText = now.toLocaleDateString('en-US', options);
    
    // Format Masa Live (Contoh: 11:00:00 PM)
    document.getElementById("live-time").innerText = now.toLocaleTimeString('en-US');
}
setInterval(updateClock, 1000);
updateClock(); // Jalankan serta-merta bila halaman dibuka

// 3. Fungsi Tukar Halaman (Tab Navigation)
function switchPage(pageId) {
    // Sembunyikan semua bahagian halaman (.page)
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Paparkan halaman yang dipilih sahaja
    document.getElementById(pageId).classList.add('active');
    
    // Tukar status butang aktif di bar navigasi
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Set butang yang ditekan sebagai aktif
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 4. Papar Doa Pilihan & Rakam Sejarah Emosi
function showDua() {
    const emotion = document.getElementById("emotion").value;
    
    if (emotion === "") {
        alert("Please choose an emotion first!");
        return;
    }
    
    // Paparkan doa yang sepadan dengan emosi
    document.getElementById("doa").innerText = duas[emotion];
    
    // Ambil masa & tarikh semasa butang ditekan
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // Format DD/MM/YYYY
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); // Format HH:MM AM/PM
    const exactTimestamp = `${dateStr} @ ${timeStr}`;
    
    // Simpan ke dalam sistem sejarah (History)
    saveHistory(emotion, exactTimestamp);
}

// 5. Pengurusan LocalStorage (Simpan Rekod Sejarah)
function saveHistory(emotion, timestamp) {
    let history = JSON.parse(localStorage.getItem("duamate_history")) || [];
    
    // Masukkan data terbaharu di bahagian paling atas (unshift)
    history.unshift({ emotion: emotion, time: timestamp });
    
    // Simpan semula ke storan pelayar web
    localStorage.setItem("duamate_history", JSON.stringify(history));
    displayHistory();
    updateChart();
}

// Paparkan senarai sejarah dalam bentuk senarai (List)
function displayHistory() {
    let history = JSON.parse(localStorage.getItem("duamate_history")) || [];
    let list = document.getElementById("historyList");
    
    // Kosongkan senarai lama sebelum kemas kini
    list.innerHTML = "";
    
    if (history.length === 0) {
        list.innerHTML = `<li style='color:#999; text-align:center; padding: 20px;'>No history found. Try selecting an emotion!</li>`;
        return;
    }
    
    // Bina elemen HTML bagi setiap rekod
    history.forEach(item => {
        let li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
            <span class="history-emotion">${item.emotion}</span>
            <span class="history-time">📅 ${item.time}</span>
        `;
        list.appendChild(li);
    });
}

// Padam semua rekod sejarah
function clearHistory() {
    if (confirm("Are you sure you want to clear your emotion history?")) {
        localStorage.removeItem("duamate_history");
        displayHistory();
    }
}

// 6. Dua of the Day (Berubah secara automatik mengikut hari bulan)
function setupDailyDua() {
    let today = new Date();
    let index = today.getDate() % dailyDuas.length;
    document.getElementById("dailyDua").innerText = dailyDuas[index];
}

let emotionChart;

function updateChart() {

    let history = JSON.parse(localStorage.getItem("duamate_history")) || [];

    let counts = {
        "Happy 😊":0,
        "Sad 😢":0,
        "Anxious 😟":0,
        "Angry 😠":0,
        "Grateful 🤍":0,
        "Stressed 😫":0,
        "Lonely 🥺":0,
        "Confused 😕":0
    };

    history.forEach(item=>{
        counts[item.emotion]++;
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    if(emotionChart){
        emotionChart.destroy();
    }

    emotionChart = new Chart(document.getElementById("emotionChart"),{

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:"Number of Times Selected",

                data:values,

                borderWidth:1

            }]

        },

        options:{
            responsive:true,
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }

    });

    let max = Math.max(...values);

    if(max>0){

        document.getElementById("mostEmotion").innerHTML =
        "🌟 Most Selected Emotion: <b>"+labels[values.indexOf(max)]+"</b>";

    }else{

        document.getElementById("mostEmotion").innerHTML =
        "No emotion history yet.";

    }

}
// Fungsi yang berjalan secara automatik apabila kod JS dimuatkan
displayHistory();
setupDailyDua();
updateChart();

