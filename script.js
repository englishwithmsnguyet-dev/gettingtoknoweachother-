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

    const CLASS_STUDENTS = {
        "ONB103": [
            "Nguyễn Thị Duy", "Phạm Trần Mỹ Hân", "Trịnh Thị Thu Hiền", "Nguyễn Hoàng Kha",
            "Phạm Thị Út Lua", "Lê Huỳnh Diễm My", "Nguyễn Thị Ngọc Mỹ", "Huỳnh Thị Kim Ngân",
            "Trần Thị Kim Ngân", "Nguyễn Thị Tiểu Phụng", "Trần Yến Phụng", "Phạm Ngọc Thạch",
            "Cao Thị Thu Trang", "Nguyễn Thị Thanh Tuyền", "Trần Phạm Phương Uyên", "Trần Ngô Mỹ Vy"
        ],
        "CB210": [
            "Nguyễn Võ Thành Đạt", "Lê Huỳnh Thanh Duy", "Nguyễn Cao Kỳ Duyên", "Đào Ngọc Hân", 
            "Trần Văn Hữu", "Trần Văn Kim Khoa", "Nguyễn Thanh Nâng", "Huỳnh Kỳ Nguyên", 
            "Võ Thị Kim Nguyên", "Võ Hùng Sanh", "Trần Thị Thanh Thảo", "Đặng Thị Kim Thoa", 
            "Trần Thị Tiên Tiên", "Lê Kim Tuyền"
        ],
        "CB211": [
            "Hồ Anh Quân", "Lê Thành Nghiệp", "Lê Khánh Lâm", "Huỳnh Thị Ngọc Thắm", 
            "Mai Trần Xuân Mai", "Lê Thị Uyển Nhi", "Nguyễn Thụy Thanh Trúc"
        ],
        "CB213": [
            "Nguyễn Quốc Anh", "Hoàng Hợp Minh Châu", "Đặng Châu Gia Huy", "Trần Minh Tuệ Mẩn", 
            "Đặng Thị Trúc Măng", "Trương Thị Kha My", "Ngô Diễm My", "Chiêm Chúc Ngân", 
            "Huỳnh Thị Yến Nhi", "Phạm Nguyễn Tâm Như", "Phạm Nhựt Tiến", "Lê Thị Tú Trinh", 
            "Trần Ngọc Vinh"
        ],
        "B212": [
            "Nguyễn Duy Hồng Anh", "Nguyễn Ngọc Minh Anh", "Nguyễn Lê Mỹ Hân", "Nguyễn Hồng Minh Huy",
            "Nguyễn Quốc Khải", "Đoàn Nguyễn Đình Khang", "Lê Nguyễn Gia Khánh", "Nguyễn Hữu Khánh", 
            "Hồ Thị Ngọc Lan", "Trần Thị Hồng Lỉnh", "Võ Thị Triệu Minh", "Hứa Đình Nghi", 
            "Võ Thị Bảo Ngọc", "Lê Tiến Phát", "Nguyễn Hoàng Thông", "Nguyễn Kim Tiền", 
            "Lê Thị Bảo Trân", "Võ Thị Diễm Trinh", "Nguyễn Tấn Trung", "Nguyễn Tiến Trung", 
            "Trần Thị Ánh Tuyết", "Đặng Nguyễn Khánh Uyên", "Nguyễn Thị Chúc Yến"
        ],
        "CB219": [
            "Lưu Thị Vân Anh", "Nguyễn Tuấn Anh", "Trần Thị Huỳnh Duy", "Duy Thị Huỳnh Hân",
            "Trần Thị Xuân Hoa", "Nguyễn Phạm Khang", "Đặng Văn Khánh", "Chim Nhật Luân",
            "Lư Vĩnh Phúc", "Nguyễn Chí Thiện", "Trần Thị Ngọc Thơ", "Huỳnh Yến Trang",
            "Thị Thu Trinh", "Nguyễn Thị Mỹ Xuyên", "Nguyễn Như Ý"
        ]
    };

    const allowedClasses = ['CB211', 'CB213', 'ONB103', 'B212', 'CB219', 'CB210'];
    const teacherClasses = ['2026', 'GV', 'GV2026', 'ADMIN', 'TEACHER'];

    const normalizeStr = (str) => {
        return (str || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    };

    // Luôn luôn hiển thị modal đăng nhập mỗi khi tải lại trang / refresh
    if (nameModal) {
        nameModal.classList.remove('hidden');
        nameModal.style.display = 'flex';
        nameModal.style.opacity = '1';
    }
    if (nameDisplay) {
        nameDisplay.classList.add('hidden');
        nameDisplay.style.cursor = 'pointer';
        nameDisplay.title = 'Bấm để đổi học viên / lớp';
        nameDisplay.addEventListener('click', () => {
            nameModal.classList.remove('hidden');
            nameModal.style.display = 'flex';
            setTimeout(() => {
                nameModal.style.opacity = '1';
                nameInput && nameInput.focus();
            }, 10);
        });
    }
    if (nameInput) {
        nameInput.value = '';
        nameInput.addEventListener('input', () => {
            nameInput.style.borderColor = '';
            classError.style.display = 'none';
        });
        setTimeout(() => nameInput.focus(), 150);
    }
    if (classInput) {
        classInput.value = '';
        classInput.addEventListener('input', () => {
            classInput.style.borderColor = '';
            classError.style.display = 'none';
        });
    }
    if (classError) classError.style.display = 'none';

    const startLesson = () => {
        const rawName = nameInput.value.trim();
        const rawClass = classInput ? classInput.value.trim() : '';
        
        // Reset styles and error
        nameInput.style.borderColor = '';
        if (classInput) classInput.style.borderColor = '';
        classError.style.display = 'none';

        if (!rawName && !rawClass) {
            nameInput.style.borderColor = '#ef4444';
            if (classInput) classInput.style.borderColor = '#ef4444';
            classError.textContent = 'Vui lòng nhập đầy đủ Họ tên và Lớp học!';
            classError.style.display = 'block';
            nameInput.focus();
            return;
        }

        if (!rawName) {
            nameInput.style.borderColor = '#ef4444';
            classError.textContent = 'Vui lòng nhập Họ và tên!';
            classError.style.display = 'block';
            nameInput.focus();
            return;
        }

        if (!rawClass) {
            if (classInput) {
                classInput.style.borderColor = '#ef4444';
                classInput.focus();
            }
            classError.textContent = 'Vui lòng nhập Lớp học!';
            classError.style.display = 'block';
            return;
        }

        const studentClass = rawClass.toUpperCase().replace(/\s+/g, '');
        const normName = normalizeStr(rawName);

        // Check Teacher access
        const isTeacher = teacherClasses.includes(studentClass) ||
                          normName.includes('ptmn') || 
                          normName.includes('co nguyet') || 
                          normName.includes('minh nguyet') || 
                          normName.includes('ms nguyet') || 
                          normName.includes('pham thi minh nguyet') ||
                          normName === 'nguyet';

        let finalName = rawName;

        if (isTeacher) {
            finalName = 'Cô Nguyệt';
        } else if (allowedClasses.includes(studentClass)) {
            // Strict check against class student roster
            const roster = CLASS_STUDENTS[studentClass] || [];
            const matchedStudent = roster.find(s => normalizeStr(s) === normName);
            if (!matchedStudent) {
                classError.textContent = `Họ và tên không thuộc danh sách học viên lớp ${studentClass}. Vui lòng kiểm tra lại!`;
                classError.style.display = 'block';
                nameInput.style.borderColor = '#ef4444';
                nameInput.focus();
                return;
            }
            finalName = matchedStudent;
        } else {
            classError.textContent = 'Mã lớp không hợp lệ. Vui lòng kiểm tra lại!';
            classError.style.display = 'block';
            if (classInput) {
                classInput.style.borderColor = '#ef4444';
                classInput.focus();
            }
            return;
        }

        classError.style.display = 'none';
        const fullNameClass = finalName + ' - ' + studentClass;
        sessionStorage.setItem('studentName', fullNameClass);
        displayName.textContent = fullNameClass;
        nameDisplay.classList.remove('hidden');

        if (startBtn) {
            startBtn.disabled = true;
            startBtn.innerHTML = '<span>ĐANG VÀO LỚP...</span>';
        }

        // Send data to Google Form quietly in the background
        const trackingForm = document.getElementById('tracking-form');
        const entryInput = document.getElementById('entry_388968236');
        if (entryInput) entryInput.value = fullNameClass;
        if (trackingForm) {
            try { trackingForm.submit(); } catch(e) {}
        }

        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd9g4rE9j1urSd8CrJ6hRcigrpklwxgzO8KgGJy8zXYAifGeA/formResponse";
        const formData = new FormData();
        formData.append("entry.388968236", fullNameClass); // "What's your full name?" field
        
        fetch(formUrl, {
            method: "POST",
            mode: "no-cors",
            body: formData
        }).catch(err => console.error("Error logging student:", err));

        nameModal.style.opacity = '0';
        setTimeout(() => {
            nameModal.classList.add('hidden');
            nameModal.style.display = 'none';
            if (startBtn) {
                startBtn.disabled = false;
                startBtn.innerHTML = 'BẮT ĐẦU HỌC NGAY';
            }
        }, 300);
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

    // Initialize Interactive Speaking Challenges across Sections 1 to 7
    initInteractivePractice();
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

// ==========================================================================
// INTERACTIVE SPEAKING PRACTICE & INTELLIGENT FEEDBACK ENGINE
// ==========================================================================
const PRACTICE_CONFIGS = {
    name: {
        sectionTitle: "1. NAME",
        questions: [
            {
                id: "q_name_full",
                shortLabel: "1. Tên đầy đủ",
                question: "What's your full name?",
                questionVi: "Tên đầy đủ của bạn là gì?",
                hints: ["My full name is [Họ và tên]", "My name is [Tên]", "You can call me [Tên thường gọi]"],
                modelAnswer: "My full name is Nguyen Van An. You can call me An.",
                modelAnswerVi: "Tên đầy đủ của tôi là Nguyễn Văn An. Bạn có thể gọi tôi là An.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasIntro = /(my (full\s+)?name|my phone name|i am|i'm|call me|you can call me|name's|is\s+[a-z]+)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu giới thiệu tên (My full name is... / I'm... / You can call me...)",
                        passed: hasIntro,
                        tip: "Hãy dùng mẫu câu: 'My full name is [Họ và tên]' hoặc 'My name is [Tên]'"
                    });
                    const wordsCount = transcript.trim().split(/\s+/).filter(Boolean).length;
                    checks.push({
                        label: "Nói trọn vẹn cả câu (đầy đủ chủ ngữ và tên gọi)",
                        passed: wordsCount >= 2,
                        tip: "Nên nói cả câu hoàn chỉnh thay vì chỉ đọc mỗi tên riêng"
                    });
                    return checks;
                },
                keyPatterns: [/my (full\s+)?name is/i, /i am|i'm/i, /you can call me/i, /my name/i]
            },
            {
                id: "q_name_spell",
                shortLabel: "2. Đánh vần tên",
                question: "How do you spell your first name?",
                questionVi: "Bạn đánh vần tên như thế nào?",
                hints: ["It is spelled [Các chữ cái]", "It's [Từng chữ cái]", "M - I - N - H"],
                modelAnswer: "It is spelled A - N.",
                modelAnswerVi: "Tên tôi được đánh vần là A - N.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasSpellKeyword = /(spell|spelled|spelling|it's|it is|that's|is)/i.test(combined) || /[a-z]\s+[a-z]/i.test(transcript) || /[a-z]-[a-z]/i.test(transcript);
                    checks.push({
                        label: "Đánh vần từng chữ cái (It is spelled [Letters])",
                        passed: hasSpellKeyword,
                        tip: "Ví dụ: 'It is spelled A - N' hoặc phát âm từng chữ cái cách nhau"
                    });
                    const lettersCount = (transcript.match(/[a-zA-Z]/g) || []).length;
                    checks.push({
                        label: "Phát âm rõ ràng các chữ cái trong tên",
                        passed: lettersCount >= 2,
                        tip: "Hãy phát âm to và dứt khoát từng chữ cái tiếng Anh"
                    });
                    return checks;
                },
                keyPatterns: [/it is spelled/i, /it's spelled/i, /spelled/i, /[a-z]\s+[a-z]/i]
            },
            {
                id: "q_name_nick",
                shortLabel: "3. Biệt danh (Nickname)",
                question: "Do you have a nickname?",
                questionVi: "Bạn có biệt danh / tên gọi ở nhà không?",
                hints: ["Yes, you can call me [Nickname]", "My nickname is [Nickname]", "No, I don't have a nickname"],
                modelAnswer: "Yes, you can call me Moon. My nickname is Moon.",
                modelAnswerVi: "Vâng, bạn có thể gọi tôi là Moon. Biệt danh của tôi là Moon.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasAnswer = /(yes|no|nickname|call me|don't have|do not have|haven't|my nickname)/i.test(combined);
                    checks.push({
                        label: "Trả lời rõ ràng có hoặc không có nickname",
                        passed: hasAnswer,
                        tip: "Dùng: 'Yes, my nickname is...' hoặc 'No, I don't have a nickname'"
                    });
                    const hasComplete = transcript.trim().split(/\s+/).filter(Boolean).length >= 1;
                    checks.push({
                        label: "Diễn đạt câu tự nhiên, rõ ý",
                        passed: hasComplete,
                        tip: "Ví dụ: 'Yes, you can call me Moon' hoặc 'No, I don't have a nickname'"
                    });
                    return checks;
                },
                keyPatterns: [/my nickname is/i, /you can call me/i, /i don't have/i, /no/i, /yes/i]
            }
        ]
    },
    age: {
        sectionTitle: "2. AGE & BIRTHDAY",
        questions: [
            {
                id: "q_age_howold",
                shortLabel: "1. Hỏi tuổi (How old?)",
                question: "How old are you?",
                questionVi: "Bạn bao nhiêu tuổi?",
                hints: ["I'm [Số tuổi] years old", "I am 22 years old", "I'm in my early twenties"],
                modelAnswer: "I'm 22 years old. I'm in my early twenties.",
                modelAnswerVi: "Tôi 22 tuổi. Tôi ở độ tuổi đầu 20.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasAgeNumber = /(\b\d{1,2}\b|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|twenties|thirties|forties)/i.test(combined);
                    checks.push({
                        label: "Nêu rõ số tuổi chính xác hoặc khoảng tuổi",
                        passed: hasAgeNumber,
                        tip: "Hãy nói số tuổi (ví dụ: '22', 'twenty-two', hoặc 'in my early twenties')"
                    });
                    const hasAgeStructure = /(i am|i'm|years old|year old|in my|my age|\b\d{2}\b)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu đúng cấu trúc (I'm ... years old / I'm in my...)",
                        passed: hasAgeStructure,
                        tip: "Hãy bắt đầu bằng: 'I am [Số tuổi] years old' hoặc 'I'm in my...'"
                    });
                    return checks;
                },
                keyPatterns: [/i am|i'm/i, /\b\d{1,2}\b/i, /twenty|thirty|forty/i, /years old/i, /in my (early|mid|late)?\s*(twenties|thirties)/i]
            },
            {
                id: "q_age_birthday",
                shortLabel: "2. Ngày sinh nhật",
                question: "When's your birthday?",
                questionVi: "Ngày sinh nhật của bạn là khi nào?",
                hints: ["My birthday is on the [Ngày] of [Tháng]", "It's on [Tháng] [Ngày]"],
                modelAnswer: "My birthday is on the fifth of October.",
                modelAnswerVi: "Sinh nhật của tôi là vào ngày 5 tháng 10.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasMonthOrDate = /(january|february|march|april|may|june|july|august|september|october|november|december|\b1st\b|\b2nd\b|\b3rd\b|\b\d{1,2}(th)?\b|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth)/i.test(combined);
                    checks.push({
                        label: "Nêu tháng sinh hoặc ngày sinh nhật",
                        passed: hasMonthOrDate,
                        tip: "Nhớ dùng tên tháng tiếng Anh: January, February, March... October..."
                    });
                    const hasBirthdayPhrase = /(birthday|on the|it's on|is on|on|in)/i.test(combined);
                    checks.push({
                        label: "Cấu trúc giới từ ngày sinh (on the [Ngày] of [Tháng])",
                        passed: hasBirthdayPhrase,
                        tip: "Dùng: 'My birthday is on the 5th of October' hoặc 'It's on October 5th'"
                    });
                    return checks;
                },
                keyPatterns: [/my birthday is on/i, /it's on/i, /on the/i, /january|february|march|april|may|june|july|august|september|october|november|december/i]
            },
            {
                id: "q_age_born",
                shortLabel: "3. Năm sinh (When born?)",
                question: "When were you born?",
                questionVi: "Bạn sinh năm nào (hoặc sinh khi nào)?",
                hints: ["I was born in [Năm sinh]", "I was born in 2002", "I was born on [Ngày tháng năm]"],
                modelAnswer: "I was born in 2002.",
                modelAnswerVi: "Tôi sinh năm 2002.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasBorn = /(born|was born|born in|born on|i was)/i.test(combined);
                    checks.push({
                        label: "Cấu trúc bị động về năm sinh (I was born in...)",
                        passed: hasBorn,
                        tip: "Hãy dùng mẫu câu: 'I was born in [năm]'"
                    });
                    const hasYear = /(\b19\d{2}\b|\b20\d{2}\b|nineteen|two thousand|\d{4})/i.test(combined);
                    checks.push({
                        label: "Nêu rõ năm sinh",
                        passed: hasYear,
                        tip: "Ví dụ: 'in 2002' (two thousand and two) hoặc 'in 1999'"
                    });
                    return checks;
                },
                keyPatterns: [/i was born in/i, /born in/i, /born on/i, /\b19\d{2}\b|\b20\d{2}\b/i]
            }
        ]
    },
    hometown: {
        sectionTitle: "3. HOMETOWN",
        questions: [
            {
                id: "q_home_from",
                shortLabel: "1. Quê quán (Where from?)",
                question: "Where are you from?",
                questionVi: "Quê bạn ở đâu?",
                hints: ["I'm from [Tỉnh/Thành phố] City/Province", "I come from [Tỉnh/Thành phố]"],
                modelAnswer: "I'm from Can Tho City.",
                modelAnswerVi: "Tôi đến từ thành phố Cần Thơ.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasFrom = /(i am from|i'm from|come from|originally from|born and raised|from)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu quê quán (I'm from / I come from...)",
                        passed: hasFrom,
                        tip: "Dùng mẫu câu: 'I'm from [địa danh] City/Province'"
                    });
                    const hasPlace = transcript.trim().split(/\s+/).filter(Boolean).length >= 2;
                    checks.push({
                        label: "Nêu tên thành phố / tỉnh quê hương",
                        passed: hasPlace,
                        tip: "Nêu rõ tên tỉnh thành: ví dụ 'Can Tho City', 'Ben Tre Province'"
                    });
                    return checks;
                },
                keyPatterns: [/i'm from|i am from/i, /come from/i, /city|province/i]
            },
            {
                id: "q_home_live",
                shortLabel: "2. Nơi ở hiện tại",
                question: "Where do you live now?",
                questionVi: "Hiện tại bạn đang sống ở đâu?",
                hints: ["I live in [Tỉnh/Thành phố]", "Currently, I live in [Nơi ở hiện tại]"],
                modelAnswer: "Currently, I live in Ho Chi Minh City.",
                modelAnswerVi: "Hiện tại, tôi đang sống ở Thành phố Hồ Chí Minh.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasLive = /(live in|living in|stay in|staying in|currently|reside)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu nơi ở hiện tại (I live in... / Currently living in...)",
                        passed: hasLive,
                        tip: "Dùng mẫu câu: 'I live in [nơi ở]' hoặc 'Currently, I live in...'"
                    });
                    const hasCompleteSentence = transcript.trim().split(/\s+/).filter(Boolean).length >= 2;
                    checks.push({
                        label: "Diễn đạt câu trọn vẹn",
                        passed: hasCompleteSentence,
                        tip: "Ví dụ: 'I live in Ho Chi Minh City'"
                    });
                    return checks;
                },
                keyPatterns: [/live in/i, /living in/i, /currently/i, /city|province|district/i]
            }
        ]
    },
    studies: {
        sectionTitle: "4. STUDIES & JOB",
        questions: [
            {
                id: "q_work_or_student",
                shortLabel: "1. Học hay đi làm?",
                question: "Do you work, or are you a student?",
                questionVi: "Bạn đang đi làm hay là sinh viên?",
                hints: ["I'm still a university student", "I work as an accountant", "I graduated from university"],
                modelAnswer: "I'm still a university student.",
                modelAnswerVi: "Tôi hiện vẫn là một sinh viên đại học.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasStatus = /(student|university|college|school|work|working|job|graduated|graduate|accountant|engineer|officer|teacher|nurse|worker|employee|freelance|businessman|businesswoman|staff|assistant|developer|designer|doctor)/i.test(combined);
                    checks.push({
                        label: "Nêu rõ tình trạng (student / working as...)",
                        passed: hasStatus,
                        tip: "Dùng: 'I'm still a student' hoặc 'I'm working as an accountant'"
                    });
                    const hasSentence = /(i am|i'm|i work|i graduated|currently|still)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu đúng cấu trúc",
                        passed: hasSentence,
                        tip: "Bắt đầu bằng 'I am...' hoặc 'I work as...'"
                    });
                    return checks;
                },
                keyPatterns: [/i'm a student|i am a student/i, /i work as/i, /graduated/i, /university|company/i]
            },
            {
                id: "q_where_study_work",
                shortLabel: "2. Nơi học / làm việc",
                question: "Where are you studying or working now?",
                questionVi: "Bạn đang học tập hoặc làm việc ở đâu?",
                hints: ["I'm studying at [Tên trường] University", "I'm currently working at [Tên công ty]"],
                modelAnswer: "I'm currently studying at Can Tho University.",
                modelAnswerVi: "Hiện tôi đang học tại trường Đại học Cần Thơ.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasAction = /(studying|working|study|work|at|university|college|company|office|school|hospital|bank|agency)/i.test(combined);
                    checks.push({
                        label: "Nêu cơ quan/trường học (studying at / working at...)",
                        passed: hasAction,
                        tip: "Dùng: 'I am studying at [tên trường]' hoặc 'I work at [tên công ty]'"
                    });
                    const hasLength = transcript.trim().split(/\s+/).filter(Boolean).length >= 3;
                    checks.push({
                        label: "Nêu tên cụ thể của trường hoặc cơ quan",
                        passed: hasLength,
                        tip: "Ví dụ: 'Can Tho University', 'ABC Company'"
                    });
                    return checks;
                },
                keyPatterns: [/studying at/i, /working at/i, /university|company|hospital|school/i]
            },
            {
                id: "q_major",
                shortLabel: "3. Chuyên ngành (Major)",
                question: "What is your major?",
                questionVi: "Chuyên ngành học của bạn là gì?",
                hints: ["My major is [Tên chuyên ngành]", "I'm majoring in [Chuyên ngành]"],
                modelAnswer: "My major is English Language.",
                modelAnswerVi: "Chuyên ngành của tôi là Ngôn ngữ Anh.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasMajor = /(major|majoring|study|studies|finance|accounting|business|it|english|law|medicine|marketing|economics|engineering|management)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu chuyên ngành (My major is... / I major in...)",
                        passed: hasMajor,
                        tip: "Dùng: 'My major is [tên chuyên ngành]' hoặc 'I'm majoring in...'"
                    });
                    const hasCompleteSentence = transcript.trim().split(/\s+/).filter(Boolean).length >= 2;
                    checks.push({
                        label: "Diễn đạt câu hoàn chỉnh",
                        passed: hasCompleteSentence,
                        tip: "Ví dụ: 'My major is Finance' hoặc 'My major is English'"
                    });
                    return checks;
                },
                keyPatterns: [/my major is/i, /majoring in/i, /i major in/i]
            }
        ]
    },
    family: {
        sectionTitle: "5. FAMILY",
        questions: [
            {
                id: "q_family_members",
                shortLabel: "1. Số lượng thành viên",
                question: "How many people are there in your family?",
                questionVi: "Gia đình bạn có bao nhiêu người?",
                hints: ["There are [Số người] people in my family", "including my parents, my brother, and me"],
                modelAnswer: "There are four people in my family: my parents, my older brother, and me.",
                modelAnswerVi: "Có bốn người trong gia đình tôi: bố mẹ tôi, anh trai tôi và tôi.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasCount = /(there are|\b\d+\b|people|members|two|three|four|five|six|seven|eight|nuclear|extended|small|big)/i.test(combined);
                    checks.push({
                        label: "Nêu số lượng thành viên (There are ... people)",
                        passed: hasCount,
                        tip: "Dùng: 'There are [số lượng] people in my family'"
                    });
                    const hasListing = /(parent|parents|father|mother|dad|mom|brother|sister|only child|me|family)/i.test(combined);
                    checks.push({
                        label: "Kể tên các thành viên (my parents, my brother, and me)",
                        passed: hasListing,
                        tip: "Liệt kê thêm: 'including my parents, my brother, and me'"
                    });
                    return checks;
                },
                keyPatterns: [/there are \w+ people/i, /in my family/i, /parents|brother|sister/i]
            },
            {
                id: "q_family_siblings",
                shortLabel: "2. Anh chị em",
                question: "Do you have any brothers and sisters?",
                questionVi: "Bạn có anh chị em nào không?",
                hints: ["Yes, I have [số lượng] older/younger brother/sister", "No, I'm the only child"],
                modelAnswer: "Yes, I have one older brother. I'm the second child.",
                modelAnswerVi: "Vâng, tôi có một anh trai. Tôi là con thứ hai.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasSiblings = /(yes|no|brother|sister|only child|have|don't have|do not have|older|younger)/i.test(combined);
                    checks.push({
                        label: "Trả lời rõ ràng về anh chị em (Yes/No, brother/sister/only child)",
                        passed: hasSiblings,
                        tip: "Ví dụ: 'Yes, I have one older brother' hoặc 'No, I'm the only child'"
                    });
                    const hasSentence = transcript.trim().split(/\s+/).filter(Boolean).length >= 2;
                    checks.push({
                        label: "Nói thành câu hoàn chỉnh",
                        passed: hasSentence,
                        tip: "Diễn đạt trọn vẹn: 'I have one older brother and one younger sister'"
                    });
                    return checks;
                },
                keyPatterns: [/i have \w+ brother/i, /i have \w+ sister/i, /the only child/i, /older brother/i, /younger sister/i]
            }
        ]
    },
    hobbies: {
        sectionTitle: "6. HOBBIES",
        questions: [
            {
                id: "q_hobbies_what",
                shortLabel: "1. Sở thích (Hobbies)",
                question: "What are your hobbies?",
                questionVi: "Sở thích của bạn là gì?",
                hints: ["My hobbies are [V-ing] and [V-ing]", "My hobby is [V-ing]", "I like [V-ing]"],
                modelAnswer: "My hobbies are reading books and listening to music.",
                modelAnswerVi: "Sở thích của tôi là đọc sách và nghe nhạc.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasHobbyIntro = /(my hobbies are|my hobby is|i like|i love|i enjoy|favorite|interested in)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu sở thích (My hobbies are... / I like...)",
                        passed: hasHobbyIntro,
                        tip: "Bắt đầu bằng: 'My hobbies are...' hoặc 'I like/love...'"
                    });
                    const hasActivities = /(reading|listening|music|books|movies|watching|cooking|travelling|traveling|sports|playing|games|singing|shopping|swimming|yoga|running|football|badminton)/i.test(combined);
                    checks.push({
                        label: "Nêu hoạt động sở thích ở dạng V-ing",
                        passed: hasActivities,
                        tip: "Nhớ dùng dạng V-ing: reading books, listening to music, cooking..."
                    });
                    return checks;
                },
                keyPatterns: [/my hobbies are/i, /my hobby is/i, /i like/i, /i love/i, /reading|listening|cooking|watching/i]
            },
            {
                id: "q_hobbies_freetime",
                shortLabel: "2. Thời gian rảnh (Free time)",
                question: "What do you like doing in your free time?",
                questionVi: "Bạn thích làm gì vào thời gian rảnh rỗi?",
                hints: ["In my free time, I like/love [V-ing]", "I usually [V] in my free time"],
                modelAnswer: "In my free time, I love cooking and hanging out with my friends.",
                modelAnswerVi: "Vào thời gian rảnh, tôi thích nấu ăn và đi chơi với bạn bè.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasFreeTime = /(free time|in my free time|spare time|usually|often|sometimes|when i have time)/i.test(combined);
                    checks.push({
                        label: "Cụm từ thời gian rảnh (In my free time...)",
                        passed: hasFreeTime,
                        tip: "Bắt đầu bằng: 'In my free time, I love...'"
                    });
                    const hasAction = /(like|love|enjoy|cooking|reading|music|walking|friends|hanging out|relax|movie|sleep|games|sports)/i.test(combined);
                    checks.push({
                        label: "Nêu hoạt động thư giãn cụ thể",
                        passed: hasAction,
                        tip: "Kể hoạt động bạn thích làm khi rảnh rỗi"
                    });
                    return checks;
                },
                keyPatterns: [/in my free time/i, /free time/i, /i usually/i, /relax/i]
            }
        ]
    },
    goals: {
        sectionTitle: "7. GOALS",
        questions: [
            {
                id: "q_goals_achieve",
                shortLabel: "1. Mục tiêu khóa học",
                question: "What do you want to achieve after this course?",
                questionVi: "Bạn muốn đạt được điều gì sau khóa học này?",
                hints: ["After this course, I hope to [Mục tiêu]", "improve my English speaking skills", "pass the VSTEP exam and get a B1 certificate"],
                modelAnswer: "After this course, I hope to communicate confidently in English and pass the VSTEP exam.",
                modelAnswerVi: "Sau khóa học này, tôi hy vọng sẽ giao tiếp tiếng Anh tự tin và vượt qua kỳ thi VSTEP.",
                checkCriteria: (transcript, alts = []) => {
                    const texts = [transcript, ...alts].map(t => (t || '').toLowerCase());
                    const combined = texts.join(' ');
                    const checks = [];
                    const hasGoalIntro = /(hope to|want to|plan to|aim to|wish to|after this course|my goal is)/i.test(combined);
                    checks.push({
                        label: "Mẫu câu mục tiêu (After this course, I hope to... / I want to...)",
                        passed: hasGoalIntro,
                        tip: "Dùng: 'After this course, I hope to [mục tiêu]'"
                    });
                    const hasGoalTarget = /(improve|speak|fluently|fluent|confident|confidently|pass|vstep|b1|b2|certificate|skills|exam|job|better|communicate)/i.test(combined);
                    checks.push({
                        label: "Mục tiêu cụ thể (speak fluently, pass VSTEP B1, improve skills...)",
                        passed: hasGoalTarget,
                        tip: "Ví dụ: 'speak English fluently' hoặc 'pass the VSTEP B1 exam'"
                    });
                    return checks;
                },
                keyPatterns: [/after this course/i, /i hope to/i, /i want to/i, /speak english fluently/i, /b1 certificate|vstep/i]
            }
        ]
    }
};

