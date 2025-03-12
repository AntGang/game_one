const gameBoard = document.getElementById('gameBoard');
const matchesDisplay = document.getElementById('matches');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let gameInterval;
let isProcessing = false;

// 音效（狗叫声）
const sounds = {
    flip: new Audio('https://assets.mixkit.co/active_storage/sfx/1018/1018-preview.mp3'), // 短促的狗叫
    match: new Audio('https://assets.mixkit.co/active_storage/sfx/1017/1017-preview.mp3'), // 欢快的狗叫
    victory: new Audio('https://assets.mixkit.co/active_storage/sfx/1014/1014-preview.mp3') // 持续的狗叫
};

// 音效开关状态
let soundEnabled = true;

// 音效播放函数
function playSound(soundName) {
    if (soundEnabled) {
        try {
            sounds[soundName].currentTime = 0; // 重置音频播放位置
            sounds[soundName].play().catch(error => {
                console.log(`Sound play failed: ${error}`);
                // 如果音频播放失败，禁用音效以避免继续尝试
                if (error.name === 'NotAllowedError') {
                    soundEnabled = false;
                }
            });
        } catch (error) {
            console.log(`Sound play error: ${error}`);
        }
    }
}

// 游戏图片，使用本地图片
const images = [
    'assets/images/企业微信20250312-170050@2x.png',
    'assets/images/企业微信20250312-170341@2x.png',
    'assets/images/企业微信20250312-180628@2x.png',
    'assets/images/企业微信20250312-182230@2x.png',
    'assets/images/企业微信20250312-182301@2x.png',
    'assets/images/企业微信20250312-182318@2x.png',
];

function initializeGame() {
    // 重置游戏状态
    cards = [...images, ...images]; // 复制两份图片，形成配对
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    flippedCards = [];
    isProcessing = false;

    // 洗牌算法
    shuffleCards();

    // 创建卡片元素
    createCards();

    // 更新显示
    updateDisplay();

    // 开始计时
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timer++;
        updateDisplay();
    }, 1000);
}

function shuffleCards() {
    // Fisher-Yates 洗牌算法
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createCards() {
    gameBoard.innerHTML = '';
    cards.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back"><img src="${img}" alt="Card ${index + 1}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'150\' height=\'150\' viewBox=\'0 0 150 150\'%3E%3Crect width=\'150\' height=\'150\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial, sans-serif\' font-size=\'14\' fill=\'%23999\'%3E图片加载失败%3C/text%3E%3C/svg%3E'"></div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, index));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, index) {
    // 如果正在处理匹配，或者已经翻了两张牌，或者点击了已经翻开/匹配的牌，则不处理
    if (isProcessing || flippedCards.length >= 2 ||
        flippedCards.includes(index) ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched')) {
        return;
    }

    // 翻牌
    card.classList.add('flipped');
    flippedCards.push(index);
    playSound('flip');

    // 如果翻了两张牌，检查是否匹配
    if (flippedCards.length === 2) {
        moves++;
        isProcessing = true;
        checkMatch();
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    const cards = document.querySelectorAll('.card');
    const card1 = cards[index1];
    const card2 = cards[index2];

    // 检查两张牌的图片是否相同
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        // 匹配成功
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            flippedCards = [];
            isProcessing = false;
            playSound('match');

            // 检查是否完成所有匹配
            if (matchedPairs === images.length) {
                clearInterval(gameInterval);
                setTimeout(() => {
                    playSound('victory');
                    alert(`恭喜你赢了！\n用时: ${timer} 秒\n总步数: ${moves}\n\n提示：如果你没有听到音效，可能是浏览器阻止了自动播放。`);
                }, 500);
            }
        }, 500);
    } else {
        // 不匹配，翻回去
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isProcessing = false;
        }, 1000);

        // 添加抖动动画
        card1.style.animation = 'shake 0.5s';
        card2.style.animation = 'shake 0.5s';
        setTimeout(() => {
            card1.style.animation = '';
            card2.style.animation = '';
        }, 500);
    }

    updateDisplay();
}

function updateDisplay() {
    matchesDisplay.textContent = matchedPairs;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;
}

// 添加事件监听器
restartBtn.addEventListener('click', initializeGame);

// 添加音效控制按钮
const soundBtn = document.createElement('button');
soundBtn.className = 'control-btn';
soundBtn.style.marginLeft = '10px';
soundBtn.textContent = '🔊 音效: 开';
soundBtn.onclick = () => {
    soundEnabled = !soundEnabled;
    soundBtn.textContent = `${soundEnabled ? '🔊' : '🔇'} 音效: ${soundEnabled ? '开' : '关'}`;
};
document.querySelector('.controls').appendChild(soundBtn);

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();

    // 尝试预加载音效
    Object.values(sounds).forEach(sound => {
        sound.load();
    });
});