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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', startStory);