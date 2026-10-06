// Handle Sidebar Active Links
document.addEventListener('DOMContentLoaded', () => {
    // --- Student Name Modal Logic ---
    const nameModal = document.getElementById('name-modal');
    const nameInput = document.getElementById('student-name-input');
    const classInput = document.getElementById('student-class-input');
    const classError = document.getElementById('class-error');
    const startBtn = document.getElementById('start-lesson-btn');
    const nameDisplay = document.getElementById('student-name-display');
    const displayName = document.getElementById('display-name');

    const allowedClasses = ['ONB103', 'CB211', 'CB213', 'B212', 'CB210', 'CB206'];

    // Check if name is already stored in sessionStorage
    const storedName = sessionStorage.getItem('studentName');
    if (storedName) {
        nameModal.classList.add('hidden');
        displayName.textContent = storedName;
        nameDisplay.classList.remove('hidden');
    } else {
        setTimeout(() => nameInput && nameInput.focus(), 100);
    }

    const startLesson = () => {
        const name = nameInput.value.trim();
        const studentClass = classInput ? classInput.value.trim().toUpperCase() : '';
        
        if (name && studentClass) {
            if (!allowedClasses.includes(studentClass)) {
                classError.style.display = 'block';
                classInput.focus();
                return;
            }
            classError.style.display = 'none';
            const fullNameClass = name + ' - ' + studentClass;
            sessionStorage.setItem('studentName', fullNameClass);
            displayName.textContent = fullNameClass;
            nameModal.classList.add('hidden');
            nameDisplay.classList.remove('hidden');

            // Send data to Google Form quietly in the background
            const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd9g4rE9j1urSd8CrJ6hRcigrpklwxgzO8KgGJy8zXYAifGeA/formResponse";
            const formData = new FormData();
            formData.append("entry.388968236", fullNameClass); // "What's your full name?" field
            
            fetch(formUrl, {
                method: "POST",
                mode: "no-cors",
                body: formData
            }).catch(err => console.error("Error logging student:", err));

        } else if (!name) {
            nameInput.style.borderColor = 'red';
            nameInput.placeholder = 'Chưa nhập họ tên...';
            nameInput.focus();
        } else if (!studentClass) {
            classInput.style.borderColor = 'red';
            classInput.placeholder = 'Chưa nhập mã lớp...';
            classInput.focus();
        }
    };

    if (startBtn) startBtn.addEventListener('click', startLesson);
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (classInput) classInput.focus();
                else startLesson();
            }
        });
    }
    if (classInput) {
        classInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') startLesson();
        });
    }
    // --------------------------------

    const sections = document.querySelectorAll('.lesson-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Tab Switching Logic
    // Initially hide all sections except the first one
    sections.forEach((sec, index) => {
        if (index !== 0) sec.classList.add('tab-hidden');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections
            sections.forEach(sec => sec.classList.add('tab-hidden'));

            // Show target section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('tab-hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Toggle logic for Question / Answer
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find the next sibling which is the content div
            const content = btn.nextElementSibling;
            if (content && content.classList.contains('content')) {
                content.classList.toggle('hidden');
                
                // Change emoji icon slightly when open
                const emoji = btn.querySelector('.emoji');
                if (!content.classList.contains('hidden')) {
                    if (btn.classList.contains('q-btn')) emoji.textContent = '👇';
                    if (btn.classList.contains('a-btn')) emoji.textContent = '✨';
                    btn.style.background = '#e0fbfc';
                    btn.style.color = '#333'; // Ensure text is visible on light blue background
                } else {
                    if (btn.classList.contains('q-btn')) emoji.textContent = '❓';
                    if (btn.classList.contains('a-btn')) emoji.textContent = '💡';
                    btn.style.background = '';
                    btn.style.color = ''; // Revert to original inline text color
                }
            }
        });
    });

    // =========================================
    // NATURAL CONVERSATIONAL SPEECH ENGINE
    // =========================================
    let cachedVoices = [];
    const updateVoices = () => {
        if ('speechSynthesis' in window) {
            cachedVoices = window.speechSynthesis.getVoices() || [];
        }
    };
    updateVoices();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    const selectConversationalVoice = (gender = 'female') => {
        if (!cachedVoices || cachedVoices.length === 0) {
            updateVoices();
        }
        const voices = cachedVoices.filter(v => v.lang && (v.lang.startsWith('en') || v.lang.startsWith('en_')));
        if (!voices.length) return cachedVoices[0] || null;

        // Preferred ranking for conversational, human-like, warm English voices
        const femaleRankings = [
            'Jenny Online (Natural)',
            'Jenny (Natural)',
            'Aria Online (Natural)',
            'Aria (Natural)',
            'Ava (Premium)',
            'Ava (Enhanced)',
            'Samantha (Enhanced)',
            'Zoe (Premium)',
            'Zoe (Enhanced)',
            'Siri',
            'Allison (Enhanced)',
            'Google US English',
            'Google UK English Female',
            'Samantha',
            'Victoria (Enhanced)',
            'Karen',
            'Serena'
        ];

        const maleRankings = [
            'Guy Online (Natural)',
            'Guy (Natural)',
            'Davis Online (Natural)',
            'Davis (Natural)',
            'Jason Online (Natural)',
            'Christopher Online (Natural)',
            'Eric Online (Natural)',
            'Evan (Enhanced)',
            'Nathan (Enhanced)',
            'Oliver (Enhanced)',
            'Tom (Enhanced)',
            'Daniel (Enhanced)',
            'Siri',
            'Google UK English Male',
            'Google US English Male',
            'Google US English',
            'Daniel'
        ];

        const ranking = gender === 'female' ? femaleRankings : maleRankings;

        // 1. Check exact priority ranking
        for (const target of ranking) {
            const match = voices.find(v => v.name && v.name.toLowerCase().includes(target.toLowerCase()));
            if (match) return match;
        }

        // 2. Find any voice marked Natural / Enhanced / Premium / Siri
        const naturalMatch = voices.find(v => {
            const n = (v.name || '').toLowerCase();
            const isNatural = n.includes('natural') || n.includes('neural') || n.includes('enhanced') || n.includes('premium') || n.includes('siri');
            if (!isNatural) return false;
            return gender === 'female' 
                ? (!n.includes('male') && !n.includes('guy') && !n.includes('david') && !n.includes('george'))
                : (!n.includes('female') && !n.includes('jenny') && !n.includes('aria') && !n.includes('samantha'));
        });
        if (naturalMatch) return naturalMatch;

        // 3. Fallback: filter out obsolete robotic voices (Alex, Fred, etc.)
        const modernVoices = voices.filter(v => {
            const n = (v.name || '').toLowerCase();
            return !['alex', 'fred', 'junior', 'albert', 'ralph', 'zarvox', 'whisper', 'organ'].some(bad => n.includes(bad));
        });

        const pool = modernVoices.length ? modernVoices : voices;
        return pool.find(v => v.lang.startsWith('en-US')) || pool.find(v => v.lang.startsWith('en-GB')) || pool[0];
    };

    const playAudio = (text, gender = 'female') => {
        if (!('speechSynthesis' in window)) return;

        try {
            window.speechSynthesis.cancel();

            // Preprocess text for natural conversational inflection
            let cleanText = (text || '').trim();
            // Create gentle pauses for dashes e.g. "M - I - N - H" -> "M, I, N, H."
            cleanText = cleanText.replace(/\s*-\s*/g, ', ');
            cleanText = cleanText.replace(/\bVSTEP\b/gi, 'Vee step');

            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voice = selectConversationalVoice(gender);

            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang || 'en-US';
            } else {
                utterance.lang = 'en-US';
            }

            // Natural conversational rate and warm human pitch
            utterance.rate = gender === 'female' ? 0.96 : 0.95; // Relaxed conversational pacing
            utterance.pitch = gender === 'female' ? 1.02 : 0.98; // Warm, natural human pitch
            utterance.volume = 1.0;

            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
            }, 20);
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    };
    window.playAudio = playAudio;

    // Toggle logic for Vocabulary
    const vocabBtns = document.querySelectorAll('.vocab-btn');
    vocabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const meaning = btn.nextElementSibling;
            if (meaning && meaning.classList.contains('vocab-meaning')) {
                meaning.classList.toggle('hidden');
                if (!meaning.classList.contains('hidden')) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }

                // Add text-to-speech reading for the vocabulary word
                let textToSpeak = btn.innerText.replace(/=/g, ',');
                textToSpeak = textToSpeak.replace(/VSTEP/g, 'Vee step');
                playAudio(textToSpeak, 'female');
            }
        });
    });

    // Logic for new standalone Audio Buttons
    const audioBtns = document.querySelectorAll('.play-audio-btn');
    audioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let textToSpeak = btn.getAttribute('data-text');
            const gender = btn.getAttribute('data-gender') || 'female';
            if (textToSpeak) {
                textToSpeak = textToSpeak.replace(/VSTEP/g, 'Vee step');
                playAudio(textToSpeak, gender);
            }
        });
    });

    // Alphabet Letters click-to-speak logic
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.addEventListener('click', () => {
            const speakText = card.getAttribute('data-speak') || card.getAttribute('data-letter');
            
            // Visual active animation
            card.classList.add('playing');
            setTimeout(() => card.classList.remove('playing'), 450);

            if (speakText) {
                playAudio(speakText, 'female');
            }
        });
    });

    // Date Tab Switcher Logic
    window.switchDateTab = function(tab) {
        const btnMonths = document.querySelector('.date-tab-btn:nth-child(1)');
        const btnDays = document.querySelector('.date-tab-btn:nth-child(2)');
        const panelMonths = document.getElementById('panel-months');
        const panelDays = document.getElementById('panel-days');

        if (!panelMonths || !panelDays) return;

        if (tab === 'months') {
            btnMonths?.classList.add('active');
            btnDays?.classList.remove('active');
            panelMonths.classList.remove('hidden');
            panelDays.classList.add('hidden');
        } else {
            btnDays?.classList.add('active');
            btnMonths?.classList.remove('active');
            panelDays.classList.remove('hidden');
            panelMonths.classList.add('hidden');
        }
    };

    // Date & Month Cards click-to-speak logic
    const dateCards = document.querySelectorAll('.month-card, .day-card');
    dateCards.forEach(card => {
        card.addEventListener('click', () => {
            const speakText = card.getAttribute('data-speak');
            
            // Visual active animation
            card.classList.add('playing');
            setTimeout(() => card.classList.remove('playing'), 450);

            if (speakText) {
                playAudio(speakText, 'female');
            }
        });
    });

    // Handle Form Logic for Self Introduction
    const statusSelect = document.getElementById('in-status');
    const groupUni = document.getElementById('group-uni');
    const groupJob = document.getElementById('group-job');

    statusSelect.addEventListener('change', (e) => {
        if (e.target.value === 'student') {
            groupUni.classList.remove('hidden');
            groupJob.classList.add('hidden');
        } else {
            groupUni.classList.add('hidden');
            groupJob.classList.remove('hidden');
        }
    });
});

