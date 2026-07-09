let currentAudio = null;
let currentButton = null;

function openModal(folderType) {
    const modal = document.getElementById('folderModal');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';

    if (folderType === 'my-songs') {
        content = `
            <h2>ها! ها! تشغليش 🙂</h2>
            ${createAudioPlayer('وحدي بقيت أتخيلك 🎵', 'songs/my-voice/song1.mp3')}
            ${createAudioPlayer('قولوا لها أنني 🎤', 'songs/my-voice/song2.mp3')}
            ${createAudioPlayer('كل وعد ✨', 'songs/my-voice/song3.mp3')}
            ${createAudioPlayer('إستني خليكِ معايا 🌸', 'songs/my-voice/song4.mp3')}
            ${createAudioPlayer('عيد ميلاد 🎉', 'songs/my-voice/song5.mp3')}
        `;
    } 
    else if (folderType === 'her-photos') {
        content = `
            <h2>قمرتييييي 📸✨</h2>
            <div class="gallery">
                <img src="images/photo1.jpg" alt="صورة 1">
                <img src="images/photo2.jpg" alt="صورة 2">
                <img src="images/photo3.jpg" alt="صورة 3">
                <img src="images/photo4.jpg" alt="صورة 4">
                <img src="images/photo5.jpg" alt="صورة 5">
                <img src="images/photo6.jpg" alt="صورة 6">
                <img src="images/photo7.jpg" alt="صورة 7">
            </div>
        `;
    } 
    else if (folderType === 'fav-songs') {
        content = `
            <h2>أغانيكي المفضلة ⭐</h2>
            ${createAudioPlayer('أقبل قمرك بعد غياب 🌔', 'songs/her-fav/fav1.mp3')}
            ${createAudioPlayer('مكسرات 🍬', 'songs/her-fav/fav2.mp3')}
            ${createAudioPlayer('رمضان في مصر حاجة تانية 🌙', 'songs/her-fav/fav3.mp3')}
            ${createAudioPlayer('يـا وردة فـي البستـان 🌹', 'songs/her-fav/fav4.mp3')}
            ${createAudioPlayer('أيسل خالد - أختي حبيبيتي 💖', 'songs/her-fav/fav5.mp3')}
        `;
    } 
    else if (folderType === 'story') {
        content = `
            <h2>بحبك من بعد الله 🌸✨</h2>
            <div style="line-height: 2; font-size: 1.15rem; color: #cbdcf2; text-align: justify;">
                <p>🌸 فاكرة لما قلتلك <strong>"باي يحلوة"</strong>؟ الجملة دي كانت بداية إني أعرف أجمل وأرق واحدة شفتها في حياتي كلها.</p>
                <p>شايفة العداد اللي تحت ده؟ إن شاء الله لو ربنا كاتب لنا نصيب، هاجي يوم <strong>"3285"</strong> وأطلب إيدك رسمي.. ولحد ما يجي الوقت ده، كل يوم هقعد أدعي من كل قلبي إنك تكوني من نصيبي وتفضلي منورة دنيتي دايماً 🌼</p>
            </div>
        `;
    }
    // الجزء الجديد الخاص بالمواقع الأخرى
    else if (folderType === 'other-sites') {
        content = `
            <h2>😍 عقبال ما يبقوا 1000</h2>
            <p style="color: #00bfff; font-size: 0.95rem; font-weight: bold; margin-bottom: 20px; text-align: center;">
                آسف باقي المواقع خربت ودول اللي لسة شغالين 🥲
            </p>
            <div class="sites-list">
                <a href="https://mohamed-elaraby01.github.io/Happy-Birthday-Shadia/" target="_blank" class="site-link-item">
                    <span>🎉 موقع يوم ميلادكك</span>
                    <span class="link-arrow">⬅️</span>
                </a>
                <a href="https://mohamed-elaraby01.github.io/hayaty/" target="_blank" class="site-link-item">
                    <span>🐑 موقع العيددد</span>
                    <span class="link-arrow">⬅️</span>
                </a>
                <a href="https://mohamed-elaraby01.github.io/shosho/" target="_blank" class="site-link-item">
                    <span>🌸 موقع الأغاني</span>
                    <span class="link-arrow">⬅️</span>
                </a>
            </div>
        `;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'flex';
}

function createAudioPlayer(title, src) {
    return `
        <div class="audio-item">
            <div class="audio-info">
                <p>${title}</p>
            </div>
            <button class="play-btn" onclick="togglePlay(this, '${src}')">تشغيل ⏩</button>
        </div>
    `;
}

function togglePlay(btn, src) {
    if (currentAudio && currentAudio.src === window.location.origin + '/' + encodeURI(src)) {
        if (!currentAudio.paused) {
            currentAudio.pause();
            btn.innerText = 'تشغيل ⏩';
            btn.classList.remove('playing');
        } else {
            currentAudio.play();
            btn.innerText = 'إيقاف مؤقت ⏸';
            btn.classList.add('playing');
        }
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        if (currentButton) {
            currentButton.innerText = 'تشغيل ⏩';
            currentButton.classList.remove('playing');
        }
    }

    currentAudio = new Audio(src);
    currentAudio.loop = true; 
    currentButton = btn;
    
    currentAudio.play().then(() => {
        btn.innerText = 'إيقاف مؤقت ⏸';
        btn.classList.add('playing');
    }).catch(error => {
        console.error("خطأ في تشغيل الملف:", error);
        alert("لم يتم العثور على ملف الأغنية! تأكد من وضع الملف بالاسم الصحيح داخل المجلد المناسب.");
    });
}

function closeModal() {
    const modal = document.getElementById('folderModal');
    modal.style.display = 'none';
    
    if (currentAudio) {
        currentAudio.pause();
        if (currentButton) {
            currentButton.innerText = 'تشغيل ⏩';
            currentButton.classList.remove('playing');
        }
        currentAudio = null;
        currentButton = null;
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('folderModal');
    if (event.target == modal) { closeModal(); }
}

document.addEventListener("DOMContentLoaded", function() {
    const firstMeetDate = new Date(2025, 4, 15); 
    const today = new Date();
    const differenceInTime = today.getTime() - firstMeetDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    const counterElement = document.getElementById('counter');
    if (differenceInDays > 0) {
        counterElement.innerText = `بقالنا سوا ${differenceInDays} وإن شاء الله هنبقى أكتر و أكتر.`;
    } else {
        counterElement.innerText = `بداية حكايتنا الأجمل في الكون.`;
    }
});