function initInteractivePractice() {
    const panels = document.querySelectorAll('.speaking-practice-panel');
    if (!panels || panels.length === 0) return;

    let activeRecorder = null;
    let activeStream = null;
    let activeRecognition = null;
    let activeTimer = null;
    let activePanel = null;
    let secondsElapsed = 0;
    let currentTranscript = '';
    let candidateAlternatives = [];
    let isStoppingProcess = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    panels.forEach(panel => {
        const sectionId = panel.dataset.section;
        const sectionConfig = PRACTICE_CONFIGS[sectionId];
        if (!sectionConfig || !sectionConfig.questions || sectionConfig.questions.length === 0) return;

        let currentQIndex = 0;

        const selectorContainer = panel.querySelector('.practice-q-selector');
        const qBox = panel.querySelector('.practice-q-box');
        const qTextEl = panel.querySelector('.practice-q-text');
        const qViEl = panel.querySelector('.practice-q-vi');
        const qHintsEl = panel.querySelector('.practice-hints');
        const qAudioBtn = panel.querySelector('.practice-q-audio');
        const recordBtn = panel.querySelector('.practice-record-btn');
        const transcriptEditWrap = panel.querySelector('.transcript-edit-wrap');
        const editToggleBtn = panel.querySelector('.transcript-edit-toggle');
        const editInputRow = panel.querySelector('.transcript-input-row');
        const editInput = panel.querySelector('.transcript-edit-input');
        const reEvalBtn = panel.querySelector('.btn-re-eval');

        // Render Question Selector Chips
        if (selectorContainer) {
            selectorContainer.innerHTML = `
                <span class="selector-label">🎯 Chọn câu hỏi muốn luyện tập:</span>
                <div class="selector-chips"></div>
            `;
            const chipsWrap = selectorContainer.querySelector('.selector-chips');
            sectionConfig.questions.forEach((q, idx) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = `q-chip ${idx === 0 ? 'active' : ''}`;
                chip.innerHTML = `${q.shortLabel} <span style="font-size: 0.85rem;">🔊</span>`;
                chip.addEventListener('click', () => {
                    if (recordBtn.classList.contains('recording')) {
                        stopRecordingSession(panel, sectionId, currentQIndex);
                    }
                    currentQIndex = idx;
                    panel.querySelectorAll('.q-chip').forEach((c, i) => {
                        c.classList.toggle('active', i === idx);
                    });
                    loadQuestionData(panel, sectionConfig.questions[currentQIndex]);
                });
                chipsWrap.appendChild(chip);
            });
        }

        // Load Question Data into DOM
        function loadQuestionData(panelEl, qConfig) {
            if (!qConfig) return;
            if (qTextEl) qTextEl.textContent = `"${qConfig.question}"`;
            if (qViEl) qViEl.innerHTML = `💡 <em>${qConfig.questionVi}</em>`;
            if (qAudioBtn) qAudioBtn.dataset.speak = qConfig.question;

            if (qHintsEl) {
                const hintPills = (qConfig.hints || []).map(h => `<span class="hint-pill">${h}</span>`).join('');
                qHintsEl.innerHTML = `<span class="hint-label">Cấu trúc gợi ý:</span> ${hintPills}`;
            }

            // Reset recording UI
            const transcriptContent = panelEl.querySelector('.transcript-content');
            const wordCountBadge = panelEl.querySelector('.word-count-badge');
            const feedbackCard = panelEl.querySelector('.practice-feedback-card');
            const playbackBox = panelEl.querySelector('.practice-audio-playback');

            if (transcriptContent) {
                transcriptContent.className = 'transcript-content placeholder';
                transcriptContent.textContent = 'Bấm "Bắt đầu ghi âm" và nói câu trả lời của bạn vào micro...';
            }
            if (wordCountBadge) wordCountBadge.textContent = '0 từ';
            if (feedbackCard) {
                feedbackCard.classList.add('hidden');
                feedbackCard.innerHTML = '';
            }
            if (playbackBox) playbackBox.classList.add('hidden');
            if (transcriptEditWrap) transcriptEditWrap.classList.add('hidden');
            if (editInputRow) editInputRow.classList.add('hidden');
            currentTranscript = '';
            candidateAlternatives = [];
        }

        // Initialize with Question 0
        loadQuestionData(panel, sectionConfig.questions[0]);

        // Question Audio Button Listener
        if (qAudioBtn) {
            qAudioBtn.addEventListener('click', () => {
                const currentQ = sectionConfig.questions[currentQIndex];
                const text = currentQ ? currentQ.question : (qAudioBtn.dataset.speak || '');
                if (window.playAudio && text) {
                    window.playAudio(text, 'male');
                }
            });
        }

        // Toggle Manual Edit Input
        if (editToggleBtn && editInputRow) {
            editToggleBtn.addEventListener('click', () => {
                editInputRow.classList.toggle('hidden');
                if (!editInputRow.classList.contains('hidden') && editInput) {
                    editInput.value = currentTranscript;
                    editInput.focus();
                }
            });
        }

        // Re-eval button listener
        if (reEvalBtn && editInput) {
            reEvalBtn.addEventListener('click', () => {
                const newText = editInput.value.trim();
                if (!newText) return;
                currentTranscript = newText;
                candidateAlternatives = [newText];
                const transcriptContent = panel.querySelector('.transcript-content');
                const wordCountBadge = panel.querySelector('.word-count-badge');
                if (transcriptContent) {
                    transcriptContent.className = 'transcript-content';
                    transcriptContent.textContent = newText;
                }
                const words = newText.split(/\s+/).filter(Boolean);
                if (wordCountBadge) wordCountBadge.textContent = `${words.length} từ`;

                const currentQ = sectionConfig.questions[currentQIndex];
                renderFeedbackResult(panel, currentQ, newText, [newText], secondsElapsed);
            });
        }

        // Record Button Listener
        if (recordBtn) {
            recordBtn.addEventListener('click', async () => {
                if (recordBtn.classList.contains('recording')) {
                    stopRecordingSession(panel, sectionId, currentQIndex);
                } else {
                    if (activePanel && activePanel !== panel) {
                        const prevSection = activePanel.dataset.section;
                        stopRecordingSession(activePanel, prevSection, 0);
                    }
                    await startRecordingSession(panel, sectionId, currentQIndex);
                }
            });
        }
    });

    async function startRecordingSession(panel, sectionId, qIdx) {
        const sectionConfig = PRACTICE_CONFIGS[sectionId];
        const currentQ = sectionConfig.questions[qIdx];
        if (!currentQ) return;

        const recordBtn = panel.querySelector('.practice-record-btn');
        const recordIcon = recordBtn.querySelector('.record-icon');
        const recordText = recordBtn.querySelector('.record-text');
        const recordIndicator = panel.querySelector('.recording-indicator');
        const timerDisplay = panel.querySelector('.record-timer');
        const transcriptBox = panel.querySelector('.practice-transcript-box');
        const transcriptContent = panel.querySelector('.transcript-content');
        const wordCountBadge = panel.querySelector('.word-count-badge');
        const playbackBox = panel.querySelector('.practice-audio-playback');
        const feedbackCard = panel.querySelector('.practice-feedback-card');
        const transcriptEditWrap = panel.querySelector('.transcript-edit-wrap');
        const editInputRow = panel.querySelector('.transcript-input-row');

        // Reset UI
        feedbackCard.classList.add('hidden');
        feedbackCard.innerHTML = '';
        playbackBox.classList.add('hidden');
        if (transcriptEditWrap) transcriptEditWrap.classList.add('hidden');
        if (editInputRow) editInputRow.classList.add('hidden');

        transcriptContent.className = 'transcript-content';
        transcriptContent.textContent = 'Đang lắng nghe... Hãy nói to và rõ câu trả lời vào micro.';
        transcriptBox.classList.add('recording-active');
        wordCountBadge.textContent = '0 từ';

        let audioChunks = [];
        currentTranscript = '';
        candidateAlternatives = [];
        isStoppingProcess = false;

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('Trình duyệt của bạn chưa hỗ trợ ghi âm trực tiếp. Hãy dùng Google Chrome hoặc Microsoft Edge nhé!');
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            activeStream = stream;

            let options = { mimeType: 'audio/webm' };
            if (typeof MediaRecorder !== 'undefined') {
                if (!MediaRecorder.isTypeSupported || !MediaRecorder.isTypeSupported('audio/webm')) {
                    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/mp4')) {
                        options = { mimeType: 'audio/mp4' };
                    } else {
                        options = {};
                    }
                }
            }

            const mediaRecorder = new MediaRecorder(stream, options);
            activeRecorder = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    audioChunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const mimeType = mediaRecorder.mimeType || 'audio/webm';
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioPlayer = panel.querySelector('.practice-audio-player');
                if (audioPlayer) {
                    audioPlayer.src = audioUrl;
                    playbackBox.classList.remove('hidden');
                }
            };

            mediaRecorder.start(200);

            // Web Speech Recognition
            if (SpeechRecognition) {
                try {
                    const recognition = new SpeechRecognition();
                    activeRecognition = recognition;
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.lang = 'en-US';
                    recognition.maxAlternatives = 5;

                    recognition.onresult = (event) => {
                        let finalTrans = '';
                        let interimTrans = '';
                        let alts = [];

                        for (let i = 0; i < event.results.length; i++) {
                            const res = event.results[i];
                            if (res.isFinal) {
                                finalTrans += res[0].transcript + ' ';
                            } else {
                                interimTrans += res[0].transcript;
                            }
                            for (let a = 0; a < res.length; a++) {
                                alts.push(res[a].transcript);
                            }
                        }

                        candidateAlternatives = alts;
                        const combined = (finalTrans + interimTrans).trim();
                        if (combined) {
                            currentTranscript = combined;
                            transcriptContent.textContent = combined;
                            const words = combined.split(/\s+/).filter(Boolean);
                            wordCountBadge.textContent = `${words.length} từ`;
                        }
                    };

                    recognition.onerror = (err) => {
                        console.warn('SpeechRecognition notice:', err.error);
                    };

                    recognition.onend = () => {
                        if (isStoppingProcess) {
                            finalizeEvaluation(panel, currentQ);
                        } else if (recordBtn.classList.contains('recording')) {
                            // Automatically resume listening if Chrome stopped due to pause
                            try {
                                recognition.start();
                            } catch (e) {}
                        }
                    };

                    recognition.start();
                } catch (e) {
                    console.warn('Speech recognition init error:', e);
                }
            }

            // Update Recording State
            recordBtn.classList.add('recording');
            recordIcon.textContent = '⏹️';
            recordText.textContent = 'Dừng ghi âm';
            recordIndicator.classList.remove('hidden');

            secondsElapsed = 0;
            timerDisplay.textContent = '00:00';
            activeTimer = setInterval(() => {
                secondsElapsed++;
                const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
                const secs = String(secondsElapsed % 60).padStart(2, '0');
                timerDisplay.textContent = `${mins}:${secs}`;
            }, 1000);

            activePanel = panel;

        } catch (err) {
            console.error('Không thể truy cập Microphone:', err);
            transcriptContent.className = 'transcript-content placeholder';
            transcriptContent.textContent = '⚠️ Trình duyệt cần cấp quyền truy cập Microphone. Vui lòng kiểm tra biểu tượng ổ khóa 🔒 trên thanh địa chỉ và bật quyền Micro!';
        }
    }

    function stopRecordingSession(panel, sectionId, qIdx) {
        if (!panel) return;
        const sectionConfig = PRACTICE_CONFIGS[sectionId];
        const currentQ = sectionConfig ? sectionConfig.questions[qIdx] : null;

        const recordBtn = panel.querySelector('.practice-record-btn');
        const recordText = recordBtn.querySelector('.record-text');
        const recordIndicator = panel.querySelector('.recording-indicator');

        isStoppingProcess = true;
        recordBtn.disabled = true;
        recordText.textContent = 'Đang phân tích...';
        recordIndicator.querySelector('.record-status-text').textContent = 'Đang hoàn tất phân tích giọng nói...';

        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
        }

        if (activeRecorder && activeRecorder.state !== 'inactive') {
            try { activeRecorder.stop(); } catch (e) {}
        }

        if (activeRecognition) {
            try { activeRecognition.stop(); } catch (e) {}
        }

        // Grace period fallback: if recognition.onend didn't trigger finalize within 650ms, run it
        setTimeout(() => {
            if (isStoppingProcess) {
                finalizeEvaluation(panel, currentQ);
            }
        }, 700);
    }

    function finalizeEvaluation(panel, currentQ) {
        if (!isStoppingProcess) return;
        isStoppingProcess = false;

        const recordBtn = panel.querySelector('.practice-record-btn');
        const recordIcon = recordBtn.querySelector('.record-icon');
        const recordText = recordBtn.querySelector('.record-text');
        const recordIndicator = panel.querySelector('.recording-indicator');
        const transcriptBox = panel.querySelector('.practice-transcript-box');
        const transcriptContent = panel.querySelector('.transcript-content');
        const transcriptEditWrap = panel.querySelector('.transcript-edit-wrap');
        const editInput = panel.querySelector('.transcript-edit-input');

        recordBtn.disabled = false;
        recordBtn.classList.remove('recording');
        recordIcon.textContent = '🎙️';
        recordText.textContent = 'Ghi âm lại';
        recordIndicator.classList.add('hidden');
        transcriptBox.classList.remove('recording-active');

        if (activeStream) {
            try {
                activeStream.getTracks().forEach(t => t.stop());
            } catch (e) {}
            activeStream = null;
        }

        activeRecognition = null;
        activePanel = null;

        const finalText = currentTranscript.trim();

        if (!finalText) {
            transcriptContent.className = 'transcript-content placeholder';
            transcriptContent.textContent = '(Chưa nhận diện được từ ngữ. Bạn có thể nói gần micro hơn hoặc bấm nút bên dưới để gõ lại nhé!)';
        }

        // Show edit wrap so student can review or correct
        if (transcriptEditWrap) {
            transcriptEditWrap.classList.remove('hidden');
            if (editInput) editInput.value = finalText;
        }

        // Render feedback
        if (currentQ) {
            renderFeedbackResult(panel, currentQ, finalText, candidateAlternatives, secondsElapsed);
        }
    }

    function renderFeedbackResult(panel, qConfig, transcript, alts = [], duration = 0) {
        const feedbackCard = panel.querySelector('.practice-feedback-card');
        const cleanText = (transcript || '').trim();
        const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
        const wordCount = words.length;

        // Fluency calculation: estimated Words Per Minute (WPM)
        const durSeconds = Math.max(duration, 1);
        const wpm = Math.round((wordCount / durSeconds) * 60);

        let fluencyText = "Tự nhiên";
        if (wordCount === 0) fluencyText = "Chưa có";
        else if (wpm < 50) fluencyText = "Chậm rãi";
        else if (wpm <= 140) fluencyText = "Lưu loát chuẩn (~" + wpm + " wpm)";
        else fluencyText = "Nhanh (~" + wpm + " wpm)";

        const criteriaList = qConfig.checkCriteria(cleanText, alts);
        const passedCount = criteriaList.filter(c => c.passed).length;
        const totalCriteria = criteriaList.length;

        // Detect keywords
        const detectedKeywords = [];
        if (qConfig.keyPatterns) {
            const allToCheck = [cleanText, ...(alts || [])].join(' ');
            qConfig.keyPatterns.forEach(pattern => {
                const match = allToCheck.match(pattern);
                if (match && !detectedKeywords.includes(match[0].toLowerCase())) {
                    detectedKeywords.push(match[0]);
                }
            });
        }

        // Scoring & Pedagogical Feedback
        let stars = 3;
        let scoreBadge = "Khá Tốt 👍";
        let scoreColor = "#2563eb";
        let strengthAdvice = "";
        let improvementAdvice = "";

        if (wordCount === 0) {
            stars = 1;
            scoreBadge = "Chưa nhận diện được giọng nói 🎙️";
            scoreColor = "#dc2626";
            strengthAdvice = "Hệ thống chưa ghi nhận được âm thanh từ micro.";
            improvementAdvice = "Em hãy kiểm tra micro, ghé sát và nói to rõ ràng hơn nhé. Nếu micro gặp sự cố, em có thể bấm nút 'Chỉnh sửa / Gõ câu trả lời' ở trên để kiểm tra ngữ pháp ngay!";
        } else if (passedCount === totalCriteria && wordCount >= 3) {
            stars = 5;
            scoreBadge = "Xuất Sắc! ⭐⭐⭐⭐⭐";
            scoreColor = "#16a34a";
            strengthAdvice = "Rất tuyệt vời! Phát âm rõ ràng, đúng trọng tâm câu hỏi và ngữ pháp rất chuẩn xác. Câu trả lời đạt chuẩn điểm tối đa của giám khảo VSTEP.";
            improvementAdvice = "💡 Mẹo nâng cao: Để trả lời ấn tượng hơn nữa, em có thể kết hợp thêm 1 câu mở rộng lý do hoặc cảm xúc nhé!";
        } else if (passedCount >= 1) {
            if (wordCount >= 3) {
                stars = 4;
                scoreBadge = "Rất Tốt ⭐⭐⭐⭐";
                scoreColor = "#059669";
                strengthAdvice = "Rất tốt! Em đã trả lời đúng trọng tâm câu hỏi và diễn đạt được thông tin cốt lõi.";
                improvementAdvice = "💡 Gợi ý cải thiện: Em hãy xem thêm câu trả lời mẫu bên dưới để hoàn thiện câu nói tự nhiên và trọn vẹn hơn nhé!";
            } else {
                stars = 3;
                scoreBadge = "Khá Tốt ⭐⭐⭐";
                scoreColor = "#2563eb";
                strengthAdvice = "Em đã nêu được thông tin chính xác.";
                improvementAdvice = "💡 Lời khuyên: Trong bài thi Nói, hãy tránh trả lời cộc lốc chỉ 1 từ. Em nên nói thành câu hoàn chỉnh gồm cả chủ ngữ và vị ngữ (Ví dụ thay vì nói mỗi số tuổi '22', hãy nói 'I am 22 years old') nhé!";
            }
        } else {
            stars = 2;
            scoreBadge = "Cần bổ sung ý 📝";
            scoreColor = "#d97706";
            strengthAdvice = "Em đã tự tin cất giọng nói bằng tiếng Anh, đây là bước khởi đầu rất đáng khen!";
            improvementAdvice = "💡 Câu trả lời dường như chưa trúng từ khóa của câu hỏi này. Em hãy xem các cấu trúc gợi ý và câu trả lời mẫu bên dưới rồi thử bấm ghi âm lại nhé!";
        }

        const starIcons = '⭐'.repeat(stars);

        const checklistHtml = criteriaList.map(c => `
            <li class="${c.passed ? 'pass' : 'warn'}">
                <span>${c.passed ? '✅' : '⚠️'}</span>
                <div>
                    <div>${c.label}</div>
                    ${!c.passed ? `<div style="font-size:0.83rem; color:#b45309; margin-top:2px;">💡 <em>Gợi ý: ${c.tip}</em></div>` : ''}
                </div>
            </li>
        `).join('');

        const keywordPillsHtml = detectedKeywords.length > 0 
            ? detectedKeywords.map(kw => `<span class="hint-pill" style="background:#dcfce7; border-color:#86efac; color:#15803d; font-weight:700;">✓ ${kw}</span>`).join(' ')
            : `<span style="font-size:0.85rem; color:#94a3b8; font-style:italic;">(Chưa phát hiện từ khóa trọng tâm)</span>`;

        feedbackCard.innerHTML = `
            <div class="feedback-header-row">
                <div class="feedback-headline">
                    <span class="feedback-icon">${stars >= 4 ? '🎉' : '💡'}</span>
                    <div>
                        <div class="feedback-title-text">KẾT QUẢ ĐÁNH GIÁ & NHẬN XÉT CHI TIẾT</div>
                        <div style="font-size: 0.88rem; color: #166534; font-weight: 600;">${starIcons} (${stars}/5 sao)</div>
                    </div>
                </div>
                <div class="feedback-badge-score" style="border-left: 4px solid ${scoreColor};">
                    ${scoreBadge}
                </div>
            </div>

            <div class="feedback-stats-grid">
                <div class="feedback-stat-box">
                    <div class="stat-label">Thời lượng</div>
                    <div class="stat-val">${durSeconds}s</div>
                </div>
                <div class="feedback-stat-box">
                    <div class="stat-label">Số từ nói</div>
                    <div class="stat-val">${wordCount} từ</div>
                </div>
                <div class="feedback-stat-box">
                    <div class="stat-label">Độ lưu loát</div>
                    <div class="stat-val" style="font-size: 0.95rem;">${fluencyText}</div>
                </div>
                <div class="feedback-stat-box">
                    <div class="stat-label">Tiêu chí đạt</div>
                    <div class="stat-val">${passedCount}/${totalCriteria}</div>
                </div>
            </div>

            <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 12px 16px; margin-bottom: 14px;">
                <div style="font-size: 0.82rem; font-weight: 800; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                    🔍 Cụm từ khóa được hệ thống ghi nhận:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${keywordPillsHtml}
                </div>
            </div>

            <div class="feedback-eval-box">
                <div class="eval-comment-title">👩‍🏫 Nhận xét sư phạm từ cô giáo:</div>
                <div class="eval-comment-body" style="margin-bottom: 8px;">
                    <strong>✨ Ưu điểm:</strong> ${strengthAdvice}
                </div>
                <div class="eval-comment-body" style="color: #0369a1; margin-bottom: 12px;">
                    <strong>🎯 Lời khuyên nâng band điểm:</strong> ${improvementAdvice}
                </div>
                <ul class="eval-checklist">
                    ${checklistHtml}
                </ul>
            </div>

            <div class="model-answer-box">
                <div class="model-answer-header">
                    <span class="model-answer-tag">✨ CÂU TRẢ LỜI MẪU GỢI Ý (MODEL ANSWER)</span>
                    <button type="button" class="practice-audio-btn model-audio-btn" title="Nghe câu trả lời mẫu">
                        🔊 Nghe câu mẫu
                    </button>
                </div>
                <div class="model-answer-text">"${qConfig.modelAnswer}"</div>
                <div class="model-answer-vi">${qConfig.modelAnswerVi}</div>
            </div>

            <div style="text-align: right;">
                <button type="button" class="practice-retry-btn">
                    🔄 Luyện tập lại câu này
                </button>
            </div>
        `;

        feedbackCard.classList.remove('hidden');

        // Bind model audio button
        const modelAudioBtn = feedbackCard.querySelector('.model-audio-btn');
        if (modelAudioBtn) {
            modelAudioBtn.addEventListener('click', () => {
                if (window.playAudio) {
                    window.playAudio(qConfig.modelAnswer, 'female');
                }
            });
        }

        // Bind retry button
        const retryBtn = feedbackCard.querySelector('.practice-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                feedbackCard.classList.add('hidden');
                feedbackCard.innerHTML = '';
                const recordBtn = panel.querySelector('.practice-record-btn');
                const recordText = recordBtn.querySelector('.record-text');
                if (recordText) recordText.textContent = 'Bắt đầu ghi âm';
                const transcriptContent = panel.querySelector('.transcript-content');
                const wordCountBadge = panel.querySelector('.word-count-badge');
                if (transcriptContent) {
                    transcriptContent.className = 'transcript-content placeholder';
                    transcriptContent.textContent = 'Bấm "Bắt đầu ghi âm" và nói câu trả lời của bạn vào micro...';
                }
                if (wordCountBadge) wordCountBadge.textContent = '0 từ';
                panel.querySelector('.practice-audio-playback').classList.add('hidden');
                recordBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
    }
}


