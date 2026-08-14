(function() {
    "use strict";

    // ====================== ۱. استایل‌ها ======================
    const style = document.createElement('style');
    style.textContent = `
        #bot-ui-wrapper {
            direction: rtl; text-align: right; font-family: Tahoma, sans-serif;
            --bg: #fff; --text: #333; --border: #ddd; --shadow: rgba(0,0,0,0.1);
            background: #f8f9fa; border: 2px solid #28a745; border-radius: 12px;
            padding: 10px; margin: 10px auto; max-width: 600px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            position: relative; z-index: 9999;
        }
        #bot-ui-wrapper.bot-night {
            --bg: #222; --text: #eee; --border: #444; --shadow: rgba(255,255,255,0.1);
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
            background: var(--hover); color: var(--text); font-size: 14px; text-align: center;
        }
        .bot-input.readonly-field { background: #e9ecef; color: #495057; font-weight: bold; }
        .bot-input-group { display: flex; gap: 4px; flex: 1; flex-wrap: wrap; }

        #bot-status { text-align: center; font-size: 14px; font-weight: bold; color: #222; margin-bottom: 6px; }
        .bot-night #bot-status { color: #eee; }

        #stats-table-outer-container {
            direction: rtl; text-align: right; max-width: 600px; margin: 10px auto; box-sizing: border-box;
        }
        .bot-collapse-btn {
            width: 100%; background: #000; color: white; padding: 10px; border: none;
            border-radius: 6px 6px 0 0; font-weight: bold; display: flex; justify-content: space-between;
            cursor: pointer;
        }
        .bot-collapse-content {
            display: none; border: 1px solid #555; border-top: none; padding: 10px;
            background: #000; color: white; overflow-x: auto;
        }
        .bot-collapse-content.open { display: block; }

        #statsTableContainer {
            border: 1px solid #555; padding: 10px; border-radius: 5px; background: black;
            color: white; direction: rtl; text-align: right; width: 100%; box-sizing: border-box;
        }
        #statsTableContainer table { width: 100%; border-collapse: collapse; font-size: 11px; color: white; }
        #statsTableContainer th, #statsTableContainer td {
            border: 1px solid #555; padding: 4px 3px; text-align: center; vertical-align: middle;
        }
        #statsTableContainer th { background: #333; color: white; }
        #statsTableContainer tbody tr:nth-child(even) { background: #1a1a1a; }
        #statsTableContainer tbody tr:hover { background: #2a2a2a; }
        
        .bot-night #statsTableContainer { background: #111; border-color: #444; }
        .bot-night #statsTableContainer th { background: #222; }
        .bot-night #statsTableContainer td { border-color: #444; }
        .bot-night .bot-collapse-btn { background: #222; }
        
        /* استایل پنل الگوها */
        .pattern-status-box {
            background: #1a1a1a; color: #0f0; padding: 8px 12px; border-radius: 4px;
            font-family: monospace; font-size: 13px; border: 1px solid #333; margin-top: 6px;
            text-align: center;
        }
        .pattern-log-box {
            max-height: 100px; overflow-y: auto; background: #111; color: #aaa;
            padding: 6px; border-radius: 4px; font-size: 11px; direction: ltr; border: 1px solid #333;
            margin-top: 6px; text-align: left;
        }
        .pattern-log-box .match { color: #0f0; }
        .pattern-log-box .nomatch { color: #f00; }
        .pattern-log-box .info { color: #ffc107; }
        .pattern-log-box .bet { color: #00bfff; }
        .pattern-log-box .step { color: #ff9800; }

        /* استایل جدول ثبت رگه‌های منحصربه‌فرد */
        #vein-registry-container {
            margin-top: 15px;
            border-top: 1px solid #555;
            padding-top: 15px;
            overflow-x: auto; /* اسکرول افقی */
            white-space: nowrap;
        }
        #vein-registry-container table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            color: #eee;
            min-width: 900px; /* عرض حداقل برای نمایش کامل ستون‌ها */
        }
        #vein-registry-container th, #vein-registry-container td {
            border: 1px solid #444;
            padding: 6px 4px;
            text-align: center;
            vertical-align: middle;
        }
        #vein-registry-container th {
            background: #2a2a2a;
            color: #ffc107;
        }
        #vein-registry-container tbody tr:nth-child(even) {
            background: #1a1a1a;
        }
        #vein-registry-container tbody tr:hover {
            background: #2f2f2f;
        }
        .vein-members-cell {
            font-family: monospace;
            font-size: 10px;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            direction: ltr;
            text-align: left;
        }
        .vein-id-badge {
            display: inline-block;
            background: #6f42c1;
            color: white;
            border-radius: 10px;
            padding: 0 6px;
            font-weight: bold;
            font-size: 10px;
        }
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

    // ====================== ۳. متغیرهای اصلی ======================
    let isRunning = false, isStrategyActive = false;
    let strategyConfig = { type: 'martingale', multiplier: 2.00, baseAmount: 1, sequence: [] };
    let currentSeqIdx = 0, totalLoss = 0;
    let lastPlacedBet = 0;
    let betPlaced = false;
    let currentBalance = 600;
    let fixedTarget = 0;
    let bustHistory = [];
    let fullHistory = [];
    let initialLoadDone = false;
    let historyClickedOnce = false;

    // ===== متغیرهای الگوها =====
    let greenPatternEnabled = false;
    let structuralPatternEnabled = false;
    let allGreenPatterns = [];
    let patternLog = [];

    // ===== ثبت‌کننده رگه‌های منحصربه‌فرد (جدید) =====
    let veinRegistry = []; // آرایه‌ای از اشیاء با ساختار: { id, key, type, length, members, coeffBefore, afterCoeff, occurrenceCount }
    let nextVeinId = 1;

    // ===== متغیرهای حالت سه‌مرحله‌ای =====
    let stateMachine = {
        step: 0,
        members: [],
        currentIndex: 0,
        coeffBefore: 0,
        afterCoeff: 0,
        matchFound: false,
        targetVeinId: 0 // شناسه رگه هدف در ثبت‌کننده
    };

    // ====================== ۴. توابع استخراج رگه و ثبت‌کننده ======================
    function extractVeins(history) {
        const rev = [...history].reverse();
        const veins = [];
        let i = 0;
        const n = rev.length;
        while (i < n) {
            let type = null;
            let condition = false;
            if (rev[i] >= 0 && rev[i] <= 1.79) { type = 'قرمز'; condition = true; } 
            else if (rev[i] >= 1.80 && rev[i] < 100) { type = 'سبز'; condition = true; }
            if (condition && type !== null) {
                const members = [];
                while (i < n && ((type === 'قرمز' && rev[i] >= 0 && rev[i] <= 1.79) || 
                                 (type === 'سبز' && rev[i] >= 1.80 && rev[i] < 100))) {
                    members.push(rev[i]);
                    i++;
                }
                const startIndex = i - members.length;
                const endIndex = i - 1;
                const afterCoeff = (endIndex + 1 < n) ? rev[endIndex + 1] : null;
                
                veins.push({ 
                    startIndex, 
                    endIndex, 
                    members, 
                    length: members.length, 
                    type,
                    afterCoeff: afterCoeff
                });
            } else { i++; }
        }
        return veins;
    }

    // تولید کلید منحصربه‌فرد برای رگه (نوع + طول + اعضا)
    function generateVeinKey(vein) {
        return `${vein.type}_${vein.length}_${JSON.stringify(vein.members)}`;
    }

    // به‌روزرسانی ثبت‌کننده رگه‌ها و جدول
    function updateVeinRegistry(history) {
        const veins = extractVeins(history);
        const registryMap = new Map(); // برای تشخیص رگه‌های موجود در آرایه فعلی
        
        // ابتدا همه رگه‌های موجود در تاریخچه را به نقشه اضافه می‌کنیم
        for (const v of veins) {
            const key = generateVeinKey(v);
            if (!registryMap.has(key)) {
                registryMap.set(key, { count: 0, beforeCoeff: null, afterCoeff: v.afterCoeff });
            }
            registryMap.get(key).count++;
        }

        // حالا ثبت‌کننده را با نقشه مقایسه و بروزرسانی می‌کنیم
        // ۱. حذف رگه‌هایی که دیگر در تاریخچه نیستند (اختیاری، فعلاً نگه می‌داریم اما تعداد را صفر می‌کنیم)
        for (let i = 0; i < veinRegistry.length; i++) {
            const regItem = veinRegistry[i];
            const mapItem = registryMap.get(regItem.key);
            if (mapItem) {
                regItem.occurrenceCount = mapItem.count;
                regItem.afterCoeff = mapItem.afterCoeff;
            } else {
                regItem.occurrenceCount = 0; // اگر رگه حذف شده باشد
            }
        }

        // ۲. اضافه کردن رگه‌های جدید به ثبت‌کننده
        for (const [key, value] of registryMap) {
            const exists = veinRegistry.some(item => item.key === key);
            if (!exists) {
                // پیدا کردن نمونه‌ای از این رگه برای استخراج اطلاعات
                const sampleVein = veins.find(v => generateVeinKey(v) === key);
                if (sampleVein) {
                    // پیدا کردن ضریب قبل از شروع
                    const rev = [...history].reverse();
                    const coeffBefore = (sampleVein.startIndex > 0) ? rev[sampleVein.startIndex - 1] : null;
                    
                    veinRegistry.push({
                        id: nextVeinId++,
                        key: key,
                        type: sampleVein.type,
                        length: sampleVein.length,
                        members: sampleVein.members,
                        coeffBefore: coeffBefore || 0,
                        afterCoeff: sampleVein.afterCoeff || 0,
                        occurrenceCount: value.count
                    });
                }
            }
        }

        // مرتب‌سازی بر اساس شناسه
        veinRegistry.sort((a, b) => a.id - b.id);
        
        // رندر جدول
        renderVeinRegistryTable();
    }

    // رندر جدول ثبت‌کننده رگه‌ها
    function renderVeinRegistryTable() {
        const container = document.getElementById('vein-registry-container');
        if (!container) return;

        if (veinRegistry.length === 0) {
            container.innerHTML = '<div style="text-align:center; color:#888; padding:10px;">هیچ رگه‌ای تاکنون ثبت نشده است.</div>';
            return;
        }

        let html = `<table>
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>نوع</th>
                    <th>طول</th>
                    <th>اعضای رگه</th>
                    <th>ضریب قبل</th>
                    <th>ضریب بعد</th>
                    <th>تعداد تکرار</th>
                </tr>
            </thead>
            <tbody>`;
        
        for (const item of veinRegistry) {
            const color = item.type === 'سبز' ? '#28a745' : '#dc3545';
            const membersStr = item.members.map(m => m.toFixed(2)).join(', ');
            html += `<tr>
                <td><span class="vein-id-badge">${item.id}</span></td>
                <td style="color:${color}; font-weight:bold;">${item.type}</td>
                <td>${item.length}</td>
                <td class="vein-members-cell" title="${membersStr}">${membersStr}</td>
                <td>${item.coeffBefore > 0 ? item.coeffBefore.toFixed(2) : '-'}</td>
                <td>${item.afterCoeff > 0 ? item.afterCoeff.toFixed(2) : '-'}</td>
                <td>${item.occurrenceCount}</td>
            </tr>`;
        }
        html += `</tbody></table>`;
        container.innerHTML = html;
    }

    // ====================== ۵. توابع استراتژی و موجودی ======================
    function generateGreenPatterns(history) {
        const veins = extractVeins(history);
        const rev = [...history].reverse();
        const n = rev.length;
        const patterns = [];

        for (const v of veins) {
            if (v.type !== 'سبز') continue;
            const idx = v.startIndex;
            const beforeStart = (idx > 0) ? rev[idx - 1] : null;
            const beforeEnd = (v.endIndex > 0) ? rev[v.endIndex - 1] : null;

            if (beforeStart !== null && beforeStart > 0) {
                patterns.push({ type: 'سبز', key: `سبز_${beforeStart}`, beforeStart, beforeEnd: beforeEnd || 0 });
            }
            if (beforeEnd !== null && beforeEnd > 0 && beforeEnd !== beforeStart) {
                patterns.push({ type: 'سبز', key: `سبز_${beforeEnd}`, beforeStart: beforeStart || 0, beforeEnd });
            }
        }
        return patterns;
    }

    function findMatchingGreenPattern(coeff, patterns) {
        const filtered = patterns.filter(p => p.type === 'سبز');
        for (const p of filtered) {
            if (coeff === p.beforeStart || coeff === p.beforeEnd) {
                return p;
            }
        }
        return null;
    }

    function calculateDynamicBase(coeff) {
        if (coeff <= 1.0) return 1; 
        return Math.ceil(1 / (coeff - 1));
    }

    function getStrategyType() {
        const chkMartingale = document.getElementById('chk-martingale');
        const chkLabouchere = document.getElementById('chk-labouchere');
        if (chkMartingale && chkMartingale.checked) return 'MARTINGALE';
        if (chkLabouchere && chkLabouchere.checked) return 'LABOUCHERE';
        return 'LABOUCHERE';
    }

    function updateLossSequence() {
        const coeff = 2.00;
        const strategy = getStrategyType();
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
        stateMachine = { step: 0, members: [], currentIndex: 0, coeffBefore: 0, afterCoeff: 0, matchFound: false, targetVeinId: 0 };
        const coeff = 2.00;
        const strategy = getStrategyType();
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
        strategyConfig.multiplier = 2.00;
        updateLossSequence();
        updateLossTotalUI();
    }

    function getBetAmount() {
        const cfg = strategyConfig;
        if (!cfg) return 0;
        const strategy = getStrategyType();
        if (strategy === 'MARTINGALE') {
            const base = cfg.baseAmount;
            if (currentSeqIdx === 0) return Math.ceil(base);
            let bet = Math.ceil((totalLoss + base) / (cfg.multiplier - 1));
            return bet;
        } else if (strategy === 'LABOUCHERE') {
            if (!cfg.sequence || cfg.sequence.length === 0) { const baseAmt = cfg.baseAmount; cfg.sequence = [1, 2, 3].map(x => Math.ceil(x * baseAmt)); }
            let bet = Math.ceil(cfg.sequence[0] + cfg.sequence[cfg.sequence.length - 1]);
            return bet;
        }
        return 0;
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

    function calculateFixedTarget() {
        const balance = parseFloat(document.getElementById('base-balance').value) || 0;
        const percent = parseFloat(document.getElementById('balance-profit-percent').value) || 0;
        const profit = Math.ceil(balance * (percent / 100));
        fixedTarget = balance + profit;
        document.getElementById('balance-profit-amount').value = profit;
        document.getElementById('balance-target').value = balance + ' + ' + profit + ' = ' + fixedTarget;
        return fixedTarget;
    }

    function updateStatsTable() {
        const tbody = document.getElementById('result-body');
        if (!tbody) return;
        let lenBust = bustHistory.length;
        let lenFull = fullHistory.length;
        let newRowsHTML = "";
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

    function clickGameHistory() {
        if (historyClickedOnce) return;
        let element = document.evaluate("//*[contains(text(), 'تاریخچه بازی')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) { element.click(); historyClickedOnce = true; setTimeout(autoFetchHistoryFromDOM, 2500); }
        else { setTimeout(clickGameHistory, 1000); }
    }

    function autoFetchHistoryFromDOM() {
        if (initialLoadDone) return;
        let rows = document.querySelectorAll('div.crash-row');
        let tempHistory = [];
        rows.forEach(row => {
            let coeffEl = row.querySelector('.h-col-1');
            if (coeffEl) {
                let val = parseFloat(coeffEl.innerText.trim());
                if (!isNaN(val) && val >= 0.00 && val < 100.00) tempHistory.push(val);
            }
        });
        if (tempHistory.length > 0) {
            bustHistory = tempHistory.slice(-50);
            fullHistory = tempHistory;
            initialLoadDone = true;
            updateStatsTable();
            updateLossSequence();
            updateAllPatterns();
            document.getElementById('pattern-status').textContent = `✅ بارگذاری شد (تعداد ضرایب: ${fullHistory.length})`;
        } else {
            setTimeout(autoFetchHistoryFromDOM, 1000);
        }
    }

    // ====================== ۶. به‌روزرسانی الگوها ======================
    function updateAllPatterns() {
        if (fullHistory.length < 5) {
            allGreenPatterns = [];
            document.getElementById('green-pattern-count').textContent = '۰';
            veinRegistry = [];
            nextVeinId = 1;
            renderVeinRegistryTable();
            return;
        }
        allGreenPatterns = generateGreenPatterns(fullHistory);
        document.getElementById('green-pattern-count').textContent = allGreenPatterns.length;
        
        // به‌روزرسانی ثبت‌کننده رگه‌های منحصربه‌فرد
        updateVeinRegistry(fullHistory);
        
        addPatternLog(`🔍 الگوهای سبز بروزرسانی شد (تعداد: ${allGreenPatterns.length})`, 'info');
        addPatternLog(`🔍 ماشین حالت سه‌مرحله‌ای آماده است.`, 'info');
        addPatternLog(`📋 تعداد رگه‌های منحصربه‌فرد ثبت‌شده: ${veinRegistry.length}`, 'info');
    }

    function addPatternLog(message, type = 'info') {
        const logDiv = document.getElementById('pattern-log');
        const time = new Date().toLocaleTimeString('fa-IR');
        const fullMessage = `[${time}] ${message}`;
        if (logDiv) {
            const entry = document.createElement('div');
            entry.className = type;
            entry.textContent = fullMessage;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
            if (logDiv.children.length > 100) logDiv.removeChild(logDiv.firstChild);
        }
    }

    // ====================== ۷. المنت‌های سایت ======================
    let t_priceAmount, t_cashoutProduct, t_setCashBtn;
    function findSiteElements() {
        t_priceAmount = document.querySelector('.game-amount');
        t_cashoutProduct = document.querySelector('.cashout-amount');
        t_setCashBtn = document.querySelector('.place-bet');
    }
    setTimeout(findSiteElements, 500);

    // ====================== ۸. هوک‌های بازی ======================
    function safeHook() {
        if (typeof window.game_waiting === 'function') {
            const orig = window.game_waiting;
            window.game_waiting = function(data) {
                let shouldBet = false;
                let matchedPattern = '';

                // ۱. بررسی الگوی سبز نوع ۱
                if (greenPatternEnabled && fullHistory.length >= 2) {
                    const prevCoeff = fullHistory[1];
                    const match = findMatchingGreenPattern(prevCoeff, allGreenPatterns);
                    if (match) {
                        shouldBet = true;
                        matchedPattern = 'سبز نوع ۱';
                        addPatternLog(`✅ تطابق الگوی سبز! ضریب قبل: ${prevCoeff.toFixed(2)}`, 'match');
                        document.getElementById('last-match').textContent = `${prevCoeff.toFixed(2)} → سبز`;
                    } else {
                        addPatternLog(`❌ عدم تطابق سبز برای ضریب ${prevCoeff.toFixed(2)}`, 'nomatch');
                        document.getElementById('last-match').textContent = `${prevCoeff.toFixed(2)} → عدم تطابق سبز`;
                    }
                }

                // ۲. بررسی ماشین حالت سه‌مرحله‌ای
                if (structuralPatternEnabled && !shouldBet) {
                    if (stateMachine.matchFound) {
                        shouldBet = true;
                        matchedPattern = 'سه‌مرحله‌ای';
                        addPatternLog(`🎯 سیگنال سه‌مرحله‌ای تکمیل شد! (ضریب بعد از رگه در تاریخچه > ۱.۸۰ بود). شرط در این دور بسته می‌شود.`, 'step');
                        const targetVein = veinRegistry.find(v => v.id === stateMachine.targetVeinId);
                        document.getElementById('last-match').textContent = `سه‌مرحله‌ای → تأیید نهایی (شناسه ${stateMachine.targetVeinId})`;
                        
                        // ریست ماشین حالت پس از شرط
                        stateMachine = { step: 0, members: [], currentIndex: 0, coeffBefore: 0, afterCoeff: 0, matchFound: false, targetVeinId: 0 };
                    } else {
                        addPatternLog(`⏳ منتظر تکمیل مراحل ماشین حالت... (گام: ${stateMachine.step})`, 'info');
                        document.getElementById('last-match').textContent = `سه‌مرحله‌ای → گام ${stateMachine.step}`;
                    }
                }

                // اگر هیچ الگویی فعال نباشد، همیشه شرط ببند
                if (!greenPatternEnabled && !structuralPatternEnabled) {
                    shouldBet = true;
                }

                if (isRunning && isStrategyActive && shouldBet && !betPlaced) {
                    let bet = getBetAmount();
                    
                    lastPlacedBet = bet;
                    betPlaced = true;

                    if (!t_priceAmount || !t_cashoutProduct || !t_setCashBtn) findSiteElements();
                    if (bet > 0 && t_priceAmount && t_cashoutProduct && t_setCashBtn) {
                        t_priceAmount.value = bet;
                        t_cashoutProduct.value = 2.00;
                        setTimeout(() => t_setCashBtn.click(), 150);
                        const mode = matchedPattern ? ` (بر اساس ${matchedPattern})` : '';
                        addPatternLog(`💰 شرط بسته شد: مبلغ ${bet} - ضریب ۲.۰۰${mode}`, 'bet');
                    }
                } else if (isRunning && isStrategyActive && !shouldBet && (greenPatternEnabled || structuralPatternEnabled)) {
                    addPatternLog(`⏸️ شرط بسته نشد (هیچ الگویی تطابق نداشت)`, 'info');
                }
                orig.call(this, data);
            };
        }

        if (typeof window.game_busted === 'function') {
            const orig = window.game_busted;
            window.game_busted = function(data) {
                const result = data.amount / 100;

                // آپدیت تاریخچه
                if (result > 0) {
                    fullHistory.unshift(result);
                    bustHistory.unshift(result);
                    if (bustHistory.length > 50) bustHistory.pop();
                    updateStatsTable();
                    updateAllPatterns();

                    // ===== منطق ماشین حالت سه‌مرحله‌ای =====
                    if (structuralPatternEnabled && result > 0) {
                        const chronological = [...fullHistory].reverse();
                        const veins = extractVeins(chronological);
                        
                        if (veins.length > 0) {
                            const lastVein = veins[veins.length - 1];
                            
                            // === حالت ۰: آماده به دنبال سیگنال اول ===
                            if (stateMachine.step === 0) {
                                if (lastVein.startIndex > 0) {
                                    const coeffBefore = chronological[lastVein.startIndex - 1];
                                    // سیگنال اول
                                    if (result === coeffBefore) {
                                        // پیدا کردن شناسه رگه در ثبت‌کننده
                                        const veinKey = generateVeinKey(lastVein);
                                        const regItem = veinRegistry.find(item => item.key === veinKey);
                                        
                                        stateMachine.step = 1;
                                        stateMachine.members = lastVein.members;
                                        stateMachine.currentIndex = 0;
                                        stateMachine.coeffBefore = coeffBefore;
                                        stateMachine.afterCoeff = lastVein.afterCoeff || 0;
                                        stateMachine.targetVeinId = regItem ? regItem.id : 0;
                                        
                                        addPatternLog(`📌 سیگنال اول تأیید شد! ضریب ${result.toFixed(2)} برابر با ضریب قبل از رگه (شناسه ${stateMachine.targetVeinId})`, 'step');
                                        document.getElementById('last-match').textContent = `سیگنال ۱ → ${result.toFixed(2)} (شناسه ${stateMachine.targetVeinId})`;
                                    }
                                }
                            }
                            
                            // === حالت ۱: منتظر سیگنال دوم ===
                            else if (stateMachine.step === 1) {
                                if (stateMachine.currentIndex < stateMachine.members.length) {
                                    const expected = stateMachine.members[stateMachine.currentIndex];
                                    if (result === expected) {
                                        stateMachine.currentIndex++;
                                        addPatternLog(`📌 سیگنال دوم: عضو ${stateMachine.currentIndex}/${stateMachine.members.length} تأیید شد (${expected.toFixed(2)})`, 'step');
                                        
                                        if (stateMachine.currentIndex === stateMachine.members.length) {
                                            stateMachine.step = 2;
                                            addPatternLog(`✅ سیگنال دوم کامل شد! تمام اعضای رگه با موفقیت بازتولید شدند (شناسه ${stateMachine.targetVeinId}).`, 'step');
                                            document.getElementById('last-match').textContent = `سیگنال ۲ → کامل (شناسه ${stateMachine.targetVeinId})`;
                                            
                                            // سیگنال ۳
                                            const afterCoeff = stateMachine.afterCoeff;
                                            if (afterCoeff !== null && afterCoeff > 0 && afterCoeff >= 1.80) {
                                                stateMachine.step = 3;
                                                stateMachine.matchFound = true;
                                                addPatternLog(`✅ سیگنال سوم تأیید شد! ضریب بعد از رگه در تاریخچه (${afterCoeff.toFixed(2)}) >= ۱.۸۰ است. آماده شرط در دور بعدی (شناسه ${stateMachine.targetVeinId}).`, 'step');
                                                document.getElementById('last-match').textContent = `سیگنال ۳ → ${afterCoeff.toFixed(2)} (شناسه ${stateMachine.targetVeinId})`;
                                            } else {
                                                addPatternLog(`❌ سیگنال سوم شکست! ضریب بعد از رگه (${afterCoeff ? afterCoeff.toFixed(2) : 'نامشخص'}) >= ۱.۸۰ نیست. ریست شد (شناسه ${stateMachine.targetVeinId}).`, 'nomatch');
                                                stateMachine = { step: 0, members: [], currentIndex: 0, coeffBefore: 0, afterCoeff: 0, matchFound: false, targetVeinId: 0 };
                                                document.getElementById('last-match').textContent = `سیگنال ۳ → شکست (شناسه ${stateMachine.targetVeinId})`;
                                            }
                                        }
                                    } else {
                                        addPatternLog(`❌ سیگنال دوم شکست! انتظار ${expected.toFixed(2)} ولی ${result.toFixed(2)} آمد. ریست شد.`, 'nomatch');
                                        stateMachine = { step: 0, members: [], currentIndex: 0, coeffBefore: 0, afterCoeff: 0, matchFound: false, targetVeinId: 0 };
                                        document.getElementById('last-match').textContent = `سیگنال ۲ → شکست`;
                                    }
                                }
                            }
                        }
                    }
                }

                // ===== مدیریت شرط و استراتژی =====
                if (isRunning && isStrategyActive && betPlaced) {
                    if (result >= 2.00) {
                        addPatternLog(`🎉 شرط با مبلغ ${lastPlacedBet} و ضریب ۲.۰۰ برنده شد! (کرش: ${result.toFixed(2)})`, 'match');
                        if (strategyConfig.type === 'labouchere' && strategyConfig.sequence && strategyConfig.sequence.length > 0) {
                            if (strategyConfig.sequence.length >= 2) {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.pop();
                            } else {
                                strategyConfig.sequence.shift();
                            }
                            if (strategyConfig.sequence.length === 0) {
                                currentSeqIdx = 0;
                                totalLoss = 0;
                            }
                        } else {
                            currentSeqIdx = 0;
                            totalLoss = 0;
                        }
                        updateLossSequence();
                        updateLossTotalUI();
                    } else {
                        addPatternLog(`❌ شرط با مبلغ ${lastPlacedBet} و ضریب ۲.۰۰ باخت! (کرش: ${result.toFixed(2)})`, 'nomatch');
                        if (strategyConfig.type === 'labouchere' && strategyConfig.sequence && strategyConfig.sequence.length > 0) {
                            let lostAmount = lastPlacedBet;
                            if (strategyConfig.sequence.length >= 2) {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.pop();
                                strategyConfig.sequence.push(lostAmount);
                            } else {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.push(lostAmount);
                            }
                            totalLoss += lostAmount;
                            currentSeqIdx++;
                        } else {
                            totalLoss += lastPlacedBet;
                            currentSeqIdx++;
                        }
                        updateLossSequence();
                        updateLossTotalUI();
                    }
                    betPlaced = false;
                }

                if (isRunning && isStrategyActive) {
                    const chkBalanceRule = document.getElementById('chk-balance-rule');
                    if (chkBalanceRule && chkBalanceRule.checked) {
                        const domBalance = getCurrentBalanceFromDOM();
                        if (domBalance !== null) {
                            currentBalance = domBalance;
                            document.getElementById('base-balance').value = Math.floor(currentBalance);
                            if (currentBalance >= fixedTarget) {
                                isRunning = false;
                                document.getElementById('bot-status').textContent = '✅ حد سود روزانه محقق شد! ربات متوقف شد.';
                                addPatternLog(`🎯 حد سود محقق شد! موجودی: ${currentBalance} (هدف: ${fixedTarget})`, 'info');
                            }
                        }
                    }
                }

                orig.call(this, data);
            };
        }
    }

    // ====================== ۹. ساختار HTML کادر اصلی ======================
    const wrapper = document.createElement('div');
    wrapper.id = 'bot-ui-wrapper';
    wrapper.innerHTML = '<div id="bot-status">⚡ ربات آماده است (الگوهای سبز و سه‌مرحله‌ای)</div>';

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
        <button class="bot-tab" data-target="pane-pattern">الگوها</button>
    `;
    wrapper.appendChild(tabsDiv);

    // پنل استراتژی شرط
    const paneLoss = document.createElement('div');
    paneLoss.className = 'bot-pane active';
    paneLoss.id = 'pane-loss';
    paneLoss.innerHTML = `
        <div class="bot-row"><span class="bot-label">ضریب:</span><input type="text" class="bot-input" id="loss-coeff" value="2.00" readonly style="max-width:65px; background:#444; color:#fff;"></div>
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
        <div class="bot-check-row" style="border-top:1px solid #555; padding:6px 0;"><input type="checkbox" id="chk-loss"><label for="chk-loss">فعال‌سازی ربات (شرط‌بندی با ضریب ۲.۰۰)</label></div>
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
            <span style="font-size:11px; color:#888;">(خوانده شده از سایت)</span>
        </div>
        <div class="bot-row">
            <span class="bot-label">درصد حد سود:</span>
            <input type="text" class="bot-input" id="balance-profit-percent" value="1" style="max-width:60px;">
            <span>%</span>
            <button class="bot-btn blue" id="btn-update-target" style="flex:0 0 auto; padding:0 12px; height:32px; font-size:12px; margin-right:8px;">🔄 اعمال</button>
        </div>
        <div class="bot-row"><div class="bot-check-row" style="border:none; margin-top:0;">
            <input type="checkbox" id="chk-balance-rule" checked><label for="chk-balance-rule" style="font-weight:bold;">فعال‌سازی حد سود روزانه</label>
        </div></div>
        <div class="bot-row">
            <span class="bot-label">مبلغ حد سود:</span>
            <input type="text" class="bot-input readonly-field" id="balance-profit-amount" readonly style="max-width:80px;">
        </div>
        <div class="bot-row">
            <span class="bot-label">جمع کل (هدف ثابت):</span>
            <input type="text" class="bot-input readonly-field" id="balance-target" readonly style="max-width:160px;">
        </div>
    `;
    wrapper.appendChild(paneBalance);

    // پنل الگوها
    const panePattern = document.createElement('div');
    panePattern.className = 'bot-pane';
    panePattern.id = 'pane-pattern';
    panePattern.innerHTML = `
        <div class="bot-row">
            <input type="checkbox" id="chk-green-pattern">
            <label for="chk-green-pattern" style="font-weight:bold; color:#28a745;">الگوی سبز نوع ۱ (تطابق با ضریب قبل از رگه سبز)</label>
        </div>
        <div class="bot-row" style="font-size:11px; color:#888; margin-top:-4px; padding-right:26px;">
            شرط زمانی بسته می‌شود که ضریب دور قبل با شروع یا پایان یک رگه سبز در تاریخچه تطابق داشته باشد.
        </div>
        <div class="bot-row" style="border-top:1px solid #555; padding-top:8px;">
            <input type="checkbox" id="chk-structural-pattern">
            <label for="chk-structural-pattern" style="font-weight:bold; color:#6f42c1;">ماشین حالت سه‌مرحله‌ای (نسخه اصلاح‌شده)</label>
        </div>
        <div class="bot-row" style="font-size:11px; color:#888; margin-top:-4px; padding-right:26px;">
            مرحله ۱: ضریب جدید با ضریب قبل از شروع رگه برابر باشد.<br>
            مرحله ۲: همه اعضای رگه به‌ترتیب ظاهر شوند.<br>
            مرحله ۳: ضریب بعد از رگه (ذخیره شده در تاریخچه) >= ۱.۸۰ باشد.
        </div>
        <div class="bot-row" style="border-top:1px solid #555; padding-top:8px;">
            <span class="bot-label">تعداد الگوهای سبز:</span>
            <span id="green-pattern-count" style="font-weight:bold; color:#ffc107;">۰</span>
        </div>
        <div class="bot-row">
            <span class="bot-label">آخرین رویداد:</span>
            <span id="last-match" style="font-weight:bold; color:#aaa;">-</span>
            <button class="bot-btn blue" id="btn-refresh-patterns" style="flex:0 0 auto; padding:0 12px; height:32px; font-size:12px; margin-right:8px;">🔄 بروزرسانی الگوها</button>
        </div>
        <div class="pattern-status-box" id="pattern-status">⏳ منتظر بارگذاری تاریخچه...</div>
        <div class="pattern-log-box" id="pattern-log">
            <div class="info">[${new Date().toLocaleTimeString('fa-IR')}] منتظر فعال‌سازی الگوها...</div>
        </div>
        
        <!-- بخش جدید: جدول ثبت‌کننده رگه‌های منحصربه‌فرد -->
        <div id="vein-registry-container">
            <div style="text-align:center; color:#888; padding:10px;">در حال بارگذاری جدول ثبت رگه‌ها...</div>
        </div>
    `;
    wrapper.appendChild(panePattern);

    // ====================== ۱۰. تزریق به صفحه ======================
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
            <div class="bot-collapse-content" id="collapse-content"><div id="statsTableContainer"><table><thead><tr><th>ضریب</th><th>منصفانه</th><th>۵۰ دور</th><th>برعکس</th><th>کل تاریخ</th><th>کارمزد</th></tr></thead><tbody id="result-body"></tbody></table></div></div>
        `;
        wrapper.after(statsMenu);

        document.getElementById('collapse-btn').onclick = function() { 
            const c = document.getElementById('collapse-content'); 
            const i = this.querySelector('span:last-child'); 
            c.classList.toggle('open'); 
            i.textContent = c.classList.contains('open')?'▼':'▶'; 
        };

        document.getElementById('bot-status').textContent = '✅ ربات بارگذاری شد (الگوهای سبز و سه‌مرحله‌ای با ثبت‌کننده)';
        document.querySelectorAll('.bot-input').forEach(input => { input.value = toEng(input.value); });

        setTimeout(() => {
            const domBalance = getCurrentBalanceFromDOM();
            if (domBalance !== null) {
                currentBalance = domBalance;
                document.getElementById('base-balance').value = Math.floor(currentBalance);
                calculateFixedTarget();
            } else {
                calculateFixedTarget();
            }
        }, 10000);

        initializeUI();
        setTimeout(clickGameHistory, 1500);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
    else inject();

    // ====================== ۱۱. راه‌اندازی رویدادها ======================
    function initializeUI() {
        document.getElementById('btn-update-target').addEventListener('click', function() {
            if (isRunning) { alert('ربات در حال اجراست. برای تغییر هدف، ابتدا ربات را متوقف کنید.'); return; }
            calculateFixedTarget();
        });

        document.querySelectorAll('.bot-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const targetPane = document.getElementById(targetId);
                const isActive = this.classList.contains('active');
                if (isActive) {
                    this.classList.remove('active');
                    targetPane.classList.remove('active');
                } else {
                    document.querySelectorAll('.bot-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.bot-pane').forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    targetPane.classList.add('active');
                }
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

        document.getElementById('chk-loss').addEventListener('change', function() {
            if (this.checked) { 
                const coeff = 2.00; 
                const strategy = getStrategyType();
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
                }
                isStrategyActive = true;
                resetState();
            } else { isStrategyActive = false; }
        });

        document.getElementById('btn-start').onclick = () => { 
            if (isStrategyActive) { isRunning = true; document.getElementById('bot-status').textContent = '▶ ربات در حال اجرا (ضریب ۲.۰۰ و الگوها)'; } 
            else { alert('ابتدا حالت شرط‌بندی را انتخاب و تیک بزنید.'); } 
        };
        document.getElementById('btn-stop').onclick = () => { isRunning = false; document.getElementById('bot-status').textContent = '⏸ ربات متوقف شد'; };
        
        let night = false;
        document.getElementById('btn-theme').onclick = function() { 
            night = !night; wrapper.classList.toggle('bot-night', night); this.textContent = night ? '☀️ روز' : '🌙 شب'; 
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

        // ===== مدیریت الگوها =====
        document.getElementById('chk-green-pattern').addEventListener('change', function() {
            greenPatternEnabled = this.checked;
            if (this.checked) {
                addPatternLog('✅ الگوی سبز نوع ۱ فعال شد.', 'info');
                document.getElementById('pattern-status').textContent = '🟢 سبز فعال - در حال اسکن...';
                updateAllPatterns();
            } else {
                addPatternLog('⏸️ الگوی سبز نوع ۱ غیرفعال شد.', 'info');
                document.getElementById('pattern-status').textContent = '⚪ سبز غیرفعال';
                if (!structuralPatternEnabled) document.getElementById('pattern-status').textContent = '⚪ هیچ الگویی فعال نیست';
            }
        });

        document.getElementById('chk-structural-pattern').addEventListener('change', function() {
            structuralPatternEnabled = this.checked;
            if (this.checked) {
                stateMachine = { step: 0, members: [], currentIndex: 0, coeffBefore: 0, afterCoeff: 0, matchFound: false, targetVeinId: 0 };
                addPatternLog('✅ ماشین حالت سه‌مرحله‌ای (نسخه اصلاح‌شده) فعال شد.', 'step');
                document.getElementById('pattern-status').textContent = '🟣 سه‌مرحله‌ای فعال - منتظر سیگنال‌ها...';
                updateAllPatterns();
            } else {
                addPatternLog('⏸️ ماشین حالت سه‌مرحله‌ای غیرفعال شد.', 'info');
                document.getElementById('pattern-status').textContent = '⚪ سه‌مرحله‌ای غیرفعال';
                if (!greenPatternEnabled) document.getElementById('pattern-status').textContent = '⚪ هیچ الگویی فعال نیست';
            }
        });

        document.getElementById('btn-refresh-patterns').addEventListener('click', function() {
            if (fullHistory.length === 0) {
                alert('هیچ داده تاریخی برای اسکن وجود ندارد. صبر کنید تا تاریخچه بارگذاری شود.');
                return;
            }
            updateAllPatterns();
            addPatternLog('🔄 الگوها به‌صورت دستی بروزرسانی شدند.', 'info');
        });

        calculateFixedTarget();
    }

    // ====================== ۱۲. راه‌اندازی نهایی ======================
    setTimeout(safeHook, 1000);
    console.log('🤖 ربات با الگوی سبز نوع ۱ و ماشین حالت سه‌مرحله‌ای با ثبت‌کننده رگه‌ها بارگذاری شد.');
})();
