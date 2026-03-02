// 多语言翻译对象
const TRANSLATIONS = {
    'zh-CN': {
        title: 'Bilibili 直播弹幕映射',
        disclaimer: '由于尚未接入官方API，以下内容为默认循环内容，仅供功能演示和参考。随后输入任意直播间号码，都只循环一些随机的预制弹幕内容。',
        visit_notice: '跳转直播间功能真实可用，请注意跳转时的音量及画面变化。',
        room_label: '直播间号:',
        room_placeholder: '例: 21686237（央视新闻）',
        start_btn: '开始映射',
        visit_btn: '跳转直播间',
        waiting: '等待输入直播间号...',
        danmaku_title: '直播弹幕',
        record_title: '弹幕记录',
        download_btn: '下载记录',
        clear_btn: '清空记录',
        record_placeholder: '弹幕记录会在这里显示...',
        connecting: '正在连接直播间: {roomId}...',
        error_empty: '请输入直播间号！',
        error_invalid: '直播间号必须是纯数字！',
        connected: '已连接到直播间 {roomId}，等待弹幕...',
        no_record: '没有弹幕记录可下载！',
        clear_confirm: '确定要清空所有弹幕记录吗？',
        cleared: '已清空弹幕记录',
        downloaded: '已下载弹幕记录: {filename}',
        footer: '本网站CSS技术内容等基于 <strong>艺创源达（杭州）文化传播有限公司</strong> 技术开发，开发人 <strong>Diqian WU（Kleman）</strong> 为本公司高管，获许使用相关技术，仅供教学用途使用。'
    },
    'zh-TW': {
        title: 'Bilibili 直播彈幕映射',
        disclaimer: '由於尚未接入官方API，以下內容為預設迴圈內容，僅供功能演示和參考。隨後輸入任意直播間號碼，都只迴圈一些隨機的預製彈幕內容。',
        visit_notice: '跳轉直播間功能真實可用，請注意跳轉時的音量及畫面變化。',
        room_label: '直播間號:',
        room_placeholder: '例: 21686237（央視新聞）',
        start_btn: '開始映射',
        visit_btn: '跳轉直播間',
        waiting: '等待輸入直播間號...',
        danmaku_title: '直播彈幕',
        record_title: '彈幕記錄',
        download_btn: '下載記錄',
        clear_btn: '清空記錄',
        record_placeholder: '彈幕記錄會在這裡顯示...',
        connecting: '正在連接直播間: {roomId}...',
        error_empty: '請輸入直播間號！',
        error_invalid: '直播間號必須是純數字！',
        connected: '已連接到直播間 {roomId}，等待彈幕...',
        no_record: '沒有彈幕記錄可下載！',
        clear_confirm: '確定要清空所有彈幕記錄嗎？',
        cleared: '已清空彈幕記錄',
        downloaded: '已下載彈幕記錄: {filename}',
        footer: '本網站CSS技術內容等基於 <strong>藝創源達（杭州）文化傳播有限公司</strong> 技術開發，開發人 <strong>Diqian WU（Kleman）</strong> 為本公司高管，獲許使用相關技術，僅供教學用途使用。'
    },
    'en': {
        title: 'Bilibili Live Danmaku Mapper',
        disclaimer: 'Due to the lack of official API integration, the following content is default looping content for functional demonstration and reference only. When you enter any live room number later, only some random pre-set danmaku content will be circulated.',
        visit_notice: 'The visit live room function is fully functional. Please note the volume and screen changes when jumping.',
        room_label: 'Room Number:',
        room_placeholder: 'e.g: 21686237 (CCTV News)',
        start_btn: 'Start Mapping',
        visit_btn: 'Visit Live Room',
        waiting: 'Waiting for room number input...',
        danmaku_title: 'Live Danmaku',
        record_title: 'Danmaku Record',
        download_btn: 'Download Record',
        clear_btn: 'Clear Record',
        record_placeholder: 'Danmaku records will be displayed here...',
        connecting: 'Connecting to room: {roomId}...',
        error_empty: 'Please enter a room number!',
        error_invalid: 'Room number must be pure digits!',
        connected: 'Connected to room {roomId}, waiting for danmaku...',
        no_record: 'No danmaku records to download!',
        clear_confirm: 'Are you sure you want to clear all danmaku records?',
        cleared: 'Danmaku records cleared',
        downloaded: 'Downloaded danmaku record: {filename}',
        footer: 'This website\'s CSS technical content is developed based on <strong>Yichuang Yuanda (Hangzhou) Culture Communication Co., Ltd.</strong>. Developer <strong>Diqian WU (Kleman)</strong> is an executive of the company. The technology is used with permission and is for educational purposes only.'
    }
};

