function navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    document.getElementById(screenId).classList.add('active');

    // Διαχείριση View Modes
    const container = document.getElementById('app-container');
    const desktopScreens = ['JK_H_HOME', 'JK_H_SETUP', 'JK_H_DASHBOARD', 'JK_A_DASHBOARD', 'JK_H_STATS'];
    
    if (desktopScreens.includes(screenId)) {
        container.classList.add('desktop-mode');
        document.body.style.backgroundColor = '#333';
    } else {
        container.classList.remove('desktop-mode');
        document.body.style.backgroundColor = '#e5e5e5';
    }
}

function switchGuestTab(tabName) {
    const searchTab = document.getElementById('guest-search-tab');
    const queueTab = document.getElementById('guest-queue-tab');
    
    if (tabName === 'search') {
        searchTab.style.display = 'block';
        queueTab.style.display = 'none';
    } else {
        searchTab.style.display = 'none';
        queueTab.style.display = 'block';
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    // Format any "↯" to use the brand style
    const formattedMessage = message.replace(/↯/g, '<span class="brand-arrow" style="font-size: 1.2em; vertical-align: middle;">↯</span>');
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${formattedMessage}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2500);
}

function toggleQR(show) {
    const modal = document.getElementById('qr-modal');
    if (show) modal.classList.add('active');
    else modal.classList.remove('active');
}

function toggleEQ(show) {
    const modal = document.getElementById('eq-modal');
    if (show) modal.classList.add('active');
    else modal.classList.remove('active');
}

// 6. Αίτημα Τραγουδιού (Guest)
function requestSong(title, artist) {
    // 1. Εμφάνιση Toast στον Guest
    showToast('Song QUp\'d! ↯');
    
    // 2. Προσθήκη στο Dashboard του Host (Mocking Real-time)
    const emptyState = document.getElementById('host-req-empty');
    const list = document.getElementById('host-req-list');
    
    if (emptyState && list) {
        emptyState.style.display = 'none';
        list.style.display = 'block';
        
        // Random Request ID
        const reqId = Math.floor(Math.random() * 1000);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.style.borderLeft = '4px solid orange';
        card.innerHTML = `
            <strong>${title}</strong> <br> 
            <span style="font-size: 12px;">${artist} · Guest #${reqId}</span>
            <div style="display: flex; gap: 5px; margin-top: 5px;">
                <button class="btn btn-host" style="margin: 0; padding: 5px;" onclick="this.parentElement.parentElement.remove()">Approve</button>
                <button class="btn" style="margin: 0; padding: 5px;" onclick="this.parentElement.parentElement.remove()">Deny</button>
            </div>
        `;
        
        list.appendChild(card);
    }
}

// Mock Queue Logic για την ειδοποίηση (Alert)
function clearQueue() {
    document.getElementById('host-queue-list').innerHTML = '';
    document.getElementById('queue-alert').style.display = 'flex';
}

function fillQueue() {
    document.getElementById('queue-alert').style.display = 'none';
    const list = document.getElementById('host-queue-list');
    
    const songs = [
        {title: "Bohemian Rhapsody", artist: "Queen"},
        {title: "Style", artist: "Taylor Swift"},
        {title: "Save Your Tears", artist: "The Weeknd"},
        {title: "Karma", artist: "Taylor Swift"},
        {title: "Don't Start Now", artist: "Dua Lipa"}
    ];
    
    songs.forEach(s => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';
        card.innerHTML = `
            <div>
                 <strong>${s.title}</strong> <br> <span style="font-size: 12px; color: #666;">Auto-Playlist</span>
            </div>
            <button class="btn" style="width: auto; padding: 5px 10px; font-size: 12px; color: red; margin: 0;">Skip</button>
        `;
        list.appendChild(card);
    });
}

function openLogin(role) {
    document.getElementById('login-user').value = role;
    navigateTo('JK_LOGIN');
}

function handleLogin() {
    const user = document.getElementById('login-user').value.toLowerCase();
    // No password check for mock
    
    if (user.includes('admin')) {
        showToast('Welcome, Admin (God Mode) 🛠️');
        navigateTo('JK_A_DASHBOARD');
    } else {
        // Default to Host for any other input (e.g. 'host', 'john', empty)
        showToast('Welcome, Host! 🎉');
        navigateTo('JK_H_HOME');
        startVibeSimulation();
    }
}

// ==========================================
// SMART FEATURES IMPLEMENTATION
// ==========================================

// 1. TABS ΕΠΙΣΚΕΠΤΗ (Updated)
function switchGuestTab(tabName) {
    document.getElementById('guest-search-tab').style.display = 'none';
    document.getElementById('guest-queue-tab').style.display = 'none';
    
    if (tabName === 'search') document.getElementById('guest-search-tab').style.display = 'block';
    else if (tabName === 'queue') document.getElementById('guest-queue-tab').style.display = 'block';
}

// 2. ΛΟΓΙΚΗ AUTO-DJ
let autoDJEnabled = true;
function toggleAutoDJ(enabled) {
    autoDJEnabled = enabled;
    showToast(enabled ? 'Auto-DJ Enabled 🤖' : 'Auto-DJ Disabled 🛑');
}

// 3. ΠΡΟΣΟΜΟΙΩΣΗ VIBE METER
function startVibeSimulation() {
    setInterval(() => {
        // Randomly fluctuate vibe
        const vibe = Math.floor(Math.random() * 100);
        const bar = document.getElementById('vibe-bar');
        const text = document.getElementById('vibe-text');
        
        if (bar && text) {
            bar.style.width = vibe + '%';
            
            if (vibe < 30) {
                bar.style.background = 'linear-gradient(90deg, #00f3ff, #0066ff)';
                text.innerText = 'Chilling 🧊';
            } else if (vibe < 70) {
                bar.style.background = 'linear-gradient(90deg, #00f3ff, #00ff9d)';
                text.innerText = 'Vibing 🌊';
            } else {
                 bar.style.background = 'linear-gradient(90deg, #d946ef, #ff0055)';
                 text.innerText = 'ON FIRE 🔥';
            }
        }
        
    }, 5000); // Update every 5 seconds
}
