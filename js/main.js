// 当前故事节点
let currentStoryId = 'start';

// 开始故事
function startStory() {
    currentStoryId = 'start';
    updateStory();
}

// 更新故事内容和选项
function updateStory() {
    const storyNode = storyData[currentStoryId];
    const storyContent = document.getElementById('story-content');
    const optionsContainer = document.getElementById('options-container');

    // 更新故事文本
    storyContent.innerHTML = `<p>${storyNode.text}</p>`;

    // 更新选项按钮
    optionsContainer.innerHTML = '';
    storyNode.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(option.nextId);
        optionsContainer.appendChild(button);
    });

    // 更新角色显示
    updateCharacters();
}

// 选择选项
function selectOption(nextId) {
    // 更新当前故事节点
    currentStoryId = nextId;

    // 添加过渡动画
    const container = document.getElementById('story-container');
    container.style.opacity = '0';

    setTimeout(() => {
        updateStory();
        container.style.opacity = '1';
    }, 300);
}

// 更新角色显示
function updateCharacters() {
    const adventurer = document.querySelector('.adventurer');
    const crystal = document.querySelector('.crystal');
    const deer = document.querySelector('.deer');

    // 默认隐藏所有角色
    adventurer.classList.add('hidden');
    crystal.classList.add('hidden');
    deer.classList.add('hidden');

    // 根据当前故事节点显示相应角色
    switch(currentStoryId) {
        case 'start':
            adventurer.classList.remove('hidden');
            break;
        case 'cave':
        case 'crystal_touch':
        case 'leave_cave':
            adventurer.classList.remove('hidden');
            crystal.classList.remove('hidden');
            break;
        case 'forest':
        case 'forest_with_power':
        case 'help_deer':
        case 'deer_secret':
            adventurer.classList.remove('hidden');
            deer.classList.remove('hidden');
            break;
        case 'guardian_end':
            adventurer.classList.remove('hidden');
            deer.classList.remove('hidden');
            crystal.classList.remove('hidden');
            break;
        default:
            adventurer.classList.remove('hidden');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化角色
    updateCharacters();
});