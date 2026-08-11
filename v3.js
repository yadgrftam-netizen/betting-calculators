(function() {
    "use strict";

    // ====================== ۱. استایل‌ها ======================
    const style = document.createElement('style');
    style.textContent = `
        #bot-ui-wrapper {
            direction: rtl; text-align: right; font-family: Tahoma, sans-serif;
            --bg: #fff; --text: #333; --border: #ddd; --shadow: rgba(0,0,0,0.1);
            --hover: #f1f3f5;
            --status-color: #222;
            background: #f8f9fa; border: 2px solid #28a745; border-radius: 12px;
            padding: 10px; margin: 10px auto; max-width: 600px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            position: relative; z-index: 9999;
        }
        #bot-ui-wrapper.bot-night {
            --bg: #222; --text: #eee; --border: #444; --shadow: rgba(255,255,255,0.1);
            --hover: #333;
            --status-color: #fff;
            background: #111; border-color: #666;
        }
        #bot-toolbar { display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap; }
        .bot-btn {
            flex: 1; height: 40px; border: none; border-radius: 6px; font-size: 13px;
            font-weight: bold; cursor: pointer; color: white; min-width: 70px;
        }
        .bot-btn.green { background: #28a745; } .bot-btn.red { background: #dc3545; }
        .bot-btn.blue { background: #007bff; } .bot-btn.dark { background: #333; }
        .bot-btn:hover { filter: brightness(0.9); }

        #bot-tabs { display: flex; gap: 2px; margin-bottom: 6px; flex-wrap: wrap; }
        .bot-tab {
            flex: 1; padding: 10px 4px; background: #555; color: white; border: none;
            cursor: pointer; font-size: 13px; border-radius: 6px 6px 0 0; text-align: center;
            min-width: 60px;
        }
        .bot-tab.active { background: #28a745; }
        
        .bot-pane {
            display: none; background: var(--bg); color: var(--text); border: 1px solid var(--border);
            border-radius: 0 0 6px 6px; padding: 12px; margin-bottom: 6px;
        }
        .bot-pane.active { display: block; }

        .bot-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
        .bot-label { font-size: 14px; font-weight: bold; min-width: 60px; flex-shrink: 0; }
        .bot-input {
            flex: 1; padding: 6px; border: 1px solid var(--border); border-radius: 4px;
            background: var(--hover); color: var(--text); font-size: 14px; min-width: 40px; max-width: 70px; text-align: center;
        }
        .bot-input.readonly-field { background: #e9ecef; color: #495057; font-weight: bold; }
        .bot-input-group {
            display: flex; gap: 4px; flex: 1; flex-wrap: wrap; justify-content: flex-start;
        }
        .bot-input-group .bot-input { min-width: 45px; max-width: 55px; }
        .bot-check-row {
            display: flex; align-items: center; gap: 8px; padding: 6px 0;
            border-top: 1px solid var(--border); margin-top: 6px;
        }
        .bot-check-row input[type="checkbox"] { width: 18px; height: 18px; accent-color: #28a745; }
        
        #stats-table-outer-container, #vein-table-outer-container {
            direction: rtl; text-align: right; font-family: Tahoma, sans-serif;
            max-width: 600px; margin: 10px auto; box-sizing: border-box;
        }
        .bot-collapse-btn, .vein-collapse-btn {
            width: 100%; background: #000; color: white; padding: 10px; border: none;
            border-radius: 6px 6px 0 0; font-weight: bold; display: flex; justify-content: space-between;
            cursor: pointer;
        }
        .bot-collapse-content, .vein-collapse-content {
            display: none; border: 1px solid #555; border-top: none; padding: 10px;
            background: #000; color: white; overflow-x: auto; -webkit-overflow-scrolling: touch;
        }
        .bot-collapse-content.open, .vein-collapse-content.open { display: block; }

        #statsTableContainer, #veinTableContainer {
            border: 1px solid #555; padding: 10px; border-radius: 5px; background: black;
            color: white; direction: rtl; text-align: right; box-sizing: border-box;
            width: 100%;
        }
        #statsTableContainer table, #veinTableContainer table {
            width: 100%; border-collapse: collapse; font-size: 11px; color: white; direction: rtl;
            table-layout: auto;
        }
        #statsTableContainer table { min-width: 600px; }
        #veinTableContainer table { min-width: 2800px; }
        
        #statsTableContainer th, #statsTableContainer td,
        #veinTableContainer th, #veinTableContainer td {
            border: 1px solid #555; padding: 4px 3px !important; text-align: center;
            vertical-align: middle; white-space: nowrap;
        }
        #statsTableContainer th, #veinTableContainer th { background: #333; color: white; }
        #statsTableContainer tbody tr:nth-child(even), #veinTableContainer tbody tr:nth-child(even) { background: #1a1a1a; }
        #statsTableContainer tbody tr:hover, #veinTableContainer tbody tr:hover { background: #2a2a2a; }
        
        .vein-badge {
            display: inline-block; background: #2563eb; color: white; border-radius: 12px;
            padding: 0 6px; font-weight: bold; font-size: 10px;
        }
        .vein-badge-green { background: #16a34a; }
        .vein-badge-orange { background: #ea580c; }
        .vein-badge-purple { background: #7c3aed; }
        .vein-array {
            font-family: 'Courier New', monospace; font-size: 10px;
            white-space: nowrap; max-width: 180px; overflow: hidden;
            text-overflow: ellipsis; display: inline-block;
        }
        .bot-night #veinTableContainer, .bot-night #statsTableContainer { background: #111; border-color: #444; }
        .bot-night #veinTableContainer th, .bot-night #statsTableContainer th { background: #222; }
        .bot-night #veinTableContainer td, .bot-night #statsTableContainer td { border-color: #444; }
        .bot-night .vein-collapse-btn, .bot-night .bot-collapse-btn { background: #222; }
        
        #bot-status { text-align: center; font-size: 14px; font-weight: bold; color: var(--status-color); margin-bottom: 6px; }

        .risk-pane {
            background: var(--bg); color: var(--text);
            border: 1px solid var(--border); border-radius: 6px;
            padding: 10px;
            margin-bottom: 8px;
        }
        .risk-pane .bot-row { margin-bottom: 6px; }
        .risk-status {
            background: #1a1a1a; color: #0f0; padding: 6px 10px;
            border-radius: 4px; font-family: monospace; font-size: 12px;
        }
        .risk-log {
            max-height: 120px; overflow-y: auto; background: #111; color: #aaa;
            padding: 6px; border-radius: 4px; font-size: 11px; direction: ltr;
            border: 1px solid #333; margin-top: 6px; text-align: left;
        }
        .risk-log .match { color: #0f0; }
        .risk-log .nomatch { color: #f00; }
        .risk-log .info { color: #ffc107; }
        .risk-log .bet { color: #00bfff; }
    `;
    document.head.appendChild(style);

    // ====================== ۲. توابع کمکی ======================
    const toEng = s => {
        if (!s) return s;
        let result = s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
        result = result.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
        return result;
    };
    document.addEventListener('input', e => {
        if (e.target.classList.contains('bot-input')) {
            e.target.value = toEng(e.target.value);
        }
    });

    // ====================== ۳. آرایه دنباله‌های کلاسیک ======================
    const SEQUENCES = {
        "1.10": [11, 121, 1331, 14641, 161051],
        "1.20": [6, 36, 216, 1296, 7776],
        "1.30": [4, 17, 74, 321, 1391],
        "1.50": [3, 9, 27, 81, 243],
        "1.80": [2, 4, 9, 21, 47],
        "2.00": [2, 3, 7, 15, 31],
        "3.00": [1, 2, 3, 5, 8],
        "4.00": [1, 1, 2, 3, 5]
    };

    // ====================== ۴. متغیرهای اصلی ======================
    let isRunning = false, isStrategyActive = false;
    let strategyConfig = { type: 'martingale', multiplier: 2.0, baseAmount: 1 };
    let currentSeqIdx = 0, totalLoss = 0;
    let lastPlacedBet = 0;
    let currentBalance = 600;
    let targetBalance = 606;
    let bustHistory = [];
    let fullHistory = [];
    let initialLoadDone = false;
    let historyClickedOnce = false;

    // متغیرهای مدیریت ریسک
    let riskEnabled = false;
    let veinTableData = [];
    let matchFound = false;
    let riskTargetMultiplier = null;
    let riskSkipCount = 0;

    // متغیرهای جبران ضرر
    let recoveryMode = false;
    let recoveryMultiplier = 1;
    const BASE_BET = 1;

    // آرایه برای ذخیره کامل لاگ
    let fullLogHistory = [];

    // ====================== ۵. داده‌های جدول آماری ======================
    const STATS_DATA = [
        { id: 'A', coeff: 1.10, fair: 90.9 },
        { id: 'B', coeff: 1.20, fair: 83.3 },
        { id: 'C', coeff: 1.30, fair: 76.9 },
        { id: 'D', coeff: 1.50, fair: 66.7 },
        { id: 'E', coeff: 1.80, fair: 55.6 },
        { id: 'F', coeff: 2.00, fair: 50.0 },
        { id: 'G', coeff: 3.00, fair: 33.3 },
        { id: 'H', coeff: 4.00, fair: 25.0 }
    ];

    // ====================== ۶. توابع محاسبه پویا ======================
    function calculateDynamicBase(coeff) {
        if (coeff <= 1.0) return 1; 
        return Math.ceil(1 / (coeff - 1));
    }

    function getStrategyType(coeff) {
        const chkMartingale = document.getElementById('chk-martingale');
        const chkLabouchere = document.getElementById('chk-labouchere');
        if (chkMartingale && chkMartingale.checked) return 'MARTINGALE';
        if (chkLabouchere && chkLabouchere.checked) return 'LABOUCHERE';
        const coeffKey = coeff.toFixed(2);
        if (SEQUENCES[coeffKey]) return 'SEQUENCES';
        return 'LABOUCHERE';
    }

    function getCurrentBalanceFromDOM() {
        const chipsDiv = document.querySelector('.top-link.chips-amount');
        if (!chipsDiv) return null; 
        let rawText = chipsDiv.innerText.trim();
        let engText = toEng(rawText);
        let numericStr = engText.replace(/[^0-9.]/g, '');
        let balance = parseFloat(numericStr);
        return isNaN(balance) ? null : balance;
    }

    // ====================== ۷. توابع مدیریت ریسک با شناسه یکتای پیشرفته ======================
    function extractVeinTableData() {
        const container = document.getElementById('veinTableContainer');
        if (!container) return [];
        const rows = container.querySelectorAll('tbody tr');
        const data = [];
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 28) {
                const rowData = [];
                cells.forEach(cell => {
                    let text = cell.innerText.trim();
                    let num = parseFloat(text);
                    if (!isNaN(num) && text !== '') rowData.push(num);
                    else rowData.push(text);
                });
                data.push(rowData);
            }
        });
        return data;
    }

    function scanVeinTable() {
        veinTableData = extractVeinTableData();
        const eIndex = 6;
        const pIndex = 17;
        const lIndex = 13;
        const uIndex = 22;
        const groupIdx = 1;
        const aIdx = 2;
        const cIdx = 4;
        const hIdx = 9;
        const qIdx = 18;
        const iIdx = 10;
        const rIdx = 19;

        const patterns = [];

        veinTableData.forEach(row => {
            const group = row[groupIdx] || '';
            const a = row[aIdx] || '';
            const c = JSON.stringify(row[cIdx] || '');
            const h = JSON.stringify(row[hIdx] || '');
            const q = JSON.stringify(row[qIdx] || '');
            const ident = row[iIdx] || '';
            const rIdent = row[rIdx] || '';
            const eVal = parseFloat(row[eIndex]);
            const pVal = parseFloat(row[pIndex]);
            const lVal = parseFloat(row[lIndex]);
            const uVal = parseFloat(row[uIndex]);

            // شناسه یکتای پیشرفته
            const uniqueKey = `${group}_${a}_${c}_${h}_${q}_${ident}_${rIdent}`;

            if (!isNaN(eVal) && eVal > 0) {
                patterns.push({
                    key: uniqueKey,
                    beforeStart: eVal,
                    beforeEnd: pVal,
                    afterStart: lVal,
                    afterEnd: uVal,
                    group, a, c, h, q, ident, rIdent,
                    source: 'E',
                    row: row
                });
            }
            if (!isNaN(pVal) && pVal > 0 && (pVal !== eVal)) {
                patterns.push({
                    key: uniqueKey,
                    beforeStart: eVal,
                    beforeEnd: pVal,
                    afterStart: lVal,
                    afterEnd: uVal,
                    group, a, c, h, q, ident, rIdent,
                    source: 'P',
                    row: row
                });
            }
        });

        return patterns;
    }

    function findMatchingPattern(coeff, patterns) {
        for (let p of patterns) {
            if (coeff === p.beforeStart) {
                return { ...p, matchedField: 'E' };
            }
            if (coeff === p.beforeEnd) {
                return { ...p, matchedField: 'P' };
            }
        }
        return null;
    }

    // ====================== تابع افزودن به لاگ (با ذخیره در تاریخچه کامل) ======================
    function addRiskLog(message, type) {
        type = type || 'info';
        const logDiv = document.getElementById('risk-log');
        const time = new Date().toLocaleTimeString('fa-IR');
        const fullMessage = `[${time}] ${message}`;

        fullLogHistory.push({ time, message, type, full: fullMessage });

        if (logDiv) {
            const entry = document.createElement('div');
            entry.className = type;
            entry.textContent = fullMessage;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
            if (logDiv.children.length > 100) {
                logDiv.removeChild(logDiv.firstChild);
            }
        }
    }

    // ====================== ۸. ساختار HTML کادر اصلی ======================
    const wrapper = document.createElement('div');
    wrapper.id = 'bot-ui-wrapper';
    wrapper.innerHTML = '<div id="bot-status">⚡ ربات آماده است</div>';

    const toolbar = document.createElement('div');
    toolbar.id = 'bot-toolbar';
    toolbar.innerHTML = `
        <button class="bot-btn dark" id="btn-theme">🌙 شب</button>
        <button class="bot-btn red" id="btn-copy-last">کپی ۵۰</button>
        <button class="bot-btn blue" id="btn-copy-all">کپی همه</button>
        <button class="bot-btn green" id="btn-start">▶ شروع</button>
        <button class="bot-btn red" id="btn-stop">⏹ توقف</button>
    `;
    wrapper.appendChild(toolbar);

    const tabsDiv = document.createElement('div');
    tabsDiv.id = 'bot-tabs';
    tabsDiv.innerHTML = `
        <button class="bot-tab active" data-target="pane-loss">استراتژی شرط</button>
        <button class="bot-tab" data-target="pane-balance">مدیریت موجودی</button>
        <button class="bot-tab" data-target="pane-risk">مدیریت ریسک</button>
    `;
    wrapper.appendChild(tabsDiv);

    // پنل استراتژی شرط
    const paneLoss = document.createElement('div');
    paneLoss.className = 'bot-pane active';
    paneLoss.id = 'pane-loss';
    paneLoss.innerHTML = `
        <div class="bot-row"><span class="bot-label">ضریب:</span><input type="text" class="bot-input" id="loss-coeff" value="2.00" style="max-width:65px;"></div>
        <div class="bot-row">
            <input type="checkbox" id="chk-martingale" checked><label for="chk-martingale">شرط با مارتینگل</label>
            <span class="bot-label" style="min-width:40px;">مبلغ پایه:</span>
            <input type="text" class="bot-input" id="loss-martingale-base" value="1" style="max-width:60px;">
        </div>
        <div class="bot-row">
            <input type="checkbox" id="chk-labouchere"><label for="chk-labouchere">شرط با لابوشر</label>
            <span class="bot-label" style="min-width:40px;">مبلغ پایه:</span>
            <input type="text" class="bot-input" id="loss-lab-base" value="1" style="max-width:60px;">
        </div>
        <div class="bot-row" style="border-top:1px dashed var(--border); padding-top:5px; margin-bottom:5px;">
            <input type="checkbox" id="chk-manual-base"><label for="chk-manual-base" style="font-weight:bold; color:#28a745;">فعال‌سازی مبلغ پایه دستی</label>
        </div>
        <div class="bot-row">
            <span class="bot-label">۴ مرحله بعدی:</span>
            <div class="bot-input-group">
                <input type="text" class="bot-input" id="loss-step1" readonly>
                <input type="text" class="bot-input" id="loss-step2" readonly>
                <input type="text" class="bot-input" id="loss-step3" readonly>
                <input type="text" class="bot-input" id="loss-step4" readonly>
            </div>
        </div>
        <div class="bot-row"><span class="bot-label">کل ضرر تا این دور:</span><input type="text" class="bot-input" id="loss-total" readonly style="max-width:80px;"></div>
        <div class="bot-check-row"><input type="checkbox" id="chk-loss"><label for="chk-loss">فعال‌سازی ربات</label></div>
    `;
    wrapper.appendChild(paneLoss);

    // پنل مدیریت موجودی
    const paneBalance = document.createElement('div');
    paneBalance.className = 'bot-pane';
    paneBalance.id = 'pane-balance';
    paneBalance.innerHTML = `
        <div class="bot-row">
            <span class="bot-label">موجودی پایه فعلی:</span>
            <input type="text" class="bot-input readonly-field" id="base-balance" value="600" readonly style="max-width:80px;">
            <span style="font-size:11px; color:#888;">(در ابتدای کار و پس از هر دور بروزرسانی می‌شود)</span>
        </div>
        <div class="bot-row">
            <span class="bot-label">درصد حد سود:</span>
            <input type="text" class="bot-input" id="balance-profit-percent" value="1" style="max-width:60px;">
            <span>%</span>
        </div>
        <div class="bot-row"><div class="bot-check-row" style="border:none; margin-top:0;">
            <input type="checkbox" id="chk-balance-rule" checked><label for="chk-balance-rule" style="font-weight:bold;">فعال‌سازی محاسبه حد سود روزانه</label>
        </div></div>
        <div class="bot-row"><span class="bot-label">مبلغ حد سود:</span><input type="text" class="bot-input readonly-field" id="balance-profit-amount" readonly style="max-width:80px;"></div>
        <div class="bot-row"><span class="bot-label">جمع کل (هدف):</span><input type="text" class="bot-input readonly-field" id="balance-target" readonly style="max-width:160px;"></div>
    `;
    wrapper.appendChild(paneBalance);

    // پنل مدیریت ریسک
    const paneRisk = document.createElement('div');
    paneRisk.className = 'bot-pane';
    paneRisk.id = 'pane-risk';
    paneRisk.innerHTML = `
        <div class="risk-pane">
            <div class="bot-row">
                <input type="checkbox" id="chk-risk-enable">
                <label for="chk-risk-enable" style="font-weight:bold; color:#28a745;">شرط با داده‌های جدول ۲۸ ستون انجام شود</label>
            </div>
            <div class="bot-row">
                <button class="bot-btn blue" id="btn-scan-vein">🔍 اسکن دستی جدول</button>
                <button class="bot-btn dark" id="btn-copy-full-log">📋 کپی کل لاگ</button>
                <span style="font-size:12px; color:#888;" id="risk-scan-status">وضعیت: آماده</span>
            </div>
            <div class="bot-row">
                <span class="bot-label">تعداد رگه‌ها:</span>
                <span id="risk-vein-count">۰</span>
                <span class="bot-label" style="margin-right:15px;">آخرین ضریب اسکن:</span>
                <span id="risk-last-coeff">-</span>
                <span class="bot-label" style="margin-right:15px;">تعداد صرف‌نظر:</span>
                <span id="risk-skip-count">۰</span>
            </div>
            <div class="bot-row">
                <span class="bot-label">ضریب هدف فعلی:</span>
                <span id="risk-target-display" style="font-weight:bold; color:#ffc107;">-</span>
            </div>
            <div class="risk-log" id="risk-log">
                <div class="info">[${new Date().toLocaleTimeString('fa-IR')}] منتظر فعال‌سازی مدیریت ریسک...</div>
            </div>
        </div>
    `;
    wrapper.appendChild(paneRisk);

    // ====================== ۹. تزریق به صفحه ======================
    function inject() {
        if (!document.body) { setTimeout(inject, 50); return; }
        const selectors = ['.header', '.navbar', '.top-bar', 'header', '#header'];
        let target = null;
        for (const sel of selectors) { target = document.querySelector(sel); if (target) break; }
        if (target) target.before(wrapper);
        else document.body.prepend(wrapper);

        const statsMenu = document.createElement('div');
        statsMenu.id = 'stats-table-outer-container';
        statsMenu.innerHTML = `
            <button class="bot-collapse-btn" id="collapse-btn"><span>📊 جدول مقایسه درصد ضریب</span><span>▶</span></button>
            <div class="bot-collapse-content" id="collapse-content"><div id="statsTableContainer"><table><thead><tr id="header-row-1"><th>ضریب</th><th>منصفانه</th><th>۵۰ دور</th><th>برعکس</th><th>کل تاریخ</th><th>کارمزد</th></tr></thead><tbody id="result-body"></tbody></table></div></div>
        `;
        wrapper.after(statsMenu);

        const veinMenu = document.createElement('div');
        veinMenu.id = 'vein-table-outer-container';
        veinMenu.innerHTML = `
            <button class="vein-collapse-btn" id="vein-collapse-btn"><span>📊 جدول رگه‌های قرمز (۲۸ ستونی - شامل شناسه یکتا و فاصله‌ها)</span><span>▶</span></button>
            <div class="vein-collapse-content" id="vein-collapse-content"><div id="veinTableContainer"></div></div>
        `;
        statsMenu.after(veinMenu);

        document.getElementById('collapse-btn').onclick = function() { 
            const c=document.getElementById('collapse-content'); 
            const i=this.querySelector('span:last-child'); 
            c.classList.toggle('open'); 
            i.textContent=c.classList.contains('open')?'▼':'▶'; 
        };
        document.getElementById('vein-collapse-btn').onclick = function() { 
            const c=document.getElementById('vein-collapse-content'); 
            const i=this.querySelector('span:last-child'); 
            c.classList.toggle('open'); 
            i.textContent=c.classList.contains('open')?'▼':'▶'; 
        };

        document.getElementById('bot-status').textContent = '✅ ربات با موفقیت بارگذاری شد';
        document.querySelectorAll('.bot-input').forEach(input => { input.value = toEng(input.value); });

        setTimeout(() => {
            const domBalance = getCurrentBalanceFromDOM();
            if (domBalance !== null) {
                currentBalance = domBalance;
                document.getElementById('base-balance').value = Math.floor(currentBalance);
                updateBalanceCalc();
                console.log(`موجودی اولیه از سایت خوانده شد: ${currentBalance}`);
            } else {
                console.warn("ربات: امکان خواندن موجودی سایت در ۱۰ ثانیه اول وجود نداشت.");
            }
        }, 10000);

        initializeUI();
        setTimeout(clickGameHistory, 1500);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
    else inject();

    // ====================== ۱۰. توابع به‌روزرسانی موجودی ======================
    function updateBalanceCalc() {
        const baseStr = document.getElementById('base-balance').value;
        const base = parseFloat(baseStr) || 0;
        const percentStr = document.getElementById('balance-profit-percent').value;
        const percent = parseFloat(percentStr) || 0;
        let profit = Math.ceil(base * (percent / 100));
        targetBalance = base + profit;
        document.getElementById('balance-profit-amount').value = profit;
        document.getElementById('balance-target').value = base + ' + ' + profit + ' = ' + targetBalance;
        return targetBalance;
    }

    // ====================== ۱۱. توابع بارگذاری تاریخچه ======================
    function updateStatsTable() {
        const tbody = document.getElementById('result-body');
        if (!tbody) return;
        let lenBust = bustHistory.length;
        let lenFull = fullHistory.length;
        let newRowsHTML = "";
        for (let i = 0; i < STATS_DATA.length; i++) {
            let row = STATS_DATA[i];
            let coeff = row.coeff;
            let fair = row.fair;
            let countBust = 0;
            let countFull = 0;
            for (let j = 0; j < lenBust; j++) { if (bustHistory[j] >= coeff) countBust++; }
            let cVal = lenBust > 0 ? (countBust / lenBust) * 100 : 0;
            let dVal = 100 - cVal;
            for (let k = 0; k < lenFull; k++) { if (fullHistory[k] >= coeff) countFull++; }
            let eVal = lenFull > 0 ? (countFull / lenFull) * 100 : 0;
            let fVal = 0;
            if (fair > 0 && lenBust > 0) { fVal = ((fair - cVal) / fair) * 100; }
            let cText = (lenBust > 0 ? cVal.toFixed(1) : '-') + '%';
            let dText = (lenBust > 0 ? dVal.toFixed(1) : '-') + '%';
            let eText = (lenFull > 0 ? eVal.toFixed(1) : '-') + '%';
            let fText = (lenBust === 0) ? '-' : fVal.toFixed(2) + '%';
            let bgColor = i % 2 === 0 ? '#1a1a1a' : '#2a2a2a';
            newRowsHTML += `<tr id="row-${row.id}" style="background:${bgColor};"><td><b>${coeff.toFixed(2)}</b></td><td>${fair}%</td><td>${cText}</td><td>${dText}</td><td>${eText}</td><td>${fText}</td></tr>`;
        }
        tbody.innerHTML = newRowsHTML;
    }

    // ====================== ۱۲. تابع به‌روزرسانی جدول ۲۸ ستونی ======================
    function updateVeinTableFromHistory() {
        const container = document.getElementById('veinTableContainer');
        if (!container) return;

        if (!fullHistory || fullHistory.length === 0) {
            container.innerHTML = '<p style="color: #aaa; text-align: center;">⏳ هنوز داده‌ای برای تحلیل وجود ندارد. منتظر دریافت تاریخچه...</p>';
            return;
        }

        const rev = [...fullHistory].reverse();
        const veins = [];
        let i = 0;
        const n = rev.length;

        while (i < n) {
            if (rev[i] >= 0.00 && rev[i] <= 1.79) {
                let start = i;
                let vein = [];
                while (i < n && rev[i] >= 0.00 && rev[i] <= 1.79) {
                    vein.push(rev[i]);
                    i++;
                }
                veins.push({
                    startIndex: start,
                    endIndex: i - 1,
                    members: vein,
                    length: vein.length
                });
            } else {
                i++;
            }
        }

        const veinIndexMap = new Map();
        veins.forEach((v, idx) => {
            veinIndexMap.set(v.startIndex, idx);
        });

        const patternMap = new Map();
        for (let v of veins) {
            const key = JSON.stringify(v.members);
            if (!patternMap.has(key)) {
                patternMap.set(key, { pattern: v.members, occurrences: [], count: 0 });
            }
            const entry = patternMap.get(key);
            entry.occurrences.push(v);
            entry.count++;
        }

        const sortedGroups = Array.from(patternMap.values()).sort((a, b) => b.count - a.count);

        function getBeforeAfter(occ) {
            const idx = occ.startIndex;
            let before = (idx > 0) ? rev[idx - 1] : null;
            let after = (occ.endIndex + 1 < n) ? rev[occ.endIndex + 1] : null;
            return { before, after };
        }

        let rows = [];
        let groupNumber = 1;
        for (let grp of sortedGroups) {
            for (let occ of grp.occurrences) {
                const { before, after } = getBeforeAfter(occ);
                const members = occ.members;
                const len = members.length;
                let id = `V${groupNumber}`;
                let type = (len === 1) ? "تکی" : "چند";
                let count = grp.count;
                if (members.length === 0) continue;

                const currentIdx = veinIndexMap.get(occ.startIndex);
                const nextIdx = currentIdx + 1;
                let distance = '-';
                let gapCoeffs = '-';
                let firstGap = '-';
                let lastGap = '-';
                
                if (nextIdx < veins.length) {
                    const nextVein = veins[nextIdx];
                    const gapStart = occ.endIndex + 1;
                    const gapEnd = nextVein.startIndex - 1;
                    if (gapStart <= gapEnd) {
                        const gapArray = rev.slice(gapStart, gapEnd + 1);
                        distance = gapArray.length.toString();
                        gapCoeffs = JSON.stringify(gapArray);
                        firstGap = gapArray[0] !== undefined ? gapArray[0] : '-';
                        lastGap = gapArray[gapArray.length - 1] !== undefined ? gapArray[gapArray.length - 1] : '-';
                    } else {
                        distance = '0';
                        gapCoeffs = '[]';
                        firstGap = '-';
                        lastGap = '-';
                    }
                }

                const firstMember = members[0] || 0;
                const uniqueKey = `${groupNumber}-${occ.startIndex + 1}-${firstMember}`;

                const row = [
                    uniqueKey,
                    groupNumber,
                    occ.startIndex + 1,
                    occ.length,
                    JSON.stringify(members),
                    members[0] || 0,
                    (before !== null ? before : "-"),
                    occ.startIndex + 1,
                    len,
                    JSON.stringify(members),
                    id,
                    count,
                    type,
                    (after !== null ? after : "-"),
                    occ.startIndex + 1,
                    occ.startIndex + 2,
                    len,
                    (before !== null ? before : "-"),
                    JSON.stringify(members),
                    id,
                    count,
                    type,
                    (after !== null ? after : "-"),
                    (occ.endIndex + 2 < n ? rev[occ.endIndex + 2] : "پایان"),
                    distance,
                    gapCoeffs,
                    firstGap,
                    lastGap
                ];
                rows.push(row);
            }
            groupNumber++;
        }

        const headers = [
            "شناسه یکتا",
            "شماره گروه",
            "A – شماره رگه در لیست معکوس",
            "B – تعداد اعداد بین دو رگه",
            "C – دنباله‌های مشابه بین دو رگه",
            "D – اولین عدد بین دو رگه",
            "E – ضریب قبل از رگه مبدأ",
            "F – شماره رگه مبدأ",
            "G – تعداد اعضای رگه مبدأ",
            "H – ضریب‌های رگه مبدأ",
            "I – شناسه رگه مبدأ",
            "J – تعداد تکرار رگه مبدأ",
            "K – نوع رگه مبدأ",
            "L – ضریب بعد از رگه مبدأ (F1)",
            "M – شماره سطر شروع رگه مبدأ",
            "N – شماره رگه مقصد",
            "O – تعداد اعضای رگه مقصد",
            "P – ضریب قبل از رگه مقصد",
            "Q – ضریب‌های رگه مقصد",
            "R – شناسه رگه مقصد",
            "S – تعداد تکرار رگه مقصد",
            "T – نوع رگه مقصد",
            "U – ضریب بعد از رگه مقصد (F2)",
            "V – ضریب آغازین گروه بعدی",
            "فاصله این رگه تا رگه بعدی",
            "ضریب های بین فاصله این رگه تا رگه بعدی",
            "ضریب اول فاصله این رگه تا رگه بعدی",
            "ضریب آخر فاصله این رگه تا رگه بعدی"
        ];

        let html = '<table><thead><tr>';
        for (let h of headers) html += `<th>${h}</th>`;
        html += '</tr></thead><tbody>';

        for (let row of rows) {
            html += '<tr>';
            for (let cell of row) {
                let display = cell;
                if (typeof cell === 'string' && cell.startsWith('[')) {
                    display = `<span class="vein-array">${cell}</span>`;
                } else if (cell === "V1" || cell === "V2" || cell === "V3" || cell === "V4" || cell === "V5" || cell === "V6" || cell === "V7" || cell === "V8" || cell === "V9" || cell === "V10" || cell === "V11" || cell === "V12") {
                    display = `<span class="vein-badge">${cell}</span>`;
                } else if (cell === "تکی" || cell === "چند" || cell === "خارج") {
                    let cls = "vein-badge";
                    if (cell === "تکی") cls += " vein-badge-orange";
                    else if (cell === "چند") cls += " vein-badge-green";
                    else if (cell === "خارج") cls += " vein-badge-purple";
                    display = `<span class="${cls}">${cell}</span>`;
                } else if (typeof cell === 'number' && Number.isInteger(cell) && cell > 0 && cell < 100) {
                    display = `<span class="vein-badge">${cell}</span>`;
                }
                html += `<td>${display}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    // ====================== ۱۳. توابع بارگذاری تاریخچه از DOM ======================
    function autoFetchHistoryFromDOM() {
        if (initialLoadDone) return;
        let rows = document.querySelectorAll('div.crash-row');
        let tempHistory = [];
        rows.forEach(row => {
            let coeffEl = row.querySelector('.h-col-1');
            if (coeffEl) {
                let val = parseFloat(coeffEl.innerText.trim());
                if (!isNaN(val) && val >= 0.00 && val < 100.00) {
                    tempHistory.push(val);
                }
            }
        });
        if (tempHistory.length > 0) {
            bustHistory = tempHistory.slice(-50);
            fullHistory = tempHistory;
            initialLoadDone = true;
            console.log("ربات خودکار شد! " + tempHistory.length + " ضریب بارگذاری شد.");
            updateStatsTable();
            updateLossSequence();
            updateVeinTableFromHistory();
            setTimeout(() => {
                if (riskEnabled) {
                    const patterns = scanVeinTable();
                    document.getElementById('risk-vein-count').textContent = patterns.length;
                    addRiskLog('اسکن خودکار جدول پس از بارگذاری تاریخچه انجام شد. تعداد الگوها: ' + patterns.length, 'info');
                }
            }, 500);
        } else {
            setTimeout(autoFetchHistoryFromDOM, 1000);
        }
    }

    function clickGameHistory() {
        if (historyClickedOnce) return;
        let element = document.evaluate("//*[contains(text(), 'تاریخچه بازی')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click(); 
            historyClickedOnce = true;
            setTimeout(autoFetchHistoryFromDOM, 2500);
        } else {
            setTimeout(clickGameHistory, 1000);
        }
    }

    // ====================== ۱۴. المنت‌های سایت ======================
    let t_priceAmount, t_cashoutProduct, t_setCashBtn;
    function findSiteElements() {
        t_priceAmount = document.querySelector('.game-amount');
        t_cashoutProduct = document.querySelector('.cashout-amount');
        t_setCashBtn = document.querySelector('.place-bet');
    }
    setTimeout(findSiteElements, 500);

    // ====================== ۱۵. توابع استراتژی ======================
    function updateLossSequence() {
        const coeff = parseFloat(document.getElementById('loss-coeff').value) || 2;
        const strategy = getStrategyType(coeff);
        let displaySeq = [];
        if (strategy === 'MARTINGALE') {
            let base = parseFloat(document.getElementById('loss-martingale-base').value) || 1;
            const chkManual = document.getElementById('chk-manual-base');
            if (!chkManual.checked) { base = calculateDynamicBase(coeff); document.getElementById('loss-martingale-base').value = base; }
            let simCurrentIdx = currentSeqIdx;
            let simTotalLoss = totalLoss;
            for (let i = 0; i < 4; i++) {
                let val;
                if (simCurrentIdx === 0) val = Math.ceil(base);
                else val = Math.ceil((simTotalLoss + base) / (coeff - 1));
                displaySeq.push(val);
                simTotalLoss += val;
                simCurrentIdx++;
            }
        } else if (strategy === 'LABOUCHERE') {
            let seq = strategyConfig.sequence;
            let baseAmt = parseFloat(document.getElementById('loss-lab-base').value) || 1;
            const chkManual = document.getElementById('chk-manual-base');
            if (!chkManual.checked) { baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-lab-base').value = baseAmt; }
            else if (!seq || seq.length === 0 || baseAmt !== strategyConfig.baseAmount) { seq = [1, 2, 3].map(x => Math.ceil(x * baseAmt)); strategyConfig.sequence = seq; strategyConfig.baseAmount = baseAmt; }
            for (let i = 0; i < 4; i++) { if (i < seq.length) displaySeq.push(seq[i]); else displaySeq.push(0); }
        } else {
            const fullSeq = SEQUENCES[coeff.toFixed(2)];
            for (let i = 0; i < 4; i++) { let idx = currentSeqIdx + i; if (idx < fullSeq.length) displaySeq.push(fullSeq[idx]); else displaySeq.push(0); }
        }
        document.getElementById('loss-step1').value = displaySeq[0] || '0';
        document.getElementById('loss-step2').value = displaySeq[1] || '0';
        document.getElementById('loss-step3').value = displaySeq[2] || '0';
        document.getElementById('loss-step4').value = displaySeq[3] || '0';
        updateLossTotalUI();
    }

    function updateLossTotalUI() {
        const lossTotalInput = document.getElementById('loss-total');
        if (lossTotalInput) lossTotalInput.value = Math.floor(totalLoss);
    }

    function resetState() {
        currentSeqIdx = 0;
        totalLoss = 0;
        lastPlacedBet = 0;
        const coeff = parseFloat(document.getElementById('loss-coeff').value) || 2;
        const strategy = getStrategyType(coeff);
        const chkManual = document.getElementById('chk-manual-base');
        if (strategy === 'LABOUCHERE') {
            let baseAmt;
            if (chkManual.checked) baseAmt = parseFloat(document.getElementById('loss-lab-base').value) || 1;
            else { baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-lab-base').value = baseAmt; }
            strategyConfig.sequence = [1, 2, 3].map(x => Math.ceil(x * baseAmt));
            strategyConfig.baseAmount = baseAmt;
        } else if (strategy === 'MARTINGALE') {
            let baseAmt;
            if (chkManual.checked) baseAmt = parseFloat(document.getElementById('loss-martingale-base').value) || 1;
            else { baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-martingale-base').value = baseAmt; }
            strategyConfig.baseAmount = baseAmt;
        }
        updateLossSequence();
        updateLossTotalUI();
    }

    function getBetAmount() {
        const cfg = strategyConfig;
        if (!cfg) return 0;
        const strategy = getStrategyType(cfg.multiplier);
        if (strategy === 'MARTINGALE') {
            const base = cfg.baseAmount;
            if (currentSeqIdx === 0) return Math.ceil(base);
            let bet = Math.ceil((totalLoss + base) / (cfg.multiplier - 1));
            return bet;
        } else if (strategy === 'LABOUCHERE') {
            if (!cfg.sequence || cfg.sequence.length === 0) { const baseAmt = cfg.baseAmount; cfg.sequence = [1, 2, 3].map(x => Math.ceil(x * baseAmt)); }
            let bet = Math.ceil(cfg.sequence[0] + cfg.sequence[cfg.sequence.length - 1]);
            return bet;
        } else {
            const coeffKey = cfg.multiplier.toFixed(2);
            let seq = SEQUENCES[coeffKey] || [];
            if (currentSeqIdx < seq.length) return seq[currentSeqIdx];
            else { isStrategyActive = false; return 0; }
        }
    }

    // ====================== ۱۶. هوک‌های بازی با منطق جدید جبران ======================
    function safeHook() {
        if (typeof window.game_waiting === 'function') {
            const orig = window.game_waiting;
            window.game_waiting = function(data) {
                // ===== تصمیم‌گیری برای شرط‌بندی =====
                let shouldBet = false;
                let betMultiplier = 1;

                if (recoveryMode) {
                    // در حالت جبران: بدون توجه به تطابق، شرط ببند
                    shouldBet = true;
                    betMultiplier = recoveryMultiplier;
                    addRiskLog(`🔄 حالت جبران: شرط با مبلغ ${BASE_BET * betMultiplier} بسته می‌شود`, 'info');
                } else {
                    // حالت عادی: فقط در صورت تطابق شرط ببند
                    if (riskEnabled && matchFound) {
                        shouldBet = true;
                        betMultiplier = 1;
                    } else if (!riskEnabled) {
                        shouldBet = true;
                        betMultiplier = 1;
                    }
                }

                if (isRunning && isStrategyActive && shouldBet) {
                    let bet = Math.ceil(BASE_BET * betMultiplier);
                    const strategy = getStrategyType(strategyConfig.multiplier);
                    if (strategy === 'LABOUCHERE' && !recoveryMode) {
                        bet = getBetAmount();
                    }
                    lastPlacedBet = bet;

                    if (!t_priceAmount || !t_cashoutProduct || !t_setCashBtn) findSiteElements();
                    if (bet > 0 && t_priceAmount && t_cashoutProduct && t_setCashBtn) {
                        t_priceAmount.value = bet;
                        t_cashoutProduct.value = strategyConfig.multiplier;
                        setTimeout(() => t_setCashBtn.click(), 150);
                        addRiskLog(`💰 شرط بسته شد: مبلغ ${bet} - ضریب ${strategyConfig.multiplier}`, 'bet');
                    }
                } else {
                    if (!recoveryMode) addRiskLog(`⏸️ شرط بسته نشد (عدم تطابق یا غیرفعال)`, 'info');
                }
                orig.call(this, data);
            };
        }

        if (typeof window.game_busted === 'function') {
            const orig = window.game_busted;
            window.game_busted = function(data) {
                const result = data.amount / 100;

                // ===== به‌روزرسانی تاریخچه =====
                if (result > 0) {
                    fullHistory.unshift(result);
                    bustHistory.unshift(result);
                    if (bustHistory.length > 50) bustHistory.pop();
                    updateStatsTable();
                    updateVeinTableFromHistory();
                }

                // ===== مدیریت ریسک (تشخیص تطابق) =====
                if (riskEnabled) {
                    const patterns = scanVeinTable();
                    const match = findMatchingPattern(result, patterns);
                    if (match) {
                        matchFound = true;
                        let target = null;
                        if (match.afterStart > 0) target = match.afterStart;
                        else if (match.afterEnd > 0) target = match.afterEnd;
                        if (target !== null && target > 1.0) {
                            riskTargetMultiplier = target;
                            document.getElementById('loss-coeff').value = target.toFixed(2);
                            updateLossSequence();
                            document.getElementById('risk-target-display').textContent = target.toFixed(2);
                            const details = `گروه:${match.group} | A:${match.a} | شناسه:${match.key} | L:${match.afterStart} | U:${match.afterEnd}`;
                            addRiskLog(`✅ تطابق با ${match.matchedField} (${details}) → ضریب هدف: ${target.toFixed(2)}`, 'match');
                        } else {
                            matchFound = false;
                            addRiskLog(`⚠️ ضریب هدف نامعتبر (L=${match.afterStart}, U=${match.afterEnd})`, 'info');
                        }
                    } else {
                        matchFound = false;
                        riskSkipCount++;
                        document.getElementById('risk-skip-count').textContent = riskSkipCount;
                        addRiskLog(`❌ عدم تطابق برای ضریب ${result.toFixed(2)} (تعداد صرف‌نظر: ${riskSkipCount})`, 'nomatch');
                    }
                    document.getElementById('risk-last-coeff').textContent = result.toFixed(2);
                    document.getElementById('risk-vein-count').textContent = patterns.length;
                    document.getElementById('risk-scan-status').textContent = `🔄 آخرین بروزرسانی: ${new Date().toLocaleTimeString('fa-IR')}`;
                } else {
                    matchFound = true;
                }

                // ===== مدیریت شرط‌بندی و مارتینگل با جبران =====
                if (isRunning && isStrategyActive && lastPlacedBet > 0) {
                    if (result >= strategyConfig.multiplier) {
                        // برد
                        addRiskLog(`🎉 شرط با مبلغ ${lastPlacedBet} و ضریب ${strategyConfig.multiplier} برنده شد!`, 'match');
                        recoveryMode = false;
                        recoveryMultiplier = 1;
                        currentSeqIdx = 0;
                        totalLoss = 0;
                        matchFound = false;
                        updateLossSequence();
                        updateLossTotalUI();
                        addRiskLog(`🔄 مارتینگل ریست شد. اولویت به تطابق برگشت.`, 'info');
                    } else {
                        // باخت
                        addRiskLog(`❌ شرط با مبلغ ${lastPlacedBet} و ضریب ${strategyConfig.multiplier} باخت!`, 'nomatch');
                        recoveryMode = true;
                        recoveryMultiplier *= 2;
                        totalLoss += lastPlacedBet;
                        currentSeqIdx++;
                        updateLossSequence();
                        updateLossTotalUI();
                        addRiskLog(`🔄 حالت جبران فعال شد. مبلغ شرط بعدی: ${BASE_BET * recoveryMultiplier}`, 'info');
                    }
                }

                // ===== مدیریت موجودی و حد سود =====
                if (isRunning && isStrategyActive) {
                    const chkBalanceRule = document.getElementById('chk-balance-rule');
                    if (chkBalanceRule && chkBalanceRule.checked) {
                        const domBalance = getCurrentBalanceFromDOM();
                        if (domBalance !== null) {
                            currentBalance = domBalance;
                            document.getElementById('base-balance').value = Math.floor(currentBalance);
                            updateBalanceCalc();
                            if (currentBalance >= targetBalance) {
                                isRunning = false;
                                document.getElementById('bot-status').textContent = '✅ حد سود روزانه محقق شد! ربات متوقف شد.';
                                addRiskLog(`🎯 حد سود محقق شد! موجودی: ${currentBalance}`, 'info');
                            }
                        }
                    }
                }
                orig.call(this, data);
            };
        }
    }

    // ====================== ۱۷. راه‌اندازی رویدادها و دکمه‌ها ======================
    function initializeUI() {
        const profitPercentInput = document.getElementById('balance-profit-percent');
        if (profitPercentInput) profitPercentInput.addEventListener('input', updateBalanceCalc);

        document.querySelectorAll('.bot-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.bot-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.bot-pane').forEach(p => p.classList.remove('active'));
                document.getElementById(this.dataset.target).classList.add('active');
            });
        });

        document.getElementById('chk-martingale').addEventListener('change', function() {
            if (this.checked) { document.getElementById('chk-labouchere').checked = false; if (document.getElementById('chk-loss').checked) resetState(); updateLossSequence(); }
            else { if (!document.getElementById('chk-labouchere').checked) { document.getElementById('chk-labouchere').checked = true; if (document.getElementById('chk-loss').checked) resetState(); updateLossSequence(); } }
        });
        document.getElementById('chk-labouchere').addEventListener('change', function() {
            if (this.checked) { document.getElementById('chk-martingale').checked = false; if (document.getElementById('chk-loss').checked) resetState(); updateLossSequence(); }
            else { if (!document.getElementById('chk-martingale').checked) { document.getElementById('chk-martingale').checked = true; if (document.getElementById('chk-loss').checked) resetState(); updateLossSequence(); } }
        });

        document.getElementById('loss-lab-base').addEventListener('input', function() { if (document.getElementById('chk-labouchere').checked) updateLossSequence(); });
        document.getElementById('loss-martingale-base').addEventListener('input', function() { if (document.getElementById('chk-martingale').checked) updateLossSequence(); });

        document.getElementById('loss-coeff').addEventListener('input', function() {
            const coeff = parseFloat(this.value) || 2;
            const chkManual = document.getElementById('chk-manual-base');
            if (!chkManual.checked) { const baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-lab-base').value = baseAmt; document.getElementById('loss-martingale-base').value = baseAmt; }
            if (document.getElementById('chk-loss').checked) resetState();
            updateLossSequence();
        });

        document.getElementById('chk-loss').addEventListener('change', function() {
            if (this.checked) { 
                const coeff = parseFloat(document.getElementById('loss-coeff').value) || 2; 
                const strategy = getStrategyType(coeff);
                const chkManual = document.getElementById('chk-manual-base');
                let baseAmt = 1;
                if (strategy === 'MARTINGALE') {
                    if (chkManual.checked) baseAmt = parseFloat(document.getElementById('loss-martingale-base').value) || 1;
                    else { baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-martingale-base').value = baseAmt; }
                    strategyConfig = { type:'martingale', multiplier:coeff, baseAmount:baseAmt, sequence:[] }; 
                } else if (strategy === 'LABOUCHERE') {
                    if (chkManual.checked) baseAmt = parseFloat(document.getElementById('loss-lab-base').value) || 1;
                    else { baseAmt = calculateDynamicBase(coeff); document.getElementById('loss-lab-base').value = baseAmt; }
                    const labSeq = [1, 2, 3].map(x => Math.ceil(x * baseAmt));
                    strategyConfig = { type:'labouchere', multiplier:coeff, baseAmount:baseAmt, sequence:labSeq }; 
                } else { strategyConfig = { type:'loss-chase', multiplier:coeff, baseAmount:1, sequence:[] }; }
                isStrategyActive = true;
                resetState();
            } else { isStrategyActive = false; }
        });

        document.getElementById('btn-start').onclick = () => { 
            if (isStrategyActive) { 
                isRunning = true; 
                matchFound = true;
                document.getElementById('bot-status').textContent = '▶ ربات در حال اجرا';
                addRiskLog('▶ ربات شروع به کار کرد', 'info');
            } else { 
                alert('ابتدا حالت شرط‌بندی را انتخاب و تیک بزنید.'); 
            } 
        };
        document.getElementById('btn-stop').onclick = () => { 
            isRunning = false; 
            document.getElementById('bot-status').textContent = '⏸ ربات متوقف شد';
            addRiskLog('⏸ ربات متوقف شد', 'info');
        };
        
        let night = false;
        document.getElementById('btn-theme').onclick = function() { 
            night = !night; 
            wrapper.classList.toggle('bot-night', night); 
            this.textContent = night ? '☀️ روز' : '🌙 شب'; 
        };

        document.getElementById('btn-copy-last').onclick = function() {
            const originalText = this.textContent;
            if (!bustHistory || bustHistory.length === 0) { alert("ابتدا باید ضرایب بارگذاری شوند!"); return; }
            var formatted = bustHistory.map(v => v.toFixed(2) + "---\n").join('');
            navigator.clipboard.writeText(formatted).then(() => {
                this.textContent = "کپی شد ✅";
                this.style.background = "#17a2b8";
                setTimeout(() => { this.textContent = originalText; this.style.background = "#dc3545"; }, 2000);
            }).catch(err => alert("خطا در کپی: " + err));
        };

        document.getElementById('btn-copy-all').onclick = function() {
            const originalText = this.textContent;
            if (!fullHistory || fullHistory.length === 0) { alert("هیچ ضریبی برای کپی وجود ندارد!"); return; }
            var formatted = fullHistory.map(v => v.toFixed(2) + "---\n").join('');
            navigator.clipboard.writeText(formatted).then(() => {
                this.textContent = "کپی شد ✅";
                this.style.background = "#17a2b8";
                setTimeout(() => { this.textContent = originalText; this.style.background = "#007bff"; }, 2000);
            }).catch(err => alert("خطا در کپی: " + err));
        };

        // دکمه کپی کل لاگ
        document.getElementById('btn-copy-full-log').onclick = function() {
            const originalText = this.textContent;
            if (!fullLogHistory || fullLogHistory.length === 0) {
                alert("لاگی برای کپی وجود ندارد!");
                return;
            }
            const fullLogText = fullLogHistory.map(item => item.full).join('\n');
            navigator.clipboard.writeText(fullLogText).then(() => {
                this.textContent = "📋 کپی شد ✅";
                this.style.background = "#17a2b8";
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = "#333";
                }, 2000);
            }).catch(err => alert("خطا در کپی: " + err));
        };

        const chkRisk = document.getElementById('chk-risk-enable');
        const btnScan = document.getElementById('btn-scan-vein');
        const riskStatusSpan = document.getElementById('risk-scan-status');
        const countSpan = document.getElementById('risk-vein-count');

        function performScan() {
            const patterns = scanVeinTable();
            countSpan.textContent = patterns.length;
            riskStatusSpan.textContent = '✅ اسکن انجام شد';
            addRiskLog('🔍 اسکن دستی جدول انجام شد. تعداد الگوها: ' + patterns.length, 'info');
            return patterns;
        }

        if (btnScan) {
            btnScan.addEventListener('click', performScan);
        }

        if (chkRisk) {
            chkRisk.addEventListener('change', function() {
                riskEnabled = this.checked;
                if (this.checked) {
                    riskStatusSpan.textContent = '🔄 فعال - در حال اسکن...';
                    const patterns = performScan();
                    if (patterns.length === 0) {
                        addRiskLog('⚠️ هیچ الگویی در جدول یافت نشد!', 'info');
                    } else {
                        addRiskLog('✅ مدیریت ریسک فعال شد. ' + patterns.length + ' الگو شناسایی شد.', 'info');
                        document.getElementById('bot-status').textContent = '🛡️ مدیریت ریسک فعال - منتظر تطابق الگو';
                    }
                } else {
                    riskStatusSpan.textContent = '⏸ غیرفعال';
                    matchFound = true;
                    addRiskLog('⏸ مدیریت ریسک غیرفعال شد.', 'info');
                    document.getElementById('bot-status').textContent = '⚡ ربات آماده است';
                }
            });
        }

        setTimeout(() => {
            if (document.getElementById('chk-risk-enable') && document.getElementById('chk-risk-enable').checked) {
                performScan();
            }
        }, 3000);

        updateBalanceCalc();
    }

    // ====================== ۱۸. راه‌اندازی نهایی ======================
    setTimeout(safeHook, 1000);
    console.log('🤖 ربات نهایی با جبران ضرر اولویت‌دار، شناسه یکتای پیشرفته، کپی کل لاگ و جدول ۲۸ ستونی بارگذاری شد.');
})();