// 语言管理器
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'zh-CN';
        this.initLanguageSwitcher();
        this.applyLanguage(this.currentLang);
    }

    initLanguageSwitcher() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedLang = btn.getAttribute('data-lang');
                this.setLanguage(selectedLang);
            });
        });

        // 设置当前语言按钮为活动状态
        const currentBtn = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (currentBtn) {
            currentBtn.classList.add('active');
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        this.applyLanguage(lang);

        // 更新活动按钮
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    }

    applyLanguage(lang) {
        const translations = TRANSLATIONS[lang] || TRANSLATIONS['zh-CN'];

        // 翻译文本内容
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // 翻译占位符
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });

        // 翻译页脚
        const footerText = document.getElementById('footer-text');
        if (footerText && translations['footer']) {
            footerText.innerHTML = translations['footer'];
        }
    }

    getText(key, replacements = {}) {
        const translations = TRANSLATIONS[this.currentLang] || TRANSLATIONS['zh-CN'];
        let text = translations[key] || key;

        // 替换占位符
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        });

        return text;
    }
}

// Bilibili 弹幕映射系统
class DanmakuMapper {
    constructor() {
        this.roomId = null;
        this.danmakuList = [];
        this.isConnected = false;
        this.languageManager = new LanguageManager();
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.roomIdInput = document.getElementById('room-id');
        this.startBtn = document.getElementById('start-btn');
        this.visitBtn = document.getElementById('visit-btn');
        this.danmakuContainer = document.getElementById('danmaku-container');
        this.recordText = document.getElementById('record-text');
        this.statusText = document.getElementById('status-text');
        this.downloadBtn = document.getElementById('download-btn');
        this.clearBtn = document.getElementById('clear-btn');
    }

    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.startMapping());
        this.visitBtn.addEventListener('click', () => this.visitLiveRoom());
        this.downloadBtn.addEventListener('click', () => this.downloadRecord());
        this.clearBtn.addEventListener('click', () => this.clearRecord());
        this.roomIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startMapping();
        });
        
        // 监听直播间号输入，更新跳转按钮状态
        this.roomIdInput.addEventListener('input', () => this.updateVisitBtnState());
        
        // 初始化按钮状态
        this.updateVisitBtnState();
    }

    updateVisitBtnState() {
        const roomId = this.roomIdInput.value.trim();
        if (roomId && /^\d+$/.test(roomId)) {
            this.visitBtn.classList.add('enabled');
            this.visitBtn.style.cursor = 'pointer';
        } else {
            this.visitBtn.classList.remove('enabled');
            this.visitBtn.style.cursor = 'not-allowed';
        }
    }

    startMapping() {
        const roomId = this.roomIdInput.value.trim();
        
        if (!roomId) {
            this.showStatus(this.languageManager.getText('error_empty'), 'error');
            return;
        }

        if (!/^\d+$/.test(roomId)) {
            this.showStatus(this.languageManager.getText('error_invalid'), 'error');
            return;
        }

        this.roomId = roomId;
        this.showStatus(this.languageManager.getText('connecting', { roomId: roomId }), 'loading');
        
        // 这里添加实际的B站弹幕连接逻辑
        this.connectToBilibili();
    }

    connectToBilibili() {
        // 这是一个占位符，实际需要根据B站API实现
        
        setTimeout(() => {
            this.isConnected = true;
            this.showStatus(this.languageManager.getText('connected', { roomId: this.roomId }), 'connected');
            
            // 模拟接收弹幕（用于演示）
            this.simulateDanmaku();
        }, 1000);
    }

    simulateDanmaku() {
        // 模拟弹幕数据，用于测试界面
        const mockMessages = {
            'zh-CN': ['好家伙，这是直播弹幕映射！', '欢迎来到我的直播间！', '请遵守直播间规则', '感谢支持！'],
            'zh-TW': ['好傢伙，這是直播彈幕映射！', '歡迎來到我的直播間！', '請遵守直播間規則', '感謝支持！'],
            'en': ['Great, this is the live danmaku mapper!', 'Welcome to my live room!', 'Please follow the room rules', 'Thanks for your support!']
        };

        const mockDanmaku = [
            { username: this.languageManager.currentLang === 'en' ? 'User123' : '用户123', message: mockMessages[this.languageManager.currentLang][0], type: 'normal' },
            { username: this.languageManager.currentLang === 'en' ? 'Streamer' : '主播', message: mockMessages[this.languageManager.currentLang][1], type: 'owner' },
            { username: this.languageManager.currentLang === 'en' ? 'Moderator' : '版主', message: mockMessages[this.languageManager.currentLang][2], type: 'moderator' },
            { username: this.languageManager.currentLang === 'en' ? 'Member User' : '会员用户', message: mockMessages[this.languageManager.currentLang][3], type: 'member' },
        ];

        // 每2秒添加一条模拟弹幕
        let index = 0;
        const interval = setInterval(() => {
            if (index < mockDanmaku.length) {
                const danmaku = mockDanmaku[index];
                this.addDanmaku(danmaku.username, danmaku.message, danmaku.type);
                index++;
            }
        }, 2000);
    }

    addDanmaku(username, message, type = 'normal') {
        // 添加到弹幕容器
        const danmakuItem = document.createElement('div');
        danmakuItem.className = `danmaku-item ${type}`;
        
        const usernameSpan = document.createElement('span');
        usernameSpan.className = `danmaku-username danmaku-${type}`;
        usernameSpan.textContent = username;
        
        const messageSpan = document.createElement('span');
        messageSpan.className = 'danmaku-message';
        messageSpan.textContent = message;
        
        danmakuItem.appendChild(usernameSpan);
        danmakuItem.appendChild(messageSpan);
        
        this.danmakuContainer.appendChild(danmakuItem);
        
        // 自动滚动到底部
        this.danmakuContainer.scrollTop = this.danmakuContainer.scrollHeight;
        
        // 添加到记录列表
        const timestamp = new Date().toLocaleTimeString(this.languageManager.currentLang === 'en' ? 'en-US' : 'zh-CN');
        const record = `[${timestamp}] ${username}: ${message}`;
        this.danmakuList.push(record);
        
        // 更新记录文本框
        this.updateRecordText();
    }

    updateRecordText() {
        this.recordText.value = this.danmakuList.join('\n');
        this.recordText.scrollTop = this.recordText.scrollHeight;
    }

    downloadRecord() {
        if (this.danmakuList.length === 0) {
            this.showStatus(this.languageManager.getText('no_record'), 'error');
            return;
        }

        const content = this.danmakuList.join('\n');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const filename = `danmaku_${this.roomId}_${timestamp}.txt`;
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showStatus(this.languageManager.getText('downloaded', { filename: filename }), 'success');
    }

    clearRecord() {
        if (this.danmakuList.length === 0) {
            this.showStatus(this.languageManager.getText('no_record'), 'error');
            return;
        }

        if (confirm(this.languageManager.getText('clear_confirm'))) {
            this.danmakuList = [];
            this.recordText.value = '';
            this.danmakuContainer.innerHTML = '';
            this.showStatus(this.languageManager.getText('cleared'), 'success');
        }
    }

    visitLiveRoom() {
        const roomId = this.roomIdInput.value.trim();
        
        // 检查按钮是否启用
        if (!this.visitBtn.classList.contains('enabled')) {
            return;
        }
        
        // 跳转到B站直播间
        const liveUrl = `https://live.bilibili.com/${roomId}`;
        window.open(liveUrl, '_blank');
    }

    showStatus(message, type = 'info') {
        this.statusText.textContent = message;
        this.statusText.className = `status-text status-${type}`;
        
        // 3秒后恢复默认状态信息
        if (type !== 'connected' && type !== 'loading') {
            setTimeout(() => {
                if (this.isConnected) {
                    this.statusText.textContent = this.languageManager.getText('connected', { roomId: this.roomId });
                    this.statusText.className = 'status-text status-connected';
                } else {
                    this.statusText.textContent = this.languageManager.getText('waiting');
                    this.statusText.className = 'status-text';
                }
            }, 3000);
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.danmakuMapper = new DanmakuMapper();
    console.log('弹幕映射系统已初始化');
});
