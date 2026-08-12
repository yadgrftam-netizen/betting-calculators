(function() {
    "use strict";
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
        .bot-btn { flex: 1; height: 40px; border: none; border-radius: 6px; font-size: 13px; font-weight: bold; cursor: pointer; color: white; min-width: 70px; }
        .bot-btn.green { background: #28a745; } .bot-btn.red { background: #dc3545; }
        .bot-btn.blue { background: #007bff; } .bot-btn.dark { background: #333; }
        .bot-btn:hover { filter: brightness(0.9); }

        #bot-tabs { display: flex; gap: 2px; margin-bottom: 6px; flex-wrap: wrap; }
        .bot-tab { flex: 1; padding: 10px 4px; background: #555; color: white; border: none; cursor: pointer; font-size: 13px; border-radius: 6px 6px 0 0; text-align: center; min-width: 60px; }
        .bot-tab.active { background: #28a745; }
        
        .bot-pane { display: none; background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 0 0 6px 6px; padding: 12px; margin-bottom: 6px; }
        .bot-pane.active { display: block; }

        .bot-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
        .bot-label { font-size: 14px; font-weight: bold; min-width: 60px; flex-shrink: 0; }
        .bot-input { flex: 1; padding: 6px; border: 1px solid var(--border); border-radius: 4px; background: var(--hover); color: var(--text); font-size: 14px; min-width: 40px; max-width: 70px; text-align: center; }
        .bot-input.readonly-field { background: #e9ecef; color: #495057; font-weight: bold; }
        .bot-input-group { display: flex; gap: 4px; flex: 1; flex-wrap: wrap; justify-content: flex-start; }
        .bot-input-group .bot-input { min-width: 45px; max-width: 55px; }
        .bot-check-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-top: 1px solid var(--border); margin-top: 6px; }
        .bot-check-row input[type="checkbox"] { width: 18px; height: 18px; accent-color: #28a745; }
        
        #stats-table-outer-container { direction: rtl; text-align: right; font-family: Tahoma, sans-serif; max-width: 600px; margin: 10px auto; box-sizing: border-box; }
        .bot-collapse-btn { width: 100%; background: #000; color: white; padding: 10px; border: none; border-radius: 6px 6px 0 0; font-weight: bold; display: flex; justify-content: space-between; cursor: pointer; }
        .bot-collapse-content { display: none; border: 1px solid #555; border-top: none; padding: 10px; background: #000; color: white; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .bot-collapse-content.open { display: block; }

        #statsTableContainer { border: 1px solid #555; padding: 10px; border-radius: 5px; background: black; color: white; direction: rtl; text-align: right; box-sizing: border-box; width: 100%; }
        #statsTableContainer table { width: 100%; border-collapse: collapse; font-size: 11px; color: white; direction: rtl; table-layout: auto; min-width: 600px; }
        #statsTableContainer th, #statsTableContainer td { border: 1px solid #555; padding: 4px 3px !important; text-align: center; vertical-align: middle; white-space: nowrap; }
        #statsTableContainer th { background: #333; color: white; }
        #statsTableContainer tbody tr:nth-child(even) { background: #1a1a1a; }
        #statsTableContainer tbody tr:hover { background: #2a2a2a; }
        .bot-night #statsTableContainer { background: #111; border-color: #444; }
        .bot-night #statsTableContainer th { background: #222; }
        .bot-night #statsTableContainer td { border-color: #444; }
        .bot-night .bot-collapse-btn { background: #222; }
        
        #bot-status { text-align: center; font-size: 14px; font-weight: bold; color: var(--status-color); margin-bottom: 6px; }

        .risk-pane { background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 10px; margin-bottom: 8px; }
        .risk-pane .bot-row { margin-bottom: 6px; }
        .risk-status { background: #1a1a1a; color: #0f0; padding: 6px 10px; border-radius: 4px; font-family: monospace; font-size: 12px; }
        .risk-log { max-height: 120px; overflow-y: auto; background: #111; color: #aaa; padding: 6px; border-radius: 4px; font-size: 11px; direction: ltr; border: 1px solid #333; margin-top: 6px; text-align: left; }
        .risk-log .match { color: #0f0; } .risk-log .nomatch { color: #f00; } .risk-log .info { color: #ffc107; }
        .risk-log .bet { color: #00bfff; } .risk-log .green { color: #8bc34a; } .risk-log .manual { color: #ff9800; }
        .risk-log .fallback { color: #ff6b6b; } .risk-log .clipboard { color: #ffa500; }

        .manual-input-area { width: 100%; height: 80px; padding: 6px; background: #222; color: #eee; border: 1px solid #555; border-radius: 4px; font-size: 12px; font-family: 'Courier New', monospace; direction: ltr; text-align: left; resize: vertical; }
        .manual-input-area:focus { outline: none; border-color: #28a745; }

        .pattern-box { border: 1px solid #444; border-radius: 4px; background: #1a1a1a; padding: 6px; max-height: 130px; overflow-y: auto; width: 100%; box-sizing: border-box; margin-top: 4px; }
        .pattern-box .bot-check-row { border-top: none; margin-top: 2px; padding: 4px 0; }
        .pattern-box .bot-check-row label { font-size: 12px; color: #ccc; }
    `;
    document.head.appendChild(style);

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

    let isRunning = false, isStrategyActive = false;
    let strategyConfig = { type: 'martingale', multiplier: 2.0, baseAmount: 1, sequence: [] };
    let currentSeqIdx = 0, totalLoss = 0;
    let lastPlacedBet = 0;
    let betPlaced = false;
    let currentBalance = 600;
    let fixedTarget = 0;
    let bustHistory = [];
    let fullHistory = [];
    let initialLoadDone = false;
    let historyClickedOnce = false;

    let riskEnabled = false;
    let veinTableData = [];
    let matchFound = false;
    let riskTargetMultiplier = null;
    let riskSkipCount = 0;
    let selectedPatternType = 'red';
    let confidenceThreshold = 0;
    let minRepeat = 2;
    let noMatchCounter = 0;

    let recoveryMode = false;
    let recoveryMultiplier = 1;
    const BASE_BET = 1;

    let fallbackModeActive = false;
    let consecutiveMisses = 0;
    let fallbackLossCount = 0;
    const FALLBACK_PERCENT_THRESHOLD = 54;
    const FALLBACK_TRIGGER_MISSES = 10;

    let MAX_LOSS_STREAK = 5;
    let startAfterLossEnabled = false;
    let startAfterLossStreak = 5;
    let consecutiveLossesBelow180 = 0;

    let stopAfterWinEnabled = false;
    let stopAfterWinStreak = 10;
    let consecutiveWins = 0;

    let minRepeatEnabled = false;
    let confidenceEnabled = false;
    let maxLossEnabled = false;

    let patternRedEnabled = false;
    let patternGreenEnabled = false;
    let patternCombinedEnabled = false;
    let patternEndGreenEnabled = false;
    let patternEndRedEnabled = false;

    let trigger_EndGreen = false;
    let trigger_EndRed = false;
    let lastColor = null;
    let currentRedStreak = 0;

    let fullLogHistory = [];
    let autoCopyEnabled = false;

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

    function calculateDynamicBase(coeff) {
        if (coeff <= 1.0) return 1; 
        return Math.ceil(1 / (coeff - 1));
    }

    function getStrategyType(coeff) {
        const chkMartingale = document.getElementById('chk-martingale');
        const chkLabouchere = document.getElementById('chk-labouchere');
        if (chkMartingale && chkMartingale.checked) return 'MARTINGALE';
        if (chkLabouchere && chkLabouchere.checked) return 'LABOUCHERE';
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

    function getMultiplier2Percent() {
        if (!bustHistory || bustHistory.length === 0) return 0;
        const count = bustHistory.filter(v => v >= 2.00).length;
        return (count / bustHistory.length) * 100;
    }

    function autoCopyFullHistory() {
        if (!autoCopyEnabled) return;
        if (!fullHistory || fullHistory.length === 0) return;
        try {
            const text = fullHistory.map(v => v.toFixed(2) + "---\n").join('');
            navigator.clipboard.writeText(text).then(() => {
                addRiskLog(`📋 کپی خودکار Full History انجام شد (${fullHistory.length} ضریب)`, 'clipboard');
            }).catch(err => {
                addRiskLog(`⚠️ خطا در کپی خودکار: ${err.message}`, 'info');
            });
        } catch (e) {
            addRiskLog(`⚠️ خطا در کپی خودکار: ${e.message}`, 'info');
        }
    }

    function extractVeinsFromHistory(history) {
        if (!history || history.length === 0) return [];
        const rev = [...history].reverse();
        const veins = [];
        let i = 0;
        const n = rev.length;
        while (i < n) {
            let type = null;
            let start = i;
            let members = [];
            let condition = false;
            if (rev[i] >= 0.00 && rev[i] <= 1.79) {
                type = 'قرمز';
                condition = true;
            } else if (rev[i] >= 1.80 && rev[i] < 100.00) {
                type = 'سبز';
                condition = true;
            }
            if (condition && type !== null) {
                while (i < n && ((type === 'قرمز' && rev[i] >= 0.00 && rev[i] <= 1.79) || (type === 'سبز' && rev[i] >= 1.80 && rev[i] < 100.00))) {
                    members.push(rev[i]);
                    i++;
                }
                veins.push({
                    startIndex: start,
                    endIndex: i - 1,
                    members: members,
                    length: members.length,
                    type: type
                });
            } else {
                i++;
            }
        }
        return veins;
    }

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
        const veins = extractVeinsFromHistory(fullHistory);
        const veinTableData = extractVeinTableData();

        const patterns = [];

        const typeIdx = 1;
        const eIndex = 7;
        const pIndex = 18;
        const lIndex = 14;
        const uIndex = 23;
        const groupIdx = 2;
        const aIdx = 3;
        const cIdx = 5;
        const hIdx = 10;
        const qIdx = 19;
        const iIdx = 11;
        const rIdx = 20;
        const repeatIdx = 12;
        const lastRepeatIdx = 25;

        veinTableData.forEach(row => {
            const type = row[typeIdx] || 'قرمز';
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
            const repeatCount = parseInt(row[repeatIdx]) || 0;
            const lastRepeat = parseInt(row[lastRepeatIdx]) || 0;

            const uniqueKey = `${group}_${a}_${c}_${h}_${q}_${ident}_${rIdent}`;

            if (!isNaN(eVal) && eVal > 0) {
                patterns.push({
                    key: uniqueKey,
                    type: type,
                    beforeStart: eVal,
                    beforeEnd: pVal,
                    afterStart: lVal,
                    afterEnd: uVal,
                    group, a, c, h, q, ident, rIdent,
                    repeatCount: repeatCount,
                    lastRepeat: lastRepeat,
                    source: 'E',
                    isCombined: false,
                    row: row
                });
            }
            if (!isNaN(pVal) && pVal > 0 && (pVal !== eVal)) {
                patterns.push({
                    key: uniqueKey,
                    type: type,
                    beforeStart: eVal,
                    beforeEnd: pVal,
                    afterStart: lVal,
                    afterEnd: uVal,
                    group, a, c, h, q, ident, rIdent,
                    repeatCount: repeatCount,
                    lastRepeat: lastRepeat,
                    source: 'P',
                    isCombined: false,
                    row: row
                });
            }
        });

        if (veins.length >= 2) {
            for (let i = 0; i < veins.length - 1; i++) {
                const v1 = veins[i];
                const v2 = veins[i+1];
                const rev = [...fullHistory].reverse();
                const before1 = (v1.startIndex > 0) ? rev[v1.startIndex - 1] : null;
                const before2 = (v2.startIndex > 0) ? rev[v2.startIndex - 1] : null;
                const after2 = (v2.endIndex + 1 < rev.length) ? rev[v2.endIndex + 1] : null;
                const eVal1 = (before1 !== null && before1 >= 0) ? before1 : 0;
                const eVal2 = (before2 !== null && before2 >= 0) ? before2 : 0;
                const uVal2 = (after2 !== null && after2 >= 0) ? after2 : 0;

                const combinedKey = `${v1.type}_${JSON.stringify(v1.members)}_to_${v2.type}_${JSON.stringify(v2.members)}`;
                const uniqueKeyCombined = `combined_${i}`;

                if (eVal1 > 0 && eVal2 > 0 && uVal2 > 0) {
                    patterns.push({
                        key: uniqueKeyCombined,
                        type: 'combined',
                        beforeStart: eVal1,
                        beforeEnd: eVal2,
                        afterStart: uVal2,
                        afterEnd: uVal2,
                        group: 'combined',
                        a: 'combined',
                        c: combinedKey,
                        h: combinedKey,
                        q: combinedKey,
                        ident: 'combined',
                        rIdent: 'combined',
                        repeatCount: 0,
                        lastRepeat: 0,
                        source: 'combined',
                        isCombined: true,
                        row: null,
                        v1: v1,
                        v2: v2
                    });
                }
            }
        }

        return patterns;
    }

    function calculateConfidence(pattern, currentRound) {
        if (pattern.isCombined) return 0;
        const repeatWeight = 10;
        const recencyWeight = 5;
        const repeatScore = pattern.repeatCount * repeatWeight;
        const recencyScore = (currentRound - pattern.lastRepeat) * recencyWeight;
        const confidence = repeatScore - recencyScore;
        return Math.max(0, confidence);
    }

    function findMatchingPattern(coeff, patterns, selectedType) {
        let filtered = [];
        if (selectedType === 'red') {
            filtered = patterns.filter(p => !p.isCombined && p.type === 'قرمز');
        } else if (selectedType === 'green') {
            filtered = patterns.filter(p => !p.isCombined && p.type === 'سبز');
        } else if (selectedType === 'combined') {
            filtered = patterns.filter(p => p.isCombined === true);
        } else {
            filtered = patterns;
        }

        for (let p of filtered) {
            if (coeff === p.beforeStart) {
                return { ...p, matchedField: 'E' };
            }
            if (coeff === p.beforeEnd) {
                return { ...p, matchedField: 'P' };
            }
        }
        return null;
    }

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

    function loadManualCoefficients() {
        const textarea = document.getElementById('manual-coeff-input');
        if (!textarea) return;
        const rawText = textarea.value.trim();
        if (!rawText) {
            alert('لطفاً ضرایب را وارد کنید.');
            return;
        }

        const numbers = [];
        const parts = rawText.split(/[\n\r,;\t]+/);
        for (let part of parts) {
            const cleaned = part.trim().replace(/---$/, '').replace(/[^0-9.]/g, '');
            if (cleaned) {
                const num = parseFloat(cleaned);
                if (!isNaN(num) && num >= 0 && num < 100) {
                    numbers.push(num);
                }
            }
        }

        if (numbers.length === 0) {
            alert('هیچ عدد معتبری یافت نشد. لطفاً ضرایب را به‌صورت اعداد (مثلاً 1.25--- یا 1.25) وارد کنید.');
            return;
        }

        const beforeCount = fullHistory.length;
        fullHistory = fullHistory.concat(numbers);
        bustHistory = fullHistory.slice(-50);

        updateStatsTable();
        updateVeinTableFromHistory();
        updateLossSequence();

        addRiskLog(`📥 ${numbers.length} ضریب دستی به تاریخچه اضافه شد. (مجموع: ${fullHistory.length})`, 'manual');
        textarea.value = '';

        if (riskEnabled) {
            const patterns = scanVeinTable();
            document.getElementById('risk-vein-count').textContent = patterns.length;
            addRiskLog('🔍 اسکن مجدد جدول پس از بارگذاری دستی انجام شد. تعداد الگوها: ' + patterns.length, 'info');
        }

        alert(`${numbers.length} ضریب با موفقیت بارگذاری شد.`);
    }

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
            return 0;
        }
    }

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

    function updateVeinTableFromHistory() {
        const container = document.getElementById('veinTableContainer');
        if (!container) return;

        if (!fullHistory || fullHistory.length === 0) {
            container.innerHTML = '<p style="color: #aaa; text-align: center;">⏳ هنوز داده‌ای برای تحلیل وجود ندارد. منتظر دریافت تاریخچه...</p>';
            return;
        }

        const veins = extractVeinsFromHistory(fullHistory);
        const rev = [...fullHistory].reverse();
        const n = rev.length;

        const patternMap = new Map();
        for (let v of veins) {
            const key = JSON.stringify(v.members) + '_' + v.type;
            if (!patternMap.has(key)) {
                patternMap.set(key, { pattern: v.members, type: v.type, occurrences: [], count: 0, lastIndex: 0 });
            }
            const entry = patternMap.get(key);
            entry.occurrences.push(v);
            entry.count++;
            entry.lastIndex = v.startIndex;
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
        const currentRound = fullHistory.length;

        for (let grp of sortedGroups) {
            for (let occ of grp.occurrences) {
                const { before, after } = getBeforeAfter(occ);
                const members = occ.members;
                const len = members.length;
                const type = occ.type;
                let id = `V${groupNumber}`;
                let typeLabel = (len === 1) ? "تکی" : "چند";
                let count = grp.count;
                if (members.length === 0) continue;

                const confidence = calculateConfidence({ repeatCount: count, lastRepeat: grp.lastIndex }, currentRound);

                const firstMember = members[0] || 0;
                const uniqueKey = `${groupNumber}-${occ.startIndex + 1}-${firstMember}`;

                const row = [
                    uniqueKey,
                    type,
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
                    typeLabel,
                    (after !== null ? after : "-"),
                    occ.startIndex + 1,
                    occ.startIndex + 2,
                    len,
                    (before !== null ? before : "-"),
                    JSON.stringify(members),
                    id,
                    count,
                    typeLabel,
                    (after !== null ? after : "-"),
                    (occ.endIndex + 2 < n ? rev[occ.endIndex + 2] : "پایان"),
                    confidence,
                    grp.lastIndex
                ];
                rows.push(row);
            }
            groupNumber++;
        }

        const headers = [
            "شناسه یکتا", "نوع رگه", "شماره گروه", "A – شماره رگه در لیست معکوس",
            "B – تعداد اعداد بین دو رگه", "C – دنباله‌های مشابه بین دو رگه",
            "D – اولین عدد بین دو رگه", "E – ضریب قبل از رگه مبدأ",
            "F – شماره رگه مبدأ", "G – تعداد اعضای رگه مبدأ",
            "H – ضریب‌های رگه مبدأ", "I – شناسه رگه مبدأ",
            "J – تعداد تکرار رگه مبدأ", "K – نوع رگه مبدأ",
            "L – ضریب بعد از رگه مبدأ (F1)", "M – شماره سطر شروع رگه مبدأ",
            "N – شماره رگه مقصد", "O – تعداد اعضای رگه مقصد",
            "P – ضریب قبل از رگه مقصد", "Q – ضریب‌های رگه مقصد",
            "R – شناسه رگه مقصد", "S – تعداد تکرار رگه مقصد",
            "T – نوع رگه مقصد", "U – ضریب بعد از رگه مقصد (F2)",
            "V – ضریب آغازین گروه بعدی", "امتیاز اعتماد", "تاریخ آخرین تکرار"
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
                } else if (cell === "قرمز" || cell === "سبز") {
                    let cls = "vein-badge";
                    if (cell === "قرمز") cls += " vein-badge-orange";
                    else if (cell === "سبز") cls += " vein-badge-green";
                    display = `<span class="${cls}">${cell}</span>`;
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

    function safeHook() {
        if (typeof window.game_waiting === 'function') {
            const orig = window.game_waiting;
            window.game_waiting = function(data) {
                let shouldBet = false;
                let betMultiplier = 1;

                if (recoveryMode) {
                    shouldBet = true;
                    betMultiplier = recoveryMultiplier;
                } else if (fallbackModeActive) {
                    shouldBet = true;
                    betMultiplier = recoveryMultiplier || 1;
                } else if (trigger_EndGreen) {
                    shouldBet = true;
                    betMultiplier = 1;
                    addRiskLog(`🎯 سیگنال پایان رگه سبز فعال شد (ضریب بالا در سبز، دور اول قرمز)`, 'match');
                } else if (trigger_EndRed) {
                    shouldBet = true;
                    betMultiplier = 1;
                    addRiskLog(`🎯 سیگنال پایان رگه قرمز فعال شد (پایان رگه قرمز بلند، دور اول سبز)`, 'match');
                } else if (startAfterLossEnabled && consecutiveLossesBelow180 >= startAfterLossStreak) {
                    shouldBet = true;
                    betMultiplier = 1;
                    addRiskLog(`🎯 شروع شرط پس از ${consecutiveLossesBelow180} باخت پیاپی زیر ۱.۸۰`, 'bet');
                } else {
                    let anyPatternActive = patternRedEnabled || patternGreenEnabled || patternCombinedEnabled;
                    if (riskEnabled && matchFound && anyPatternActive) {
                        shouldBet = true;
                        betMultiplier = 1;
                    } else if (!riskEnabled) {
                        shouldBet = true;
                        betMultiplier = 1;
                    }
                }

                if (isRunning && isStrategyActive && shouldBet && !betPlaced) {
                    let bet = Math.ceil(BASE_BET * betMultiplier);
                    if (strategyConfig.type === 'labouchere' && !recoveryMode && !fallbackModeActive && !trigger_EndGreen && !trigger_EndRed && !(startAfterLossEnabled && consecutiveLossesBelow180 >= startAfterLossStreak)) {
                        bet = getBetAmount();
                    } else if (strategyConfig.type === 'martingale' && recoveryMode) {
                        bet = Math.ceil(BASE_BET * recoveryMultiplier);
                    } else if (strategyConfig.type === 'labouchere' && recoveryMode) {
                        bet = getBetAmount();
                    }
                    
                    lastPlacedBet = bet;
                    betPlaced = true;

                    if (!t_priceAmount || !t_cashoutProduct || !t_setCashBtn) findSiteElements();
                    if (bet > 0 && t_priceAmount && t_cashoutProduct && t_setCashBtn) {
                        t_priceAmount.value = bet;
                        t_cashoutProduct.value = strategyConfig.multiplier;
                        setTimeout(() => t_setCashBtn.click(), 150);
                        const mode = fallbackModeActive ? ' (حالت جایگزین)' : (trigger_EndGreen ? ' (پایان رگه سبز)' : (trigger_EndRed ? ' (پایان رگه قرمز)' : ''));
                        addRiskLog(`💰 شرط بسته شد: مبلغ ${bet} - ضریب ${strategyConfig.multiplier}${mode}`, 'bet');
                    }
                }
                orig.call(this, data);
            };
        }

        if (typeof window.game_busted === 'function') {
            const orig = window.game_busted;
            window.game_busted = function(data) {
                const result = data.amount / 100;

                if (result > 0) {
                    fullHistory.unshift(result);
                    bustHistory.unshift(result);
                    if (bustHistory.length > 50) bustHistory.pop();
                    updateStatsTable();
                    updateVeinTableFromHistory();
                    autoCopyFullHistory();

                    let currentColor = (result >= 0.00 && result <= 1.79) ? 'red' : 'green';
                    
                    if (lastColor === 'red' && currentColor === 'red') {
                        currentRedStreak++;
                    } else if (lastColor === 'red' && currentColor === 'green') {
                        if (currentRedStreak >= 4 && patternEndRedEnabled) {
                            trigger_EndRed = true;
                            addRiskLog(`📌 سیگنال پایان رگه قرمز فعال شد. رگه قرمز با طول ${currentRedStreak} به پایان رسید.`, 'info');
                        } else {
                            trigger_EndRed = false;
                        }
                        currentRedStreak = 0;
                    } else if (lastColor === 'green' && currentColor === 'green') {
                        if (result > 10 && patternEndGreenEnabled && !trigger_EndGreen) {
                            trigger_EndGreen = true;
                            addRiskLog(`📌 سیگنال پایان رگه سبز ثبت شد. ضریب ${result.toFixed(2)} > ۱۰ در رگه سبز مشاهده شد.`, 'info');
                        }
                    } else if (lastColor === 'green' && currentColor === 'red') {
                        if (trigger_EndGreen) {
                            addRiskLog(`📌 سیگنال پایان رگه سبز فعال شد. رگه سبز تمام شد و به قرمز تغییر کرد.`, 'match');
                        }
                        currentRedStreak = 1;
                    }

                    lastColor = currentColor;
                }

                if (!recoveryMode && !fallbackModeActive) {
                    if (result < 1.80) {
                        consecutiveLossesBelow180++;
                        addRiskLog(`📉 باخت زیر ۱.۸۰ (ضریب ${result.toFixed(2)}) - شمارنده: ${consecutiveLossesBelow180}`, 'info');
                    } else {
                        if (consecutiveLossesBelow180 > 0 && startAfterLossEnabled) {
                            addRiskLog(`🔄 ضریب ${result.toFixed(2)} (بالای ۱.۸۰)، شمارنده باخت پیاپی ریست شد.`, 'info');
                        }
                        consecutiveLossesBelow180 = 0;
                    }
                }

                let match = null;
                let patterns = [];
                let repeatedExists = false;
                const currentRound = fullHistory.length;

                if (riskEnabled) {
                    patterns = scanVeinTable();
                    repeatedExists = patterns.some(p => p.repeatCount >= 2 && !p.isCombined);

                    if (!fallbackModeActive) {
                        let effectiveConfidence = confidenceEnabled ? confidenceThreshold : 0;
                        let anyPatternActive = patternRedEnabled || patternGreenEnabled || patternCombinedEnabled;
                        if (anyPatternActive) {
                            match = findMatchingPattern(result, patterns, selectedPatternType);
                            if (match) {
                                const confidence = match.isCombined ? 0 : calculateConfidence(match, currentRound);
                                if (match.isCombined || confidence >= effectiveConfidence) {
                                    matchFound = true;
                                    let target = null;
                                    if (match.afterStart > 0) target = match.afterStart;
                                    else if (match.afterEnd > 0) target = match.afterEnd;
                                    if (target !== null && target > 1.0) {
                                        riskTargetMultiplier = target;
                                        document.getElementById('loss-coeff').value = target.toFixed(2);
                                        updateLossSequence();
                                        document.getElementById('risk-target-display').textContent = target.toFixed(2);
                                        addRiskLog(`✅ تطابق ${match.isCombined ? 'الگوی ترکیبی' : ''} با ${match.matchedField} → ضریب هدف: ${target.toFixed(2)}`, 'match');
                                        consecutiveMisses = 0;
                                    } else {
                                        matchFound = false;
                                        addRiskLog(`⚠️ ضریب هدف نامعتبر (L=${match.afterStart}, U=${match.afterEnd})`, 'info');
                                    }
                                } else {
                                    matchFound = false;
                                    addRiskLog(`⏳ تطابق یافت اما اعتماد (${confidence}) کمتر از آستانه است`, 'info');
                                }
                            } else {
                                matchFound = false;
                                consecutiveMisses++;
                                riskSkipCount++;
                                document.getElementById('risk-skip-count').textContent = riskSkipCount;
                                addRiskLog(`❌ عدم تطابق (تعداد صرف‌نظر: ${riskSkipCount})`, 'nomatch');
                                if (consecutiveMisses > 10) {
                                    addRiskLog(`⚠️ هشدار: بیش از ۱۰ دور متوالی تطابق پیدا نشد!`, 'info');
                                }
                            }
                        } else {
                            matchFound = false;
                        }
                    } else {
                        matchFound = true;
                    }
                } else {
                    matchFound = true;
                }

                const chkFallback = document.getElementById('chk-fallback-mode');
                const fallbackEnabled = chkFallback && chkFallback.checked;

                if (riskEnabled && fallbackEnabled && !fallbackModeActive && !matchFound && match === null) {
                    const pct = getMultiplier2Percent();
                    if (!repeatedExists && pct > FALLBACK_PERCENT_THRESHOLD && consecutiveMisses >= FALLBACK_TRIGGER_MISSES) {
                        fallbackModeActive = true;
                        consecutiveMisses = 0;
                        fallbackLossCount = 0;
                        recoveryMode = false;
                        recoveryMultiplier = 1;
                        currentSeqIdx = 0;
                        totalLoss = 0;
                        strategyConfig.multiplier = 2.00;
                        document.getElementById('loss-coeff').value = '2.00';
                        updateLossSequence();
                        matchFound = true;
                        addRiskLog(`🚀 حالت جایگزین (Fallback) فعال شد! درصد ضریب ۲: ${pct.toFixed(1)}%`, 'fallback');
                    }
                }

                if (isRunning && isStrategyActive && betPlaced) {
                    if (result >= strategyConfig.multiplier) {
                        addRiskLog(`🎉 شرط با مبلغ ${lastPlacedBet} و ضریب ${strategyConfig.multiplier} برنده شد! (کرش: ${result.toFixed(2)})`, 'match');
                        
                        consecutiveWins++;
                        addRiskLog(`📈 تعداد بردهای متوالی: ${consecutiveWins}`, 'info');
                        
                        if (stopAfterWinEnabled && consecutiveWins >= stopAfterWinStreak) {
                            isRunning = false;
                            addRiskLog(`🛑 ربات به دلیل رسیدن به ${consecutiveWins} برد متوالی متوقف شد!`, 'match');
                            document.getElementById('bot-status').textContent = `🛑 توقف پس از ${consecutiveWins} برد متوالی`;
                            consecutiveWins = 0;
                        }

                        if (strategyConfig.type === 'labouchere' && strategyConfig.sequence && strategyConfig.sequence.length > 0) {
                            if (strategyConfig.sequence.length >= 2) {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.pop();
                            } else if (strategyConfig.sequence.length === 1) {
                                strategyConfig.sequence.shift();
                            }
                            if (strategyConfig.sequence.length === 0) {
                                recoveryMode = false;
                                recoveryMultiplier = 1;
                                currentSeqIdx = 0;
                                totalLoss = 0;
                                consecutiveLossesBelow180 = 0;
                                addRiskLog(`✅ جبران ضرر با لابوشر کامل شد.`, 'match');
                                updateLossSequence();
                                updateLossTotalUI();
                            } else {
                                totalLoss = 0;
                                updateLossSequence();
                                updateLossTotalUI();
                            }
                        } else {
                            recoveryMode = false;
                            recoveryMultiplier = 1;
                            currentSeqIdx = 0;
                            totalLoss = 0;
                            consecutiveLossesBelow180 = 0;
                            addRiskLog(`✅ جبران ضرر کامل شد.`, 'match');
                            updateLossSequence();
                            updateLossTotalUI();
                        }

                        if (trigger_EndGreen) {
                            trigger_EndGreen = false;
                            addRiskLog(`🔄 پرچم پایان رگه سبز پس از برد ریست شد.`, 'info');
                        }
                        if (trigger_EndRed) {
                            trigger_EndRed = false;
                            addRiskLog(`🔄 پرچم پایان رگه قرمز پس از برد ریست شد.`, 'info');
                        }

                        if (fallbackModeActive) {
                            const chkFallback2 = document.getElementById('chk-fallback-mode');
                            const fallbackEnabled2 = chkFallback2 && chkFallback2.checked;
                            const pctAfterWin = getMultiplier2Percent();
                            const shouldExitFallback = (pctAfterWin < FALLBACK_PERCENT_THRESHOLD) || (pctAfterWin < 50);
                            const newPatterns = scanVeinTable();
                            const newRepeatedExists = newPatterns.some(p => p.repeatCount >= 2 && !p.isCombined);

                            if (newRepeatedExists || shouldExitFallback || !fallbackEnabled2) {
                                fallbackModeActive = false;
                                matchFound = false;
                                consecutiveMisses = 0;
                                addRiskLog(`🛑 حالت جایگزین غیرفعال شد.`, 'info');
                            } else {
                                addRiskLog(`⏳ حالت جایگزین ادامه دارد.`, 'info');
                            }
                        }
                        matchFound = false;

                    } else {
                        addRiskLog(`❌ شرط با مبلغ ${lastPlacedBet} و ضریب ${strategyConfig.multiplier} باخت! (کرش: ${result.toFixed(2)})`, 'nomatch');
                        
                        if (consecutiveWins > 0) {
                            addRiskLog(`⛔ زنجیره بردهای متوالی شکسته شد (تعداد برد: ${consecutiveWins})`, 'info');
                            consecutiveWins = 0;
                        }

                        if (strategyConfig.type === 'labouchere' && strategyConfig.sequence && strategyConfig.sequence.length > 0) {
                            let lostAmount = lastPlacedBet;
                            if (strategyConfig.sequence.length >= 2) {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.pop();
                                strategyConfig.sequence.push(lostAmount);
                            } else if (strategyConfig.sequence.length === 1) {
                                strategyConfig.sequence.shift();
                                strategyConfig.sequence.push(lostAmount);
                            }
                            recoveryMode = true;
                            totalLoss += lostAmount;
                            currentSeqIdx++;
                            updateLossSequence();
                            updateLossTotalUI();
                        } else {
                            recoveryMode = true;
                            recoveryMultiplier *= 2;
                            totalLoss += lastPlacedBet;
                            currentSeqIdx++;
                            updateLossSequence();
                            updateLossTotalUI();
                        }

                        if (trigger_EndGreen) {
                            trigger_EndGreen = false;
                            addRiskLog(`🔄 پرچم پایان رگه سبز پس از باخت ریست شد.`, 'info');
                        }
                        if (trigger_EndRed) {
                            trigger_EndRed = false;
                            addRiskLog(`🔄 پرچم پایان رگه قرمز پس از باخت ریست شد.`, 'info');
                        }

                        let effectiveMaxLoss = maxLossEnabled ? MAX_LOSS_STREAK : 9999;
                        if (currentSeqIdx >= effectiveMaxLoss) {
                            recoveryMode = false;
                            recoveryMultiplier = 1;
                            currentSeqIdx = 0;
                            totalLoss = 0;
                            matchFound = false;
                            consecutiveLossesBelow180 = 0;
                            updateLossSequence();
                            updateLossTotalUI();
                            addRiskLog(`⛔ به حداکثر باخت پیاپی (${MAX_LOSS_STREAK}) رسیدیم. مارتینگل ریست شد.`, 'info');
                        }
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
                                fallbackModeActive = false;
                                recoveryMode = false;
                                document.getElementById('bot-status').textContent = '✅ حد سود روزانه محقق شد! ربات متوقف شد.';
                                addRiskLog(`🎯 حد سود محقق شد! موجودی: ${currentBalance} (هدف: ${fixedTarget})`, 'info');
                            }
                        }
                    }
                }

                document.getElementById('risk-last-coeff').textContent = result.toFixed(2);
                document.getElementById('risk-vein-count').textContent = patterns.length;
                document.getElementById('risk-scan-status').textContent = `🔄 آخرین بروزرسانی: ${new Date().toLocaleTimeString('fa-IR')}`;

                orig.call(this, data);
            };
        }
    }

    function initializeUI() {
        document.getElementById('btn-update-target').addEventListener('click', function() {
            if (isRunning) {
                alert('ربات در حال اجراست. برای تغییر هدف، ابتدا ربات را متوقف کنید.');
                return;
            }
            calculateFixedTarget();
            addRiskLog(`🔄 هدف ثابت به ${fixedTarget} به‌روزرسانی شد.`, 'info');
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

        document.getElementById('chk-pattern-red').addEventListener('change', function() {
            patternRedEnabled = this.checked;
            addRiskLog(`🔄 الگوی قرمز ${this.checked ? 'فعال' : 'غیرفعال'} شد.`, 'info');
        });
        document.getElementById('chk-pattern-green').addEventListener('change', function() {
            patternGreenEnabled = this.checked;
            addRiskLog(`🔄 الگوی سبز ${this.checked ? 'فعال' : 'غیرفعال'} شد.`, 'info');
        });
        document.getElementById('chk-pattern-combined').addEventListener('change', function() {
            patternCombinedEnabled = this.checked;
            addRiskLog(`🔄 الگوی ترکیبی ${this.checked ? 'فعال' : 'غیرفعال'} شد.`, 'info');
        });

        document.getElementById('chk-pattern-end-green').addEventListener('change', function() {
            patternEndGreenEnabled = this.checked;
            if (!this.checked) trigger_EndGreen = false;
            addRiskLog(`🔄 سیگنال پایان رگه سبز ${this.checked ? 'فعال' : 'غیرفعال'} شد.`, 'info');
        });
        document.getElementById('chk-pattern-end-red').addEventListener('change', function() {
            patternEndRedEnabled = this.checked;
            if (!this.checked) trigger_EndRed = false;
            addRiskLog(`🔄 سیگنال پایان رگه قرمز ${this.checked ? 'فعال' : 'غیرفعال'} شد.`, 'info');
        });

        document.getElementById('pattern-type-select').addEventListener('change', function() {
            selectedPatternType = this.value;
            addRiskLog(`🔄 نوع الگو به "${this.options[this.selectedIndex].text}" تغییر یافت`, 'info');
            matchFound = false;
        });

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

    let t_priceAmount, t_cashoutProduct, t_setCashBtn;
    function findSiteElements() {
        t_priceAmount = document.querySelector('.game-amount');
        t_cashoutProduct = document.querySelector('.cashout-amount');
        t_setCashBtn = document.querySelector('.place-bet');
    }
    setTimeout(findSiteElements, 500);

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

    function inject() {
        if (!document.body) { setTimeout(inject, 50); return; }
        const selectors = ['.header', '.navbar', '.top-bar', 'header', '#header'];
        let target = null;
        for (const sel of selectors) { target = document.querySelector(sel); if (target) break; }
        if (target) target.before(wrapper);
        else document.body.prepend(wrapper);

        const statsMenu = document.getElementById('stats-table-outer-container');
        const veinMenu = document.getElementById('vein-table-outer-container');
        wrapper.after(statsMenu);
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
                calculateFixedTarget();
                console.log(`موجودی اولیه از سایت خوانده شد: ${currentBalance}`);
            } else {
                console.warn("ربات: امکان خواندن موجودی سایت در ۱۰ ثانیه اول وجود نداشت.");
                calculateFixedTarget();
            }
        }, 10000);

        initializeUI();
        setTimeout(clickGameHistory, 1500);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
    else inject();

    setTimeout(safeHook, 1000);
    console.log('ربات نهایی با نام‌های جدید (پایان رگه سبز و پایان رگه قرمز) و حذف گزینه همه الگوها بارگذاری شد.');
})();