async function translateText(text) {
    if (!text || text === '[...]') return text;
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        let translated = '';
        data[0].forEach(part => { translated += part[0]; });
        return translated; 
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}

// Helper to keep proper nouns capitalized but lowercase general actions if needed
async function translateLower(text) {
    const t = await translateText(text);
    if (t === '[...]') return t;
    // We only lowercase the first letter if it's likely a verb phrase, but for safety with acronyms,
    // let's just return the raw translation since Google Translate handles casing well.
    return t;
}

async function translateKeepCase(text) {
    const t = await translateText(text);
    return t;
}

// Self Intro Generation Logic
async function generateIntro() {
    const btn = document.querySelector('.btn-generate');
    const originalBtnText = btn.innerText;
    btn.innerText = "Generating & Translating... ⏳";
    btn.disabled = true;

    try {
        const name = document.getElementById('in-name').value || '[...]';
        const age = document.getElementById('in-age').value || '[...]';
        const city = document.getElementById('in-city').value || '[...]';
        const status = document.getElementById('in-status').value;
        const hobbies = document.getElementById('in-hobbies').value || '[...]';
        const goal = document.getElementById('in-goal').value || '[...]';

        // Translate inputs
        const tCity = await translateKeepCase(city);
        const tHobbies = await translateLower(hobbies);
        const tGoal = await translateLower(goal);

        let viCityStr = `tỉnh/thành phố [...]`;
        if (city !== '[...]') {
            viCityStr = tCity.toLowerCase().includes("tỉnh") || tCity.toLowerCase().includes("thành phố") ? tCity : `tỉnh/thành phố ${tCity}`;
        }

        let intro = `
            <p><strong>Hello everyone!</strong> <br><span class="vi-sub">Xin chào tất cả mọi người!</span></p>
            <p><strong>Let me introduce myself.</strong> <br><span class="vi-sub">Hãy để tôi giới thiệu bản thân mình nhé.</span></p>
            <p><strong>Firstly, my name is ${name}.</strong> <br><span class="vi-sub">Đầu tiên thì, tên của tôi là ${name}.</span></p>
            <p><strong>I am ${age} years old.</strong> <br><span class="vi-sub">Tôi ${age} tuổi rồi.</span></p>
            <p><strong>I come from ${city}.</strong> <br><span class="vi-sub">Tôi đến từ ${viCityStr}.</span></p>
        `;
        
        if (status === 'student') {
            const uni = document.getElementById('in-uni').value || '[...]';
            const tUni = await translateKeepCase(uni);
            intro += `<p><strong>About my studies, I am a student at ${uni}.</strong> <br><span class="vi-sub">Về học vấn của tôi, tôi là sinh viên tại ${tUni}.</span></p>`;
        } else {
            const job = document.getElementById('in-job').value || '[...]';
            const company = document.getElementById('in-company').value || '[...]';
            const tJob = await translateLower(job);
            const tCompany = await translateKeepCase(company);
            intro += `<p><strong>About my work, I am ${job} at ${company}.</strong> <br><span class="vi-sub">Về công việc của tôi, tôi đang là ${tJob} tại ${tCompany}.</span></p>`;
        }

        intro += `<p><strong>As for my hobbies, I like ${hobbies}.</strong> <br><span class="vi-sub">Về sở thích của tôi, tôi thích ${tHobbies}.</span></p>`;
        intro += `<p><strong>Finally, after this course, I hope to ${goal}.</strong> <br><span class="vi-sub">Cuối cùng thì, sau khoá học này, tôi mong mình có thể ${tGoal}.</span></p>`;
        intro += `<p><strong>Thank you for listening!</strong> <br><span class="vi-sub">Cảm ơn các bạn đã lắng nghe!</span></p>`;

        document.getElementById('intro-result').innerHTML = intro;
        document.getElementById('result-box').classList.remove('hidden');
    } finally {
        btn.innerText = originalBtnText;
        btn.disabled = false;
    }
}

function copyText() {
    const textToCopy = document.getElementById('intro-result').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.innerText;
        btn.innerText = 'Copied! 🎉';
        btn.style.background = 'var(--color-section)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--color-section)';
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = 'white';
            btn.style.color = 'var(--color-title)';
            btn.style.borderColor = 'var(--color-title)';
        }, 2000);
    });
}
