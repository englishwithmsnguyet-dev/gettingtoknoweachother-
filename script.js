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
                    if (btn.classList.contains('q-btn') && emoji) emoji.textContent = '👇';
                    if (btn.classList.contains('a-btn') && emoji) emoji.textContent = '✨';
                    btn.classList.add('active-toggle');
                } else {
                    if (btn.classList.contains('q-btn') && emoji) emoji.textContent = '❓';
                    if (btn.classList.contains('a-btn') && emoji) emoji.textContent = '💡';
                    btn.classList.remove('active-toggle');
                }
            }
        });
    });

    // =========================================
    // SPEECH SYNTHESIS ENGINE (CHUẨN SPEAKING PART 01 - B1 LEVEL)
    // Giọng đọc tự nhiên, trẻ trung, năng động (Pitch 1.25, Rate 1.0)
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
        window.addEventListener('touchstart', () => {
            if (window.speechSynthesis && (!cachedVoices || cachedVoices.length === 0)) {
                window.speechSynthesis.getVoices();
                updateVoices();
            }
        }, { once: true });
    }

    // Thuật toán tìm giọng đọc AI tự nhiên nhất (High Quality / Neural / Natural / Siri) từ SPEAKING PART 01
    const getBestNaturalVoice = (voices, gender = null) => {
        if (!voices || voices.length === 0) return null;
        let enVoices = voices.filter(v => v.lang && (v.lang.toLowerCase().startsWith('en') || v.lang.toLowerCase().startsWith('us')));
        if (enVoices.length === 0) return null;

        if (gender === 'female') {
            const fVoices = enVoices.filter(v => {
                const n = (v.name || '').toLowerCase();
                return !n.includes('guy') && !n.includes('male') && !n.includes('david') && !n.includes('george');
            });
            if (fVoices.length > 0) enVoices = fVoices;
        } else if (gender === 'male') {
            const mVoices = enVoices.filter(v => {
                const n = (v.name || '').toLowerCase();
                return !n.includes('female') && !n.includes('jenny') && !n.includes('aria') && !n.includes('samantha') && !n.includes('zira');
            });
            if (mVoices.length > 0) enVoices = mVoices;
        }

        // 1. Ưu tiên cao nhất: Các giọng Neural / Natural / Premium / Enhanced / Siri (Chất lượng phòng thu / người thật)
        const premiumKeywords = ['natural', 'premium', 'enhanced', 'neural', 'siri'];
        for (const kw of premiumKeywords) {
            const match = enVoices.find(v => (v.name && v.name.toLowerCase().includes(kw)) || (v.voiceURI && v.voiceURI.toLowerCase().includes(kw)));
            if (match) return match;
        }

        // 2. Trên iOS (iPhone/iPad): Ưu tiên các giọng hiện đại chất lượng cao của Apple
        const appleModernNames = ['ava', 'evan', 'allison', 'zoe', 'nathan', 'oliver', 'tom', 'nicky', 'daniel', 'serena'];
        for (const name of appleModernNames) {
            const match = enVoices.find(v => v.name && v.name.toLowerCase().includes(name));
            if (match) return match;
        }

        // 3. Trên PC (Microsoft Edge, Windows, Chrome Desktop)
        const pcModernNames = ['guy', 'jenny', 'aria', 'google us english', 'google uk english female'];
        for (const name of pcModernNames) {
            const match = enVoices.find(v => v.name && v.name.toLowerCase().includes(name));
            if (match) return match;
        }

        // 4. Trên Android (Google Speech Services): Ưu tiên giọng network (WaveNet)
        const networkVoice = enVoices.find(v => (v.voiceURI && v.voiceURI.includes('network')) || (v.name && v.name.toLowerCase().includes('network')));
        if (networkVoice) return networkVoice;

        // 5. Lọc bỏ các giọng tổng hợp máy móc cổ điển (Alex, Samantha standard) nếu có giọng khác
        const nonRobotic = enVoices.filter(v => {
            const n = (v.name || '').toLowerCase();
            return !n.includes('alex') && !n.includes('samantha') && !n.includes('fred') && !n.includes('victoria');
        });
        if (nonRobotic.length > 0) {
            return nonRobotic.find(v => v.lang.includes('US') || v.lang.includes('en-US')) || nonRobotic[0];
        }

        return enVoices[0];
    };

    // Hàm phát âm chuẩn Speaking Part 01
    const playAudio = (text, gender = 'female') => {
        if (!('speechSynthesis' in window)) return;

        try {
            if (window._currentAudio) {
                window._currentAudio.pause();
                window._currentAudio.currentTime = 0;
            }
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
            window.speechSynthesis.cancel();

            let cleanTxt = (text || '').replace(/<[^>]*>/g, '').replace(/^→\s*/, '').replace(/[\r\n]+/g, ' ').trim();
            cleanTxt = cleanTxt.replace(/\s*-\s*/g, ', ');
            cleanTxt = cleanTxt.replace(/\bVSTEP\b/gi, 'Vee step');
            if (!cleanTxt) return;

            const utt = new SpeechSynthesisUtterance(cleanTxt);
            const voices = (window.speechSynthesis.getVoices() && window.speechSynthesis.getVoices().length > 0) 
                ? window.speechSynthesis.getVoices() 
                : cachedVoices;

            let bestVoice = null;

            // Danh sách giọng ưu tiên chuẩn SPEAKING PART 01
            const preferredNames = gender === 'female' ? [
                "Microsoft Jenny",
                "Google UK English Female",
                "Google US English Female",
                "Ava",
                "Samantha",
                "Google US English",
                "Serena"
            ] : [
                "Microsoft Guy",
                "Google UK English Male",
                "Google US English Male",
                "Alex",
                "Daniel",
                "Google US English",
                "Samantha"
            ];

            for (let name of preferredNames) {
                bestVoice = voices.find(v => v.name && v.name.toLowerCase().includes(name.toLowerCase()));
                if (bestVoice) break;
            }

            if (!bestVoice) {
                bestVoice = getBestNaturalVoice(voices, gender);
            }

            if (!bestVoice) {
                bestVoice = voices.find(v => v.lang && (v.lang.startsWith("en-US") || v.lang.startsWith("en-GB")));
            }
            if (!bestVoice) {
                bestVoice = voices[0];
            }

            if (bestVoice) {
                utt.voice = bestVoice;
                utt.lang = bestVoice.lang;
            } else {
                utt.lang = 'en-US';
            }

            // Thiết lập tốc độ & cao độ chuẩn SPEAKING PART 01: Rate 1.0, Pitch 1.25 (sáng, trẻ trung, năng động)
            utt.rate = 1.0;
            utt.pitch = 1.25;

            setTimeout(() => {
                window.speechSynthesis.speak(utt);
                if (window.speechSynthesis.paused) {
                    window.speechSynthesis.resume();
                }
            }, 10);
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    };
    window.playAudio = playAudio;
    window.speakText = playAudio;

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

    // Alphabet Letters click-to-speak & append to name speller
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.addEventListener('click', () => {
            const letter = card.getAttribute('data-letter');
            const speakText = card.getAttribute('data-speak') || letter;
            
            // Visual active animation
            card.classList.add('playing');
            setTimeout(() => card.classList.remove('playing'), 450);

            if (speakText) {
                playAudio(speakText, 'female');
            }

            // Append letter to Name Speller workbench
            if (spellerInput && letter) {
                if (spellerInput.value.length < 25) {
                    spellerInput.value += letter;
                    renderSpellerTiles();

                    // Scroll tiles into view if needed
                    const lastTile = spellerTilesList?.lastElementChild;
                    if (lastTile) {
                        lastTile.classList.add('speaking-active');
                        setTimeout(() => lastTile.classList.remove('speaking-active'), 350);
                    }
                }
            }
        });
    });

    // =========================================
    // SPELL YOUR NAME WORKBENCH LOGIC
    // =========================================
    const spellerInput = document.getElementById('name-speller-input');
    const spellerTilesList = document.getElementById('speller-tiles-list');
    const tilesEmptyMsg = document.getElementById('tiles-empty-msg');
    const btnClearSpeller = document.getElementById('btn-clear-speller');
    const btnResetSpeller = document.getElementById('btn-reset-speller');
    const btnSpellLetters = document.getElementById('btn-spell-letters');
    const btnFetchMyName = document.getElementById('btn-fetch-my-name');
    const sampleChips = document.querySelectorAll('.sample-chip');

    const letterPronounceMap = {
        'A': 'ay', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E',
        'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
        'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O',
        'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
        'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
    };

    function removeVietnameseTones(str) {
        if (!str) return '';
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/Đ/g, "D");
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    let isSpellingActive = false;

    const renderSpellerTiles = () => {
        if (!spellerInput || !spellerTilesList) return;
        const raw = spellerInput.value || '';
        const cleanLetters = removeVietnameseTones(raw).toUpperCase().replace(/[^A-Z]/g, '').split('');

        spellerTilesList.innerHTML = '';
        if (cleanLetters.length === 0) {
            if (tilesEmptyMsg) tilesEmptyMsg.style.display = 'block';
        } else {
            if (tilesEmptyMsg) tilesEmptyMsg.style.display = 'none';
            cleanLetters.forEach((char, idx) => {
                const tile = document.createElement('div');
                tile.className = 'speller-tile';
                tile.setAttribute('data-letter', char);
                tile.setAttribute('data-index', idx);
                tile.title = `Chữ cái ${char} - Bấm để nghe phát âm`;

                tile.innerHTML = `
                    <span class="tile-index">${idx + 1}</span>
                    <span class="tile-char">${char}</span>
                    <button type="button" class="tile-remove-btn" title="Xóa chữ này">✕</button>
                `;

                // Click tile to hear letter
                tile.addEventListener('click', (e) => {
                    if (e.target.classList.contains('tile-remove-btn')) return;
                    tile.classList.add('speaking-active');
                    setTimeout(() => tile.classList.remove('speaking-active'), 450);
                    playAudio(letterPronounceMap[char] || char, 'female');
                });

                // Remove single letter
                const removeBtn = tile.querySelector('.tile-remove-btn');
                if (removeBtn) {
                    removeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        cleanLetters.splice(idx, 1);
                        spellerInput.value = cleanLetters.join('');
                        renderSpellerTiles();
                    });
                }

                spellerTilesList.appendChild(tile);
            });
        }
    };

    if (spellerInput) {
        spellerInput.addEventListener('input', (e) => {
            e.target.value = removeVietnameseTones(e.target.value).toUpperCase().replace(/[^A-Z]/g, '');
            renderSpellerTiles();
        });
    }

    if (btnClearSpeller) {
        btnClearSpeller.addEventListener('click', () => {
            if (spellerInput) spellerInput.value = '';
            renderSpellerTiles();
            spellerInput?.focus();
        });
    }

    if (btnResetSpeller) {
        btnResetSpeller.addEventListener('click', () => {
            if (spellerInput) spellerInput.value = '';
            renderSpellerTiles();
            spellerInput?.focus();
        });
    }

    // Quick sample chips
    sampleChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const name = chip.getAttribute('data-name');
            if (spellerInput && name) {
                spellerInput.value = name;
                renderSpellerTiles();
            }
        });
    });

    // Helper: Fetch Student Name from session
    const getStudentFirstName = () => {
        const stored = sessionStorage.getItem('studentName') || document.getElementById('display-name')?.innerText || '';
        if (stored) {
            // E.g. "Phạm Minh Nguyệt - ONB103" -> "Phạm Minh Nguyệt"
            const namePart = stored.split('-')[0].trim();
            const words = namePart.split(/\s+/).filter(Boolean);
            if (words.length > 0) {
                const firstName = words[words.length - 1]; // Tên gọi (last word in VN full name)
                return removeVietnameseTones(firstName).toUpperCase().replace(/[^A-Z]/g, '');
            }
        }
        return '';
    };

    if (btnFetchMyName) {
        btnFetchMyName.addEventListener('click', () => {
            const name = getStudentFirstName();
            if (name) {
                if (spellerInput) spellerInput.value = name;
                renderSpellerTiles();
                // Visual feedback
                btnFetchMyName.style.background = '#22c55e';
                btnFetchMyName.style.color = '#ffffff';
                btnFetchMyName.style.borderColor = '#22c55e';
                btnFetchMyName.innerHTML = `<span>✓</span> Đã lấy: ${name}`;
                setTimeout(() => {
                    btnFetchMyName.style.background = '';
                    btnFetchMyName.style.color = '';
                    btnFetchMyName.style.borderColor = '';
                    btnFetchMyName.innerHTML = `<span>🎓</span> Lấy tên của tôi`;
                }, 1500);
            } else {
                const manual = prompt('Chưa có thông tin tên trong phiên học. Vui lòng nhập tên của bạn để ghép:', 'NGUYET');
                if (manual && spellerInput) {
                    spellerInput.value = removeVietnameseTones(manual).toUpperCase().replace(/[^A-Z]/g, '');
                    renderSpellerTiles();
                }
            }
        });
    }

    // Auto-fetch student name on load if available
    setTimeout(() => {
        const autoName = getStudentFirstName();
        if (autoName && spellerInput && !spellerInput.value) {
            spellerInput.value = autoName;
            renderSpellerTiles();
        }
    }, 350);

    // Spell It Out (Đánh vần từng chữ một có highlight nhịp điệu)
    if (btnSpellLetters) {
        btnSpellLetters.addEventListener('click', async () => {
            if (isSpellingActive) return;
            const letters = (spellerInput?.value || '').replace(/[^A-Z]/g, '').split('');
            if (letters.length === 0) {
                const box = document.getElementById('speller-tiles-box');
                if (box) {
                    box.style.borderColor = '#ef4444';
                    box.style.backgroundColor = '#fef2f2';
                    setTimeout(() => {
                        box.style.borderColor = '';
                        box.style.backgroundColor = '';
                    }, 800);
                }
                spellerInput?.focus();
                return;
            }

            isSpellingActive = true;
            btnSpellLetters.disabled = true;
            const originalHtml = btnSpellLetters.innerHTML;
            btnSpellLetters.innerHTML = `<span class="action-icon">⏳</span><div class="action-text"><strong>Đang đánh vần...</strong><span>(Listening)</span></div>`;

            const tiles = spellerTilesList.querySelectorAll('.speller-tile');

            for (let i = 0; i < letters.length; i++) {
                const char = letters[i];
                const tile = tiles[i];

                if (tile) {
                    tile.classList.add('speaking-active');
                    tile.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }

                playAudio(letterPronounceMap[char] || char, 'female');

                // Wait for speech rhythm
                await new Promise(r => setTimeout(r, 760));

                if (tile) {
                    tile.classList.remove('speaking-active');
                }
                await new Promise(r => setTimeout(r, 120));
            }

            // Highlight all tiles on finish
            tiles.forEach(t => t.classList.add('spell-finished'));

            setTimeout(() => {
                tiles.forEach(t => t.classList.remove('spell-finished'));
                btnSpellLetters.disabled = false;
                btnSpellLetters.innerHTML = originalHtml;
                isSpellingActive = false;
            }, 1000);
        });
    }

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
