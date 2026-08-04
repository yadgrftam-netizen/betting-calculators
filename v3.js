var BASE_BET = 1;
var lossCounter = 0;
var t_times = 99999;
var numberOneCount = 0;
var damage = 0;
var counter = 0;

var currentLossTotal = 0;
var lastBetAmount = 0;

var emergencyModeActive = false;
var emergencyStep = 0;
var emergencyHistory = [];
var emergencyTargetMultiplier = 3.0;

var intendedCashoutTarget = 2.0;
var isBetActive = false;
var isTemporarilyPaused = false;
var manualPause = true;

var bustHistory = [];
var fullHistory = [];

var allowBetting = false;

var consecutiveLow179 = 0;

var streakDetectionEnabled = false;
var streakThreshold = 7;

var low180DetectionEnabled = false;
var low180Threshold = 60;

var below2DetectionEnabled = false;
var maxAllowedBelow2 = 52;

var longTermDetectionEnabled = false;
var longTermThreshold = 55;

var takeProfitEnabled = false;
var takeProfitPercent = 10;

var stopLossEnabled = false;
var stopLossPercent = 20;

var initialCapital = 100;
var currentProfit = 0;
var isHitAndRunStopped = false;
var stopReason = "";
var virtualProfit = 0;
var stopLossAccum = 0;

var trailingStopEnabled = false;
var trailingStopPercent = 10;
var peakCapital = 0;
var isPeakStopped = false;

var customMartingaleSequence = [];

var patternDetectionEnabled = false;
var patternRedStreakThreshold = 4;
var patternTargetMultiplier = 2.00;
var patternActive = false;

var patternAllDetectionEnabled = false;
var specificTargetMultiplier = 0;
var specificPatternActive = false;

var redRepeatDetectionEnabled = false;
var redRepeatThreshold = 4;
var redRepeatAction = "2.00";
var redRepeatActive = false;

var percentPattern50Enabled = false;
var percentPatternAllEnabled = false;
var percentPatternAction = "2.00";
var percentPatternActive = false;

var comboModeEnabled = false;
var comboTrailingActivated = false;
var comboTrailingTargetProfit = 0;

var comboMartingaleEnabled = false;
var comboVolatilityEnabled = false;
var comboShieldEnabled = false;
var comboFastEnabled = false;
var comboSqueezeEnabled = false;
var comboDiversifyEnabled = false;

var resetModeEnabled = false;
var resetDropThreshold = 15;
var resetModeTriggered = false;
var sessionHistory = [];

var adaptiveLearningEnabled = false;
var autoActionEnabled = false;
var aggressiveEnabled = false;
var defensiveEnabled = false;
var autoSaveEnabled = false;
var hourlyStats = {};
var autoSaveIntervalId = null;
var localStorageKey = "omidCrashHourlyStats";
var timeSlotInterval = 30;

var md5History = [];
var hashHistory = [];
var fakeHashRecord = null;
var md5Selector = '.h-col-5 a.show-code';
var hashSelector = '.h-col-6 a.show-code';

var initialLoadDone = false;

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

const OLD_SEQ_1_10 = [11, 121, 1331, 14641, 161051, 1771561];
const OLD_SEQ_1_20 = [6, 36, 216, 1296, 7776, 46656, 279936, 1679616];
const OLD_SEQ_1_30 = [4, 17, 74, 321, 1391, 6027, 26117, 113174, 490421, 2125157, 9209014];
const OLD_SEQ_1_50 = [3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049, 177147, 531441, 1594323, 4782969];
const OLD_SEQ_1_80 = [2, 4, 9, 21, 47, 106, 238, 536, 1206, 2713, 6104, 13734, 30902, 69529, 156441, 351992, 791982, 1781959, 4009408, 9021168];
const FIBO_SEQ_3 = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155];
const FIBO_SEQ_4 = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155];

var statsTableCreated = false;
var f_game_waiting = game_waiting;
var f_game_busted = game_busted;
var f_game_update = game_update;
var f_game_cash_out = game_cash_out;

var box = document.getElementsByClassName('game-controls')[0];
var t_cashoutProduct = document.getElementsByClassName('cashout-amount')[0];
var t_priceAmount = document.getElementsByClassName('game-amount')[0];
var t_setCashBtn = document.getElementsByClassName("place-bet")[0];
var t_setCashCancelBtn = document.getElementsByClassName("place-bet-cancel")[0];
var h_information = $('div.user-name');

// ============================================================
//  متغیرهای استراتژی‌های ویژه (od36 تا od46)
// ============================================================

// od36 - شرطبندی با مبلغ و ضریب ثابت
var fixedBetEnabled = false;
var fixedBetAmount = 2;
var fixedBetMultiplier = 2.00;

// od37 - شروع شرطبندی بعد از چندین باخت
var betAfterStreakEnabled = false;
var betAfterStreakThreshold = 3;
var currentStreakSinceLastBet = 0;

// od38 - استراتژی لابوشر
var od38Enabled = false;
var od38Sequence = [1, 2, 3];
var od38CurrentBet = 0;

// od39 - استراتژی آسیاب اسکار
var od39Enabled = false;
var od39BaseUnit = 1;
var od39CurrentBet = 1;
var od39SessionProfit = 0;

// od40 - استراتژی آنتی-مارتینگل (پارولی)
var od40Enabled = false;
var od40BaseBet = 1;
var od40MaxStreak = 3;
var od40CurrentBet = 1;
var od40WinStreak = 0;
var od40Multiplier = 2.00;

// od41 - استراتژی پاراچوت
var od41Enabled = false;
var od41BaseBet = 1;
var od41ParachuteLimit = 10;
var od41CurrentBet = 1;
var od41SessionProfit = 0;
var od41Pause = false;

// od42 - استراتژی پوشش ضرر
var od42Enabled = false;
var od42Target = 2.00;
var od42Unit = 1;
var od42TotalLoss = 0;

// od43 - نقد کردن در زمان‌های خاص (در game_update پیاده‌سازی شده است)
var od43Enabled = false;
var od43Time = 5;
var od43StartTime = 0;

// od44 - لایه‌بندی پیش‌رونده
var od44Enabled = false;
var od44Layer1Target = 1.50;
var od44Layer2Target = 3.00;
var od44Threshold = 10;

// od45 - استراتژی درصد ثابت
var od45Enabled = false;
var od45Percentage = 2;

// od46 - استراتژی جبران اجباری
var od46Enabled = false;
var od46Target = 10;
var od46MaxRounds = 3;
var od46Multiplier = 2.00;
var od46RecoveryActive = false;
var od46CurrentRound = 0;
var od46LossAtStart = 0;
var od46Pause = false;

// ============================================================
//  توابع اصلی
// ============================================================

function createStatsTable() {
    if (statsTableCreated) return "";
    statsTableCreated = true;
    var tableHTML = `
    <div style="border:1px solid #555; padding:10px; margin:10px 0; border-radius:5px; background:black; color:white; direction:rtl; text-align:right;" id="statsTableContainer">
        <div style="font-weight:bold; margin-bottom:5px; color:white; text-align:right;">مقایسهٔ درصد ضرایب عادلانه و تاریخچه بازی A1</div>
        <table style="width:100%; border-collapse:collapse; font-size:12px; color:white; direction:rtl;">
            <thead>
                <tr style="background:#333;">
                    <th style="border:1px solid #555; padding:5px;">#</th>
                    <th style="border:1px solid #555; padding:5px;">1-ضریب</th>
                    <th style="border:1px solid #555; padding:5px;">2-درصد منصفانه</th>
                    <th style="border:1px solid #555; padding:5px;">3-درصد ۵۰ دور اخیر</th>
                    <th style="border:1px solid #555; padding:5px;">4-درصد برعکس ۵۰ دور</th>
                    <th style="border:1px solid #555; padding:5px;">5-درصد کل تاریخچه</th>
                    <th style="border:1px solid #555; padding:5px;">6-کارمزد سایت</th>
                </tr>
            </thead>
            <tbody id="statsTableBody">
    `;
    for (var i = 0; i < STATS_DATA.length; i++) {
        var row = STATS_DATA[i];
        var id = row.id;
        var coeff = row.coeff;
        var fair = row.fair;
        var bgColor = i % 2 === 0 ? '#1a1a1a' : '#2a2a2a';
        tableHTML += `
            <tr id="row-${id}" style="background:${bgColor};">
                <td style="border:1px solid #555; padding:5px;">${id}</td>
                <td style="border:1px solid #555; padding:5px;">${coeff.toFixed(2)}</td>
                <td style="border:1px solid #555; padding:5px;">${fair}%</td>
                <td style="border:1px solid #555; padding:5px;" id="c-${id}">-</td>
                <td style="border:1px solid #555; padding:5px;" id="d-${id}">-</td>
                <td style="border:1px solid #555; padding:5px;" id="e-${id}">-</td>
                <td style="border:1px solid #555; padding:5px;" id="f-${id}">-</td>
            </tr>
        `;
    }
    tableHTML += `
            </tbody>
        </table>
    </div>
    `;
    return tableHTML;
}

function updateStatsTable() {
    var tbody = document.getElementById('statsTableBody');
    if (!tbody) return;
    var lenBust = bustHistory.length;
    var lenFull = fullHistory.length;
    var fValues = [];
    for (var i = 0; i < STATS_DATA.length; i++) {
        var row = STATS_DATA[i];
        var coeff = row.coeff;
        var fair = row.fair;
        var countBust = 0;
        for (var j = 0; j < lenBust; j++) {
            if (bustHistory[j] >= coeff) countBust++;
        }
        var cVal = lenBust > 0 ? (countBust / lenBust) * 100 : 0;
        var fVal = fair > 0 ? ((fair - cVal) / fair) * 100 : 0;
        fValues.push({ id: row.id, val: fVal, valid: lenBust > 0 });
    }
    var minF = Infinity;
    for (var k = 0; k < fValues.length; k++) {
        if (fValues[k].valid && fValues[k].val < minF) {
            minF = fValues[k].val;
        }
    }
    var newRowsHTML = "";
    for (var i = 0; i < STATS_DATA.length; i++) {
        var row = STATS_DATA[i];
        var id = row.id;
        var coeff = row.coeff;
        var fair = row.fair;
        var countBust = 0;
        var countFull = 0;
        for (var j = 0; j < lenBust; j++) {
            if (bustHistory[j] >= coeff) countBust++;
        }
        var cVal = lenBust > 0 ? (countBust / lenBust) * 100 : 0;
        var dVal = 100 - cVal;
        for (var k = 0; k < lenFull; k++) {
            if (fullHistory[k] >= coeff) countFull++;
        }
        var eVal = lenFull > 0 ? (countFull / lenFull) * 100 : 0;
        var fVal = 0;
        if (fair > 0) {
            fVal = ((fair - cVal) / fair) * 100;
        }
        var cText = (lenBust > 0 ? cVal.toFixed(1) : '-') + '%';
        var dText = (lenBust > 0 ? dVal.toFixed(1) : '-') + '%';
        var eText = (lenFull > 0 ? eVal.toFixed(1) : '-') + '%';
        var fText = (lenBust === 0) ? '-' : fVal.toFixed(2) + '%';
        var isMinF = (lenBust > 0 && Math.abs(fVal - minF) < 0.001);
        var bgColor = i % 2 === 0 ? '#1a1a1a' : '#2a2a2a';
        var fBgColor = isMinF ? 'background:#808080;' : '';
        newRowsHTML += `
            <tr id="row-${id}" style="background:${bgColor};">
                <td style="border:1px solid #555; padding:5px;">${id}</td>
                <td style="border:1px solid #555; padding:5px;">${coeff.toFixed(2)}</td>
                <td style="border:1px solid #555; padding:5px;">${fair}%</td>
                <td style="border:1px solid #555; padding:5px;">${cText}</td>
                <td style="border:1px solid #555; padding:5px;">${dText}</td>
                <td style="border:1px solid #555; padding:5px;">${eText}</td>
                <td style="border:1px solid #555; padding:5px; ${fBgColor}">${fText}</td>
            </tr>
        `;
    }
    tbody.innerHTML = newRowsHTML;
}

function autoFetchHistoryFromDOM() {
    if (initialLoadDone) return;

    var rows = document.querySelectorAll('div.crash-row');
    var tempHistory = [];
    var tempMD5 = [];
    var tempHASH = [];

    rows.forEach(row => {
        var coeff = row.querySelector('.h-col-1');
        if(coeff) {
            var val = parseFloat(coeff.innerText.trim());
            if(!isNaN(val) && val >= 0.00 && val < 100.00) {
                tempHistory.push(val);
            }
        }

        var md5Elem = row.querySelector(md5Selector);
        if (md5Elem) {
            var md5Text = md5Elem.innerText.trim();
            if (md5Text.length === 32 && /^[0-9a-fA-F]{32}$/.test(md5Text)) {
                tempMD5.push(md5Text);
            }
        }

        var hashElem = row.querySelector(hashSelector);
        if (hashElem) {
            var hashText = hashElem.innerText.trim();
            if (hashText.length === 64 && /^[0-9a-fA-F]{64}$/.test(hashText)) {
                tempHASH.push(hashText);
            }
        }
    });

    if (tempHistory.length > 0) {
        bustHistory = tempHistory.slice(-50);
        fullHistory = tempHistory;
        md5History = tempMD5.slice(-50);
        hashHistory = tempHASH.slice(-50);
        initialLoadDone = true;
        consecutiveLow179 = 0; 
        allowBetting = true;
        isTemporarilyPaused = false;
        peakCapital = initialCapital;
        isPeakStopped = false;
        checkBettingCondition(bustHistory);
        getInformation();
        updateStatsTable();
        if (md5History.length > 0 && bustHistory.length > 0) {
            setTimeout(autoVerifyLastHash, 1000);
        }
        console.log("ربات خودکار شد! " + tempHistory.length + " ضریب و " + tempMD5.length + " MD5 و " + tempHASH.length + " HASH بارگذاری شد.");
        if (isBetActive === false) {
            setTimeout(getCondition, 500);
        }
    } else {
        console.log("تاریخچه پیدا نشد، ۱ ثانیه دیگر تلاش می‌شود...");
        setTimeout(autoFetchHistoryFromDOM, 1000);
    }
}

function syncInitialCapitalFromSite() {
    var chipsElement = document.querySelector('div.top-link.chips-amount');
    if (chipsElement) {
        var text = chipsElement.innerText.trim();
        var extractedNumber = parseInt(text.replace(/[^0-9]/g, ''));
        if (!isNaN(extractedNumber) && extractedNumber > 0) {
            initialCapital = extractedNumber;
            var inputField = document.getElementById('initialCapitalInput');
            if (inputField) {
                inputField.value = initialCapital;
                inputField.dispatchEvent(new Event('input'));
            }
            if (trailingStopEnabled) {
                peakCapital = initialCapital;
                isPeakStopped = false;
            }
            updateHitAndRunDisplay();
            console.log("سرمایه اولیه به صورت خودکار از سایت دریافت شد: " + initialCapital);
        } else {
            console.warn("عددی در المان chips-amount پیدا نشد.");
        }
    } else {
        console.log("المان chips-amount پیدا نشد، ۱ ثانیه دیگر تلاش می‌شود...");
        setTimeout(syncInitialCapitalFromSite, 1000);
    }
}

function getBaseBet() {
    if (customMartingaleSequence.length > 0) {
        return customMartingaleSequence[0]; 
    }
    return 2; 
}

function updateHitAndRunDisplay() {
    var tpDisplay = document.getElementById('takeProfitValueDisplay');
    var slDisplay = document.getElementById('stopLossValueDisplay');
    var tpBalance = document.getElementById('takeProfitBalanceDisplay');
    var slBalance = document.getElementById('stopLossBalanceDisplay');
    if (!tpDisplay || !slDisplay || !tpBalance || !slBalance) return;
    var tpVal = Math.floor(initialCapital * takeProfitPercent / 100);
    var slVal = Math.floor(initialCapital * stopLossPercent / 100);
    tpDisplay.textContent = tpVal;
    slDisplay.textContent = slVal;
    tpBalance.textContent = initialCapital + tpVal;
    slBalance.textContent = initialCapital - slVal;
    var tsInput = document.getElementById('trailingStopInput');
    if (tsInput) {
        tsInput.placeholder = trailingStopPercent + '%';
    }
}

function createManualInputBox() {
    var HR = '<div style="border-bottom: 1px solid #888; margin: 8px 0;"></div>';

    var robotSettingsHTML = `
    <details style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:10px 0; border-radius:5px; direction:rtl; text-align:right;" id="robotSettingsMenu">
        <summary style="font-weight:bold; font-size:16px; cursor:pointer; color:black;">تنظیمات جامع ربات C</summary>
        <div style="padding:10px; margin-top:10px; border-top:1px solid #ccc;">

            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin-bottom:15px; border-radius:5px; direction:rtl; text-align:right;">
                <button id="manualCopyFullHistoryBtn" style="margin-left:10px; background:#6f42c1; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer;">[od59] کپی کل ضرایب تاریخچه B1</button>
                <button id="copyManualHistory" style="background:#007bff; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer;">[od60] کپی ۵۰ ضریب آخر B2</button>
            </div>

            <details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
                <summary style="font-weight:bold; cursor:pointer;">A. مدیریت ریسک</summary>
                <div style="padding:10px; direction:rtl; text-align:right;">

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od1-5. لایه‌های امنیتی پایه</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od1 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="streakToggleCheckbox" ${streakDetectionEnabled ? 'checked' : ''}> <b>[od1]</b> توقف پس از باخت پیاپی <input type="number" id="streakThresholdInput" value="${streakThreshold}" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od1</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر تعداد باخت‌های متوالی به آستانه تعیین‌شده برسد، ربات متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od2 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="low180ToggleCheckbox" ${low180DetectionEnabled ? 'checked' : ''}> <b>[od2]</b> توقف اگر درصد زیر ۱.۸۰ از حد مجاز بیشتر شود <input type="number" id="low180ThresholdInput" value="${low180Threshold}" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od2</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر درصد ضریب‌های زیر ۱.۸۰ در ۵۰ دور اخیر از مقدار تعیین‌شده بیشتر شود، ربات متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od3 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="below2ToggleCheckbox" ${below2DetectionEnabled ? 'checked' : ''}> <b>[od3]</b> توقف اگر درصد زیر ۲.۰۰ از حد مجاز بیشتر شود <input type="number" id="below2ThresholdInput" value="${maxAllowedBelow2}" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od3</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر درصد ضریب‌های زیر ۲.۰۰ در ۵۰ دور اخیر از مقدار تعیین‌شده بیشتر شود، ربات متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od4 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="longTermToggleCheckbox" ${longTermDetectionEnabled ? 'checked' : ''}> <b>[od4]</b> توقف بر اساس آمار بلندمدت <input type="number" id="longTermThresholdInput" value="${longTermThreshold}" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od4</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر درصد ضریب‌های زیر ۲.۰۰ در کل تاریخچه از آستانه تعیین‌شده بیشتر شود، ربات قفل می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od5 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <b>[od5]</b> مارتینگل سفارشی <input type="text" id="martingaleInput" placeholder="مثلا: 5" style="width:100px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od5</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">با وارد کردن اعداد با کاما، یک دنباله شرط‌بندی سفارشی برای افزایش مبلغ پس از باخت ایجاد می‌کنید.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od6-9. لایه‌های پیشرفته</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od6 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="trendFilterToggleCheckbox"> <b>[od6]</b> فیلتر روند نزولی
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od6</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر میانگین ۱۰ دور اخیر کمتر از میانگین ۵۰ دور باشد (روند نزولی)، ربات متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od7 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="delayToggleCheckbox"> <b>[od7]</b> تأخیر شرط‌گذاری <input type="number" id="delayInput" value="1" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od7</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ربات چند ثانیه (مقدار قابل تنظیم) پس از شروع بازی صبر می‌کند تا از کراش‌های لحظه‌ای در امان باشد.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od8 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="instantCrashToggleCheckbox"> <b>[od8]</b> تشخیص کراش لحظه‌ای <input type="number" id="instantCrashThreshold" value="3" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od8</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر تعداد ضریب‌های زیر ۱.۰۵ در ۲۰ دور اخیر از آستانه بیشتر شود، ربات استراحت می‌کند.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od9 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="autoTargetToggleCheckbox"> <b>[od9]</b> تنظیم خودکار ضریب بر اساس میانگین ۵ دور <input type="number" id="autoTargetLow" value="1.5" style="width:50px;">x / <input type="number" id="autoTargetHigh" value="2.5" style="width:50px;">x
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od9</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر میانگین ۵ دور اخیر پایین باشد، ضریب خروج را کاهش می‌دهد و اگر بالا باشد، افزایش می‌دهد.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od10-14. تشخیص الگوهای آماری</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od10 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="patternToggleCheckbox"> <b>[od10]</b> الگوی قرمز/سبز <input type="number" id="patternRedStreakInput" value="4" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od10</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر در ۵ دور اخیر، بیش از N بار (قابل تنظیم) ضریب زیر ۱.۸۰ (قرمز) دیده شود، ربات به ضریب هدف (مثلاً ۲.۰۰) تغییر می‌کند.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od11 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="patternAllToggleCheckbox"> <b>[od11]</b> الگوی اختصاصی هر ضریب
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od11</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر تعداد وقوع یک ضریب خاص (مثلاً ۱.۵۰) در ۵۰ دور اخیر از آستانه‌اش بیشتر شود، ربات فوراً به همان ضریب تغییر می‌کند.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od12 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="redRepeatToggleCheckbox"> <b>[od12]</b> الگوی تکراری قرمز <input type="number" id="redRepeatThresholdInput" value="4" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od12</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر یک ضریب در محدوده ۰.۰۰ تا ۱.۷۹ (مثلاً ۱.۵۰) زیاد تکرار شود، ربات به ضریب بالاتر می‌رود یا متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od13 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="percent50ToggleCheckbox"> <b>[od13]</b> الگوی درصدی ۵۰ دور
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od13</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">درصد وقوع هر ضریب را در ۵۰ دور اخیر محاسبه می‌کند و اگر از آستانه‌اش بیشتر شود، واکنش نشان می‌دهد.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od14 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="percentAllToggleCheckbox"> <b>[od14]</b> الگوی درصدی کل تاریخچه
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od14</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">درصد وقوع هر ضریب را در کل تاریخچه محاسبه می‌کند و اگر از آستانه‌اش بیشتر شود، واکنش نشان می‌دهد.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od15. مدیریت نوسان‌پذیری (ATR)</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od15 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="volatilityToggleCheckbox"> <b>[od15]</b> مدیریت نوسان‌پذیری (ATR) <input type="number" id="volatilityMultiplier" value="1.5" style="width:50px;">x
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od15</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر نوسان (انحراف معیار) ۱۰ دور اخیر بالا باشد، ضریب خروج را روی مقدار تعیین‌شده تنظیم می‌کند.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </details>

            <!-- ==================== بخش B: مدیریت سرمایه ==================== -->
            <details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
                <summary style="font-weight:bold; cursor:pointer;">B. مدیریت سرمایه</summary>
                <div style="padding:10px; direction:rtl; text-align:right;">

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od16-18. حد سود/ضرر</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od16 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="takeProfitCheckbox"> <b>[od16]</b> حد سود <input type="number" id="takeProfitInput" value="10" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od16</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر سود خالص به درصد تعیین‌شده از سرمایه اولیه برسد، ربات به‌طور خودکار متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od17 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="stopLossCheckbox"> <b>[od17]</b> حد ضرر <input type="number" id="stopLossInput" value="20" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od17</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر ضرر خالص به درصد تعیین‌شده از سرمایه اولیه برسد، ربات به‌طور خودکار متوقف می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od18 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="trailingStopCheckbox"> <b>[od18]</b> حد ضرر شناور <input type="number" id="trailingStopInput" value="10" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od18</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">با رشد موجودی، نقطه خروج (قله) بالا می‌رود و اگر موجودی از قله به اندازه درصد تعیین‌شده افت کند، ربات متوقف می‌شود.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od19-24. استراتژی‌های پیشرفته</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od19 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="rrToggleCheckbox"> <b>[od19]</b> نسبت ریسک به ریوارد <input type="number" id="rrRatio" value="2" style="width:50px;">x
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od19</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">هدف سود را بر اساس ریسک تعیین می‌کند. (مثلاً با ریسک ۱۰، نسبت ۱:۳ یعنی هدف سود ۳۰).</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od20 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="positionSizingToggleCheckbox"> <b>[od20]</b> حجم شرط بر اساس درصد سرمایه <input type="number" id="riskPercentInput" value="1" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od20</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">مبلغ هر شرط به‌صورت پویا و بر اساس درصد ثابتی (مثلاً ۱٪) از کل موجودی محاسبه می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od21 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="scalingToggleCheckbox"> <b>[od21]</b> خروج پله‌ای <input type="number" id="scalingLevel1" value="1.5" style="width:50px;">x <input type="number" id="scalingPercent1" value="50" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od21</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">سود را در دو مرحله برداشت می‌کند (مثلاً ۵۰٪ در ضریب ۱.۵ و ۵۰٪ باقی‌مانده در ضریب ۲.۵).</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od22 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="breakevenToggleCheckbox"> <b>[od22]</b> حد سربه‌سر <input type="number" id="breakevenThreshold" value="1.3" style="width:50px;">x
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od22</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">پس از اینکه ضریب به یک مقدار مشخص (مثلاً ۱.۳) رسید، ربات در ۱.۰۱x خارج می‌شود تا ریسک معامله صفر شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od23 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="trailingTPToggleCheckbox"> <b>[od23]</b> حفاظت از سود <input type="number" id="trailingTPTarget" value="2.0" style="width:50px;">x
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od23</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">پس از رسیدن به یک ضریب هدف (مثلاً ۲.۰)، اگر قیمت به میزان مشخصی (مثلاً ۰.۴) افت کند، ربات خارج می‌شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od24 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="diversificationToggleCheckbox"> <b>[od24]</b> تنوع‌بخشی <input type="number" id="diversificationAccounts" value="2" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od24</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">سرمایه را به چند حساب مجزا تقسیم می‌کند تا ریسک کلی کاهش یابد.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od25-31. استراتژی‌های ترکیبی</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od25 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboModeToggleCheckbox"> <b>[od25]</b> Golden Combo
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od25</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">یک استراتژی ترکیبی طلایی که به‌صورت خودکار ۴ تنظیم (ریسک ۲٪ + ریوارد ۳ + تریلینگ پس از ۵۰٪ سود + سقف ضرر ۵٪) را اعمال می‌کند.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od26 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboMartingaleToggleCheckbox"> <b>[od26]</b> مارتینگل سبک
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od26</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ترکیبی با ریسک ۱.۵٪، افزایش شرط با ضریب ۱.۵x، سقف ضرر ۴٪ و فعال‌سازی فیلتر روند نزولی.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od27 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboVolatilityToggleCheckbox"> <b>[od27]</b> نوسان و شکست
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od27</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ترکیبی شامل حجم بر اساس نوسان، خروج پله‌ای، ریوارد ۱:۲ و سقف سود روزانه ۱۰٪.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od28 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboShieldToggleCheckbox"> <b>[od28]</b> حفاظت کامل
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od28</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ترکیبی با شرط ثابت ۲، فعال‌سازی تمام فیلترهای امنیتی، سقف ضرر ۳٪ و سقف سود ۵٪.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od29 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboFastToggleCheckbox"> <b>[od29]</b> شکست سریع
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od29</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ترکیبی تهاجمی با ریسک ۲٪، ریوارد ۴، خروج پله‌ای در ۲.۰ و ۴.۰ و سقف سود روزانه ۱۵٪.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od30 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboSqueezeToggleCheckbox"> <b>[od30]</b> دفاع در برابر فشردن
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od30</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ترکیبی تدافعی با ریسک ۱٪، ریوارد ۱.۵، تریلینگ استاپ فعال از ابتدا و فعال‌سازی همه فیلترهای الگو.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od31 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="comboDiversifyToggleCheckbox"> <b>[od31]</b> تنوع‌بخشی هوشمند
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od31</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">سرمایه را به دو بخش ۶۰٪ (ریسک ۲٪) و ۴۰٪ (ریسک ۱٪) تقسیم می‌کند.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                    ${HR}

                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od32-35. مدیریت پیشرفته</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <!-- od32 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="resetModeToggleCheckbox"> <b>[od32]</b> بازگشت به پایه <input type="number" id="resetDropPercent" value="15" style="width:50px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od32</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر سرمایه از قله به درصد تعیین‌شده (مثلاً ۱۵٪) افت کرد، ربات به‌طور خودکار به حداقل شرط (۲ واحد) بازمی‌گردد.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od33 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="kellyToggleCheckbox"> <b>[od33]</b> استراتژی Kelly
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od33</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">مبلغ شرط را بر اساس شانس برد محاسبه می‌کند تا رشد لگاریتمی سرمایه بهینه شود.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od34 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="conservativeToggleCheckbox"> <b>[od34]</b> حالت محافظه‌کار
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od34</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">پس از ۳ باخت متوالی، مبلغ شرط را ۵۰٪ کاهش می‌دهد.</div>
                                    </details>
                                </div>
                                ${HR}
                                <!-- od35 -->
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="liquidityToggleCheckbox"> <b>[od35]</b> سپر نقدینگی
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od35</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">اگر موجودی به زیر ۵۰٪ سرمایه اولیه رسید، ربات فقط با ریسک حداقلی (ضریب ۱.۱۰ و مبلغ ۰.۵) کار می‌کند.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </details>

            <!-- ==================== بخش C: استراتژی‌های ویژه ==================== -->
            <details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
                <summary style="font-weight:bold; cursor:pointer;">C. استراتژی‌های ویژه</summary>
                <div style="padding:10px; direction:rtl; text-align:right;">

                    <!-- od36 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od36. شرطبندی با مبلغ و ضریب ثابت</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="fixedBetToggleCheckbox"> <b>[od36]</b> شرطبندی با مبلغ و ضریب ثابت
                                        <input type="number" id="fixedBetAmountInput" value="2" style="width:60px;">
                                        <input type="number" id="fixedBetMultiplierInput" step="0.01" min="1.01" value="2.00" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od36</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">یک ضریب ثابت از 1.01 تا 100.00 تنظیم کنید با یک مبلغ ثابت تا در هر دور ربات شرطبندی کند.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od37 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od37. شروع شرطبندی بعد از چندین باخت</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="betAfterStreakToggleCheckbox"> <b>[od37]</b> شروع شرطبندی بعد از چندین باخت
                                        <input type="number" id="betAfterStreakThresholdInput" value="3" style="width:50px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od37</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">تنظیم شرطبندی ربات بعد از چندین باخت پیاپی.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od38 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od38. استراتژی شرطبندی لابوشر</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od38ToggleCheckbox"> <b>[od38]</b> استراتژی شرطبندی لابوشر
                                        <input type="text" id="od38SequenceInput" placeholder="مثلا: 1,2,3" style="width:100px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od38</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">استراتژی لابوشر با یک رشته عدد شروع می‌شود و مبلغ هر شرط، جمع عدد اول و آخر آن رشته است. اگر ببری، آن دو عدد خط می‌خورند و اگر ببازی، مبلغ شرط به انتهای رشته اضافه می‌شود. این چرخه تا خالی شدن رشته ادامه دارد تا به سودی برابر با مجموع اعداد اولیه برسی.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od39 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od39. استراتژی آسیاب اسکار</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od39ToggleCheckbox"> <b>[od39]</b> استراتژی آسیاب اسکار
                                        <input type="number" id="od39BaseUnitInput" placeholder="مبلغ پایه (پیش‌فرض 1)" style="width:80px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od39</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ضریب روی 2.00 قرار داده میشود. بعد از هر باخت، مبلغ شرط تغییر نمی‌کند و بعد از هر برد، یک واحد به اندازه مبلغ پایه افزایش می‌ده. هدف این است که با رسیدن سود به اندازه ۱ واحد پایه، به مبلغ اولیه بازگردید.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od40 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od40. استراتژی آنتی-مارتینگل (پارولی)</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od40ToggleCheckbox"> <b>[od40]</b> استراتژی آنتی-مارتینگل (پارولی)
                                        <input type="number" id="od40BaseBetInput" placeholder="مبلغ پایه (پیش‌فرض 1)" style="width:80px;">
                                        <input type="number" id="od40MaxStreakInput" placeholder="سقف برد (پیش‌فرض 3)" style="width:60px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od40</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ضریب روی 2.00 تنظیم می‌شود. بعد از هر برد، مبلغ شرط دو برابر می‌شود و بعد از هر باخت، به مبلغ پایه بازمی‌گردد. پس از رسیدن به سقف بردها، ریست می‌شود.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od41 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od41. استراتژی پاراچوت</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od41ToggleCheckbox"> <b>[od41]</b> استراتژی پاراچوت
                                        <input type="number" id="od41BaseBetInput" placeholder="مبلغ پایه (پیش‌فرض 1)" style="width:80px;">
                                        <input type="number" id="od41ParachuteInput" placeholder="حد ضرر (پیش‌فرض 10)" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od41</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ضریب روی 2.00 تنظیم می‌شود. پس از هر باخت، مبلغ به اندازه مبلغ پایه افزایش می‌یابد و پس از هر برد ثابت می‌ماند تا زمانی که سود کل به صفر برسد. اگر ضرر به حد پاراچوت برسد، سیکل متوقف می‌شود.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od42 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od42. استراتژی پوشش ضرر (Loss Coverage)</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od42ToggleCheckbox"> <b>[od42]</b> استراتژی پوشش ضرر
                                        <input type="number" id="od42TargetInput" step="0.01" min="1.01" placeholder="ضریب (پیش‌فرض 2)" style="width:70px;">
                                        <input type="number" id="od42UnitInput" placeholder="واحد پایه (پیش‌فرض 1)" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od42</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">مبلغ شرط بر اساس فرمول (مجموع ضررها + واحد پایه) / (ضریب - 1) محاسبه می‌شود. پس از یک برد، ضررها صفر شده و به واحد پایه بازمی‌گردید. ضریب قابل تنظیم است.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od43 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od43. نقد کردن در زمان‌های خاص</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od43ToggleCheckbox"> <b>[od43]</b> نقد کردن در زمان‌های خاص
                                        <input type="number" id="od43TimeInput" step="0.5" min="0.5" placeholder="زمان (ثانیه)" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od43</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ربات دقیقاً در زمان تعیین‌شده (به ثانیه) از بازی خارج می‌شود، صرف‌نظر از اینکه ضریب چقدر است. این استراتژی به شما کمک می‌کند تا ریسک سقوط‌های لحظه‌ای را کاهش دهید و از تصمیمات احساسی دوری کنید.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od44 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od44. لایه‌بندی پیش‌رونده</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od44ToggleCheckbox"> <b>[od44]</b> لایه‌بندی پیش‌رونده
                                        <input type="number" id="od44Layer1Input" step="0.01" min="1.01" placeholder="لایه ۱" style="width:70px;">
                                        <input type="number" id="od44Layer2Input" step="0.01" min="1.01" placeholder="لایه ۲" style="width:70px;">
                                        <input type="number" id="od44ThresholdInput" placeholder="آستانه سود" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od44</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">ربات دارای دو لایه ضریب است. تا زمانی که سود کل از آستانه تعیین‌شده کمتر باشد، از لایه پایه (ضریب پایین‌تر) استفاده می‌کند. وقتی سود به آستانه رسید، به‌طور خودکار به لایه پیشرفته (ضریب بالاتر) تغییر می‌کند تا از روندهای صعودی بهره ببرد. پس از کاهش سود به زیر آستانه، مجدداً به لایه پایه بازمی‌گردد.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od45 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od45. استراتژی درصد ثابت</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od45ToggleCheckbox"> <b>[od45]</b> استراتژی درصد ثابت
                                        <input type="number" id="od45PercentageInput" placeholder="درصد (پیش‌فرض ۲)" style="width:60px;">%
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od45</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">مبلغ شرط بر اساس درصد ثابتی از کل موجودی (سرمایه اولیه + سود فعلی) محاسبه می‌شود. ضریب خروج روی ۲.۰۰ تنظیم می‌شود. این استراتژی ریسک را متناسب با سرمایه تنظیم می‌کند و از ورشکستگی جلوگیری می‌کند.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>
                    ${HR}

                    <!-- od46 -->
                    <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
                        <summary style="cursor:pointer;">od46. استراتژی جبران اجباری</summary>
                        <div style="padding:10px;">
                            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">
                                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                                    <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                                        <input type="checkbox" id="od46ToggleCheckbox"> <b>[od46]</b> استراتژی جبران اجباری
                                        <input type="number" id="od46TargetInput" placeholder="هدف (پیش‌فرض 10)" style="width:70px;">
                                        <input type="number" id="od46MaxRoundsInput" placeholder="حداکثر دور (پیش‌فرض 3)" style="width:70px;">
                                        <input type="number" id="od46MultiplierInput" step="0.01" placeholder="ضریب (پیش‌فرض 2)" style="width:70px;">
                                    </label>
                                    <details style="font-size:12px; background:#ff0000; color:#ffffff; border:1px solid #555; border-radius:4px; padding:2px 8px; cursor:pointer;">
                                        <summary style="outline:none; font-weight:bold; color:#ffffff;">راهنمای od46</summary>
                                        <div style="padding:6px 10px; font-size:13px; color:#e0e0e0; background:#222; border:1px solid #555; border-radius:4px; margin-top:4px; max-width:260px;">وقتی مجموع ضرر به هدف رسید، حالت جبران فعال می‌شود. ربات در حداکثر N دور با فرمول پوشش ضرر تلاش می‌کند جبران کند. در صورت موفقیت به حالت عادی برمی‌گردد، در غیر این صورت استراحت اجباری می‌شود.</div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </details>

                </div>
            </details>
        </div>
    </details>
    `;

    var statsTableHTML = createStatsTable();

    var customMultiplierPanelHTML = `
    <div style="border:1px solid #ddd; background:#fff3cd; padding:10px; margin:10px 0; border-radius:5px; direction:rtl; text-align:right;" id="customMultiplierPanel">
        <b>[od58]</b> ضریب برداشت ربات <span style="font-size:13px; color:#aaa;">(دکمه‌های انتخاب ضریب برداشت (از ۱.۱۰ تا ۴.۰۰) که هر کدام دنباله مارتینگل اختصاصی خود را فعال می‌کنند.)</span>
        <span id="currentMultiplierDisplay">2.00</span>
        <div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:5px;">
            <button class="presetBtn" data-mult="1.10" style="background:black; color:white;">1.10</button>
            <button class="presetBtn" data-mult="1.20" style="background:grey; color:white;">1.20</button>
            <button class="presetBtn" data-mult="1.30" style="background:brown; color:white;">1.30</button>
            <button class="presetBtn" data-mult="1.50" style="background:purple; color:white;">1.50</button>
            <button class="presetBtn" data-mult="1.80" style="background:#28a745; color:white;">1.80</button>
            <button class="presetBtn" data-mult="2.00" style="background:yellow; color:black;">2.00</button>
            <button class="presetBtn" data-mult="3.00" style="background:orange; color:white;">3.00</button>
            <button class="presetBtn" data-mult="4.00" style="background:red; color:white;">4.00</button>
        </div>
        <div id="seqDisplay" style="font-size:12px; margin-top:8px; background:#111; padding:5px; border:1px solid #333; color:#ccc;"></div>
        <b>[od59]</b> <button id="manualPauseBtn" style="background:#28a745; color:white; width:100%; margin-top:10px;">فعال/توقف ربات</button>
    </div>
    `;

    h_information.after("<div class='top-link' style='direction:rtl; text-align:right;'><h4 id='hadi-box'><b>" + t_times + "</b><br><span style='color:#00ffff; font-size:12px;'>ربات نصب شد</span></h4></div> ");
    $('div.top-link.user-name').after(robotSettingsHTML + statsTableHTML + customMultiplierPanelHTML);

    var presetBtns = document.querySelectorAll('.presetBtn');
    if (presetBtns.length > 0) {
        presetBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var mult = parseFloat(this.getAttribute('data-mult'));
                applyPreset(mult);
            });
        });
    }

    var pauseBtn = document.getElementById('manualPauseBtn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            manualPause = !manualPause;
            this.innerHTML = manualPause ? 'فعال کردن ربات' : 'توقف ربات';
            this.style.background = manualPause ? '#28a745' : '#ffc107';
            this.style.color = manualPause ? 'white' : 'black';
            if (!manualPause) { checkBettingCondition(bustHistory); getInformation(); if (!isBetActive && allowBetting && bustHistory.length>=50) getCondition(); }
            else { if (isBetActive) { t_setCashCancelBtn.click(); isBetActive=false; } checkBettingCondition(bustHistory); getInformation(); }
        });
    }

    var copyFullBtn = document.getElementById('manualCopyFullHistoryBtn');
    if (copyFullBtn) {
        copyFullBtn.addEventListener('click', function() {
            if (!fullHistory || fullHistory.length === 0) { alert("هیچ ضریبی ثبت نشده است!"); return; }
            var formatted = fullHistory.map(v => v.toFixed(2)+"---\n").join('');
            navigator.clipboard.writeText(formatted).then(() => {
                this.innerHTML = "کپی شد!";
                this.style.background = "#17a2b8";
                setTimeout(() => { this.innerHTML = "کپی کل ضرایب"; this.style.background = "#6f42c1"; }, 1500);
            }).catch(err => alert("خطا در کپی: " + err));
        });
    }

    var copyHistBtn = document.getElementById('copyManualHistory');
    if (copyHistBtn) {
        copyHistBtn.addEventListener('click', function() {
            if (!bustHistory || bustHistory.length === 0) { alert("ابتدا باید ضرایب بارگذاری شوند!"); return; }
            var formatted = bustHistory.map(v => v.toFixed(2)+"---\n").join('');
            navigator.clipboard.writeText(formatted).then(() => {
                this.innerHTML = "کپی شد!";
                this.style.background = "#17a2b8";
                setTimeout(() => { this.innerHTML = "کپی ۵۰ ضریب"; this.style.background = "#007bff"; }, 1500);
            }).catch(err => alert("خطا در کپی: " + err));
        });
    }

    var martInput = document.getElementById('martingaleInput');
    if (martInput) {
        martInput.addEventListener('input', function(e) {
            var inputText = e.target.value.trim();
            if (inputText === "") { customMartingaleSequence = []; return; }
            var matches = inputText.match(/\d+\.?\d*/g);
            if (matches && matches.length > 0) {
                var sequence = matches.map(num => parseFloat(num)).filter(num => !isNaN(num) && num > 0);
                if (sequence.length === 1) {
                    var base = sequence[0];
                    var gen = [];
                    for (var i = 0; i < 10; i++) { gen.push(base); base = base * 2; }
                    customMartingaleSequence = gen;
                } else {
                    customMartingaleSequence = sequence;
                }
                console.log("دنباله مارتینگل تنظیم شد:", customMartingaleSequence);
            }
        });
    }

    var initCap = document.getElementById('initialCapitalInput');
    if (initCap) {
        initCap.addEventListener('input', function(e) {
            var val = parseFloat(e.target.value);
            if (isNaN(val) || val < 10) { initialCapital = 100; e.target.value = 100; }
            else initialCapital = val;
            currentProfit = 0; virtualProfit = 0; stopLossAccum = 0; isHitAndRunStopped = false; stopReason = "";
            peakCapital = initialCapital; isPeakStopped = false; lossCounter = 0; emergencyModeActive = false; emergencyStep = 0;
            emergencyHistory = []; damage = 0; currentLossTotal = 0; consecutiveLow179 = 0;
            updateHitAndRunDisplay();
            console.log("سرمایه اولیه تنظیم شد: " + initialCapital);
        });
    }

    var tpCheckbox = document.getElementById('takeProfitCheckbox');
    if (tpCheckbox) tpCheckbox.addEventListener('change', function(e) { takeProfitEnabled = e.target.checked; });
    var tpInput = document.getElementById('takeProfitInput');
    if (tpInput) tpInput.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) { takeProfitPercent = 10; e.target.value = ""; }
        else takeProfitPercent = val;
        updateHitAndRunDisplay();
    });

    var slCheckbox = document.getElementById('stopLossCheckbox');
    if (slCheckbox) slCheckbox.addEventListener('change', function(e) { stopLossEnabled = e.target.checked; });
    var slInput = document.getElementById('stopLossInput');
    if (slInput) slInput.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) { stopLossPercent = 20; e.target.value = ""; }
        else stopLossPercent = val;
        updateHitAndRunDisplay();
    });

    var tsCheckbox = document.getElementById('trailingStopCheckbox');
    if (tsCheckbox) tsCheckbox.addEventListener('change', function(e) {
        trailingStopEnabled = e.target.checked;
        if (trailingStopEnabled) {
            syncInitialCapitalFromSite();
            peakCapital = initialCapital; isPeakStopped = false;
            lossCounter = 0; emergencyModeActive = false; emergencyStep = 0; emergencyHistory = [];
            damage = 0; currentLossTotal = 0; consecutiveLow179 = 0; currentProfit = 0; virtualProfit = 0; stopLossAccum = 0;
            isHitAndRunStopped = false; stopReason = "";
        }
        updatePeakDisplay();
    });
    var tsInput = document.getElementById('trailingStopInput');
    if (tsInput) tsInput.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) { trailingStopPercent = 10; e.target.value = ""; }
        else trailingStopPercent = val;
        updatePeakDisplay();
    });

    var streakToggle = document.getElementById('streakToggleCheckbox');
    if (streakToggle) streakToggle.addEventListener('change', function(e) { streakDetectionEnabled = e.target.checked; checkBettingCondition(bustHistory); getInformation(); });
    var streakInput = document.getElementById('streakThresholdInput');
    if (streakInput) streakInput.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) { streakThreshold = 7; e.target.value = 7; }
        else streakThreshold = val;
        checkBettingCondition(bustHistory); getInformation();
    });

    var low180Toggle = document.getElementById('low180ToggleCheckbox');
    if (low180Toggle) low180Toggle.addEventListener('change', function(e) { low180DetectionEnabled = e.target.checked; checkBettingCondition(bustHistory); getInformation(); });
    var low180Input = document.getElementById('low180ThresholdInput');
    if (low180Input) low180Input.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 30) { low180Threshold = 60; e.target.value = 60; }
        else low180Threshold = val;
        checkBettingCondition(bustHistory); getInformation();
    });

    var longTermToggle = document.getElementById('longTermToggleCheckbox');
    if (longTermToggle) longTermToggle.addEventListener('change', function(e) { longTermDetectionEnabled = e.target.checked; checkBettingCondition(bustHistory); getInformation(); });
    var longTermInput = document.getElementById('longTermThresholdInput');
    if (longTermInput) longTermInput.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 30) { longTermThreshold = 55; e.target.value = 55; }
        else longTermThreshold = val;
        checkBettingCondition(bustHistory); getInformation();
    });

    var below2Toggle = document.getElementById('below2ToggleCheckbox');
    if (below2Toggle) below2Toggle.addEventListener('change', function(e) { below2DetectionEnabled = e.target.checked; checkBettingCondition(bustHistory); getInformation(); });
    var below2Input = document.getElementById('below2ThresholdInput');
    if (below2Input) below2Input.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 30) { maxAllowedBelow2 = 52; e.target.value = 52; }
        else maxAllowedBelow2 = val;
        checkBettingCondition(bustHistory); getInformation();
    });

    var resetBtns = document.querySelectorAll('.reset-hit-and-run-btn');
    if (resetBtns.length > 0) {
        resetBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                syncInitialCapitalFromSite();
                var chipsElement = document.querySelector('div.top-link.chips-amount');
                if (chipsElement) {
                    var text = chipsElement.innerText.trim();
                    var extractedNumber = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!isNaN(extractedNumber) && extractedNumber > 0) initialCapital = extractedNumber;
                }
                var inputField = document.getElementById('initialCapitalInput');
                if (inputField) {
                    var manualVal = parseInt(inputField.value);
                    if (!isNaN(manualVal) && manualVal >= 10) initialCapital = manualVal;
                    inputField.value = initialCapital;
                }
                currentProfit = 0; virtualProfit = 0; stopLossAccum = 0; isHitAndRunStopped = false; stopReason = "";
                peakCapital = initialCapital; isPeakStopped = false; lossCounter = 0; emergencyModeActive = false; emergencyStep = 0;
                emergencyHistory = []; damage = 0; currentLossTotal = 0; consecutiveLow179 = 0; allowBetting = true; isTemporarilyPaused = false;
                checkBettingCondition(bustHistory); getInformation(); updateHitAndRunDisplay(); updatePeakDisplay(); updateStatsTable();
                console.log("سرمایه جدید: " + initialCapital);
            });
        });
    }

    var probBtn = document.getElementById('calcProbabilityBtn');
    if (probBtn) probBtn.addEventListener('click', function() { calculateProbability(); });
    var sessionBtn = document.getElementById('analyzeSessionBtn');
    if (sessionBtn) sessionBtn.addEventListener('click', function() { analyzeSession(); });
    var formBtn1 = document.getElementById('calcFormulasBtn');
    if (formBtn1) formBtn1.addEventListener('click', function() { updateFormulaAnalysis(); });
    var formBtn2 = document.getElementById('calcFormulasBtn2');
    if (formBtn2) formBtn2.addEventListener('click', function() { updateFormulaAnalysis(); });
    var expK = document.getElementById('exp_k_input');
    if (expK) expK.addEventListener('input', function() { updateFormulaAnalysis(); });
    var expInv = document.getElementById('exp_inv_lambda_input');
    if (expInv) expInv.addEventListener('input', function() { updateFormulaAnalysis(); });
    var verifyBtn = document.getElementById('verifyHashBtn');
    if (verifyBtn) verifyBtn.addEventListener('click', function() { verifyHash(); });

    var dupBtn = document.getElementById('checkDuplicatesBtn');
    if (dupBtn) dupBtn.addEventListener('click', function() { checkDuplicates(); });
    var copyFake = document.getElementById('copyFakeRecordBtn');
    if (copyFake) copyFake.addEventListener('click', function() {
        if (fakeHashRecord) {
            var text = "هش جعلی شناسایی شد!\nمحاسبه: "+fakeHashRecord.calculated.toFixed(2)+"\nواقعی: "+fakeHashRecord.actual.toFixed(2)+"\nهش: "+fakeHashRecord.hash;
            navigator.clipboard.writeText(text).then(() => {
                this.innerHTML = "✅ کپی شد!";
                this.style.background = "#28a745";
                setTimeout(() => { this.innerHTML = "کپی رکورد"; this.style.background = "#c0392b"; }, 2000);
            });
        }
    });

    var saveDataBtn = document.getElementById('saveDataBtn');
    if (saveDataBtn) saveDataBtn.addEventListener('click', function() { saveDataToLocal(); });
    var loadDataBtn = document.getElementById('loadDataBtn');
    if (loadDataBtn) loadDataBtn.addEventListener('click', function() { loadDataFromLocal(); });
    var adLearn = document.getElementById('adaptiveLearningToggleCheckbox');
    if (adLearn) adLearn.addEventListener('change', function(e) {
        adaptiveLearningEnabled = e.target.checked;
        if (!adaptiveLearningEnabled && autoSaveIntervalId) { clearInterval(autoSaveIntervalId); autoSaveIntervalId=null; }
        else if (adaptiveLearningEnabled && document.getElementById('autoSaveToggleCheckbox').checked) startAutoSave();
        updateAdaptiveDisplay();
    });
    var autoSave = document.getElementById('autoSaveToggleCheckbox');
    if (autoSave) autoSave.addEventListener('change', function(e) {
        autoSaveEnabled = e.target.checked;
        if (autoSaveEnabled && adaptiveLearningEnabled) startAutoSave();
        else if (autoSaveIntervalId) { clearInterval(autoSaveIntervalId); autoSaveIntervalId=null; }
    });
    var autoAction = document.getElementById('autoActionToggleCheckbox');
    if (autoAction) autoAction.addEventListener('change', function(e) { autoActionEnabled = e.target.checked; });
    var aggressive = document.getElementById('aggressiveActionCheckbox');
    if (aggressive) aggressive.addEventListener('change', function(e) { aggressiveEnabled = e.target.checked; });
    var defensive = document.getElementById('defensiveActionCheckbox');
    if (defensive) defensive.addEventListener('change', function(e) { defensiveEnabled = e.target.checked; });
    var timeSlot = document.getElementById('timeSlotInterval');
    if (timeSlot) timeSlot.addEventListener('input', function(e) {
        var val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val>=5 && val<=60) { timeSlotInterval=val; updateAdaptiveDisplay(); }
    });

    updateHitAndRunDisplay();
    updatePeakDisplay();
    setTimeout(syncInitialCapitalFromSite, 1000);
    setTimeout(updateFormulaAnalysis, 500);
}

function checkDuplicates() {
    var display = document.getElementById('duplicateResultDisplay');
    if (!display) return;
    display.style.color = "#ffd700";
    display.innerHTML = "در حال بررسی...";

    var duplicateResults = [];

    var md5Map = {};
    for (var i=0; i<md5History.length; i++) {
        var md5 = md5History[i];
        if (md5Map[md5]) md5Map[md5].push(i);
        else md5Map[md5] = [i];
    }
    for (var key in md5Map) {
        if (md5Map[key].length > 1) {
            var indices = md5Map[key];
            var coefs = indices.map(idx => bustHistory[idx] ? bustHistory[idx].toFixed(2) : "نامشخص");
            duplicateResults.push("🔴 MD5 تکراری: <b>"+key+"</b> (تکرار در ضریب‌های: " + coefs.join(", ") + ")");
        }
    }

    var hashMap = {};
    for (var j=0; j<hashHistory.length; j++) {
        var hash = hashHistory[j];
        if (hashMap[hash]) hashMap[hash].push(j);
        else hashMap[hash] = [j];
    }
    for (var key in hashMap) {
        if (hashMap[key].length > 1) {
            var indices = hashMap[key];
            var coefs = indices.map(idx => bustHistory[idx] ? bustHistory[idx].toFixed(2) : "نامشخص");
            duplicateResults.push("🔴 HASH تکراری: <b>"+key.substring(0,15)+"...</b> (تکرار در ضریب‌های: " + coefs.join(", ") + ")");
        }
    }

    if (duplicateResults.length === 0) {
        display.innerHTML = "✅ هیچ MD5 یا HASH تکراری در ۵۰ دور اخیر یافت نشد.";
        display.style.color = "#2ecc71";
    } else {
        display.innerHTML = duplicateResults.join("<br>");
        display.style.color = "#e74c3c";
    }
}

function md5(str) {
    function toBytes(s) {
        var bytes = [];
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 0x80) bytes.push(c);
            else if (c < 0x800) { bytes.push(0xc0 | (c >> 6)); bytes.push(0x80 | (c & 0x3f)); }
            else if (c < 0xd800 || c >= 0xe000) { bytes.push(0xe0 | (c >> 12)); bytes.push(0x80 | ((c >> 6) & 0x3f)); bytes.push(0x80 | (c & 0x3f)); }
            else { i++; var c2 = s.charCodeAt(i); var c3 = ((c & 0x3ff) << 10) + (c2 & 0x3ff) + 0x10000; bytes.push(0xf0 | (c3 >> 18)); bytes.push(0x80 | ((c3 >> 12) & 0x3f)); bytes.push(0x80 | ((c3 >> 6) & 0x3f)); bytes.push(0x80 | (c3 & 0x3f)); }
        }
        return bytes;
    }
    var bytes = toBytes(str);
    var len = bytes.length;
    var bitLen = len * 8;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0x00);
    for (var i = 0; i < 8; i++) { bytes.push((bitLen >>> (i * 8)) & 0xff); }

    function leftRotate(x, c) { return (x << c) | (x >>> (32 - c)); }
    function F(x, y, z) { return (x & y) | (~x & z); }
    function G(x, y, z) { return (x & z) | (y & ~z); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | ~z); }

    var K = [0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391];
    var S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];

    var a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    for (var i = 0; i < bytes.length; i += 64) {
        var A = a0, B = b0, C = c0, D = d0;
        var M = [];
        for (var j = 0; j < 16; j++) { M[j] = bytes[i + j * 4] | (bytes[i + j * 4 + 1] << 8) | (bytes[i + j * 4 + 2] << 16) | (bytes[i + j * 4 + 3] << 24); }
        for (var k = 0; k < 64; k++) {
            var g, f;
            if (k < 16) { f = F(B, C, D); g = k; }
            else if (k < 32) { f = G(B, C, D); g = (5 * k + 1) % 16; }
            else if (k < 48) { f = H(B, C, D); g = (3 * k + 5) % 16; }
            else { f = I(B, C, D); g = (7 * k) % 16; }
            var temp = D; D = C; C = B; B = B + leftRotate((A + f + K[k] + M[g]) & 0xffffffff, S[k]); A = temp;
        }
        a0 = (a0 + A) & 0xffffffff; b0 = (b0 + B) & 0xffffffff; c0 = (c0 + C) & 0xffffffff; d0 = (d0 + D) & 0xffffffff;
    }
    function toHex(num) { var str = ''; for (var i = 0; i < 4; i++) { str += ('0' + ((num >>> (i * 8)) & 0xff).toString(16)).slice(-2); } return str; }
    return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

function getCurrentSlotKey() {
    var d = new Date(), h = d.getHours(), m = d.getMinutes();
    var slot = Math.floor(m / timeSlotInterval) * timeSlotInterval;
    var end = slot + timeSlotInterval;
    if (end > 60) end = 60;
    return h.toString().padStart(2,'0') + ":" + slot.toString().padStart(2,'0') + "-" + end.toString().padStart(2,'0');
}
function saveDataToLocal() {
    try { var key = document.getElementById('localStorageKeyInput').value.trim() || localStorageKey; localStorage.setItem(key, JSON.stringify(hourlyStats)); } catch(e){}
}
function loadDataFromLocal() {
    try { var key = document.getElementById('localStorageKeyInput').value.trim() || localStorageKey; var stored = localStorage.getItem(key); if (stored) { hourlyStats = JSON.parse(stored); ensureHourlyStatsStructure(); updateAdaptiveDisplay(); } else alert("هیچ داده‌ای یافت نشد."); } catch(e){}
}
function ensureHourlyStatsStructure() {
    for (var key in hourlyStats) { if (!hourlyStats[key].games) hourlyStats[key].games = 0; if (!hourlyStats[key].wins) hourlyStats[key].wins = 0; if (!hourlyStats[key].totalMultiplier) hourlyStats[key].totalMultiplier = 0; }
}
function startAutoSave() {
    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = setInterval(function() { if (adaptiveLearningEnabled && autoSaveEnabled) saveDataToLocal(); }, 300000);
}
function updateHourlyStats(win, multiplier) {
    if (!adaptiveLearningEnabled) return;
    var slot = getCurrentSlotKey();
    if (!hourlyStats[slot]) hourlyStats[slot] = {games:0, wins:0, totalMultiplier:0};
    hourlyStats[slot].games += 1; hourlyStats[slot].totalMultiplier += multiplier;
    if (win) hourlyStats[slot].wins += 1;
    if (!autoSaveEnabled && hourlyStats[slot].games % 10 === 0) saveDataToLocal();
    updateAdaptiveDisplay();
}
function getAdaptiveRecommendation() {
    if (!adaptiveLearningEnabled) return {action:"normal", reason:"غیرفعال"};
    var slot = getCurrentSlotKey();
    var stats = hourlyStats[slot];
    if (!stats || stats.games < 5) return {action:"normal", reason:"داده کافی نیست"};
    var winRate = (stats.wins / stats.games) * 100;
    var avg = stats.totalMultiplier / stats.games;
    if (autoActionEnabled) {
        if (aggressiveEnabled && winRate > 60 && avg > 1.8) return {action:"aggressive", reason:"ساعت طلایی! برد "+winRate.toFixed(1)+"% و میانگین "+avg.toFixed(2)+"x"};
        if (defensiveEnabled && winRate < 40) return {action:"defensive", reason:"ساعت پرخطر! برد فقط "+winRate.toFixed(1)+"%"};
    }
    return {action:"neutral", reason:"حالت متعادل. برد "+winRate.toFixed(1)+"%"};
}
function updateAdaptiveDisplay() {
    if (!document.getElementById('currentSlotDisplay')) return;
    var slot = getCurrentSlotKey();
    document.getElementById('currentSlotDisplay').textContent = slot;
    var totalGames = 0; for (var k in hourlyStats) totalGames += hourlyStats[k].games;
    document.getElementById('totalLearnedData').textContent = totalGames;
    var stats = hourlyStats[slot];
    if (stats && stats.games > 0) {
        var wr = (stats.wins / stats.games) * 100;
        var avg = stats.totalMultiplier / stats.games;
        document.getElementById('hourlyWinRate').textContent = wr.toFixed(1) + "%";
        document.getElementById('hourlyAvgMultiplier').textContent = avg.toFixed(2) + "x";
    } else {
        document.getElementById('hourlyWinRate').textContent = "بدون داده";
        document.getElementById('hourlyAvgMultiplier').textContent = "بدون داده";
    }
    var dec = getAdaptiveRecommendation();
    var el = document.getElementById('aiDecisionDisplay');
    if (dec.action === "aggressive") { el.innerHTML = "🚀 حالت تهاجمی - " + dec.reason; el.style.color = "#2ecc71"; }
    else if (dec.action === "defensive") { el.innerHTML = "🛡️ حالت دفاعی - " + dec.reason; el.style.color = "#e74c3c"; }
    else { el.innerHTML = "⚖️ حالت متعادل - " + dec.reason; el.style.color = "#f1c40f"; }
}

function updateFormulaAnalysis() {
    if (!document.getElementById('f1_50')) return;
    if (bustHistory.length < 2) {
        ['f1_50','f1_all','f2_50','f2_all','f3_50','f3_all','f4_50','f4_all'].forEach(id => document.getElementById(id).textContent = "نیاز به داده");
        return;
    }
    var k = parseFloat(document.getElementById('exp_k_input').value) || 2.0;
    var lambda = parseFloat(document.getElementById('exp_inv_lambda_input').value) || 0.5;
    function calcF1(d) { var c=0; for(var i=0;i<d.length;i++){var M=d[i]; if(M>99){var X=1-(99/M); if(X>0.01&&X<0.99)c++;}} return (c/d.length)*100; }
    function calcF2(d,k){var c=0,maxM=Math.exp(k); for(var i=0;i<d.length;i++){var M=d[i]; if(M>=1&&M<=maxM){var X=Math.log(M)/k; if(X>0.01&&X<0.99)c++;}} return (c/d.length)*100; }
    function calcF3(d,lambda){var c=0; for(var i=0;i<d.length;i++){var M=d[i]; if(M>=1){var X=1-Math.exp(-lambda*(M-1)); if(X>0.01&&X<0.99)c++;}} return (c/d.length)*100; }
    function calcF4(d){var Y=4503599627370496,c=0; for(var i=0;i<d.length;i++){var M=d[i]; var X=(100*Y*(1+M))/(M+100); if(Math.abs(X-Math.round(X))<1e-6)c++;} return (c/d.length)*100; }
    document.getElementById('f1_50').textContent = calcF1(bustHistory).toFixed(1)+"%";
    document.getElementById('f1_all').textContent = calcF1(fullHistory).toFixed(1)+"%";
    document.getElementById('f2_50').textContent = calcF2(bustHistory,k).toFixed(1)+"%";
    document.getElementById('f2_all').textContent = calcF2(fullHistory,k).toFixed(1)+"%";
    document.getElementById('f3_50').textContent = calcF3(bustHistory,lambda).toFixed(1)+"%";
    document.getElementById('f3_all').textContent = calcF3(fullHistory,lambda).toFixed(1)+"%";
    document.getElementById('f4_50').textContent = calcF4(bustHistory).toFixed(1)+"%";
    document.getElementById('f4_all').textContent = calcF4(fullHistory).toFixed(1)+"%";
}
function calculateMultiplierFromHash(hash) {
    if (!hash || hash.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(hash)) throw new Error("هش نامعتبر");
    var parts=[]; for(var i=0;i<hash.length;i+=4) parts.push(hash.substring(i,i+4));
    var sum=0; for(var j=0;j<parts.length;j++) sum += parseInt(parts[j],16);
    if(sum % 5 === 0) return 0.00;
    var X = parseInt(hash.substring(0,13),16);
    var Y = 4503599627370496;
    var mult = (100 * ((Y - X) / X)) / (X - (Y * 100));
    if(mult < 0) mult = Math.abs(mult);
    return parseFloat(mult.toFixed(2));
}
function verifyHash() {
    var hash = document.getElementById('hashInput').value.trim();
    var userMD5 = document.getElementById('md5Input').value.trim();

    if (!hash || hash.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(hash)) {
        document.getElementById('hashResultMultiplier').textContent = "خطا";
        document.getElementById('hashResultStatus').textContent = "❌ SHA256 نامعتبر است!";
        return;
    }

    try {
        var multiplier = calculateMultiplierFromHash(hash);
        document.getElementById('hashResultMultiplier').textContent = multiplier.toFixed(2);

        var status = "✅ ضریب محاسبه شد: " + multiplier.toFixed(2);

        if (userMD5.length > 0) {
            var computedMD5 = md5(hash).toLowerCase();
            if (computedMD5 === userMD5.toLowerCase()) {
                status += " | 🟢 MD5 تأیید شد! (هش جعل‌ناپذیر است)";
            } else {
                status = "❌ MD5 نادرست! هش محاسبه‌شده با هش واردشده مطابقت ندارد. (هش احتمالاً دستکاری شده است)";
                document.getElementById('hashResultStatus').textContent = status;
                return;
            }
        }
        document.getElementById('hashResultStatus').textContent = status;
    } catch(e) {
        document.getElementById('hashResultMultiplier').textContent = "خطا";
        document.getElementById('hashResultStatus').textContent = "❌ " + e.message;
    }
}
function autoVerifyLastHash() {
    var statusEl = document.getElementById('autoVerifyStatus');
    var fakeContainer = document.getElementById('fakeHashRecordContainer');
    fakeContainer.style.display = 'none';
    if (md5History.length === 0 || bustHistory.length === 0) {
        statusEl.textContent = "⚠️ داده کافی نیست"; statusEl.style.color = "#f1c40f"; return;
    }
    var lastMD5 = md5History[0];
    var actualMultiplier = bustHistory[0];
    try {
        var calculated = calculateMultiplierFromHash(lastMD5);
        var tolerance = 0.01;
        if (Math.abs(calculated - actualMultiplier) <= tolerance) {
            statusEl.textContent = "✅ کد هش صحیح بود! (ضریب تطابق دارد)";
            statusEl.style.color = "#2ecc71";
            fakeHashRecord = null; fakeContainer.style.display = 'none';
        } else {
            statusEl.textContent = "❌ کد هش جعلی بود! (عدم تطابق ضریب)";
            statusEl.style.color = "#e74c3c";
            fakeHashRecord = { hash: lastMD5, calculated: calculated, actual: actualMultiplier };
            document.getElementById('fakeCalculatedMultiplier').textContent = calculated.toFixed(2);
            document.getElementById('fakeActualMultiplier').textContent = actualMultiplier.toFixed(2);
            document.getElementById('fakeHashValue').textContent = lastMD5;
            fakeContainer.style.display = 'block';
        }
    } catch(e) {
        statusEl.textContent = "❌ خطا: " + e.message; statusEl.style.color = "#e74c3c";
    }
}
function calculateProbability() {
    var target = parseFloat(document.getElementById('probTargetInput').value);
    if (isNaN(target) || target <= 0) { document.getElementById('probDisplay50').textContent = "نامعتبر"; document.getElementById('probDisplayAll').textContent = "نامعتبر"; document.getElementById('probDisplayFinal').textContent = "نامعتبر"; return; }
    var count50 = 0, countAll = 0;
    for (var i=0; i<bustHistory.length; i++) if (bustHistory[i] >= target) count50++;
    for (var j=0; j<fullHistory.length; j++) if (fullHistory[j] >= target) countAll++;
    var prob50 = bustHistory.length > 0 ? (count50/bustHistory.length)*100 : 0;
    var probAll = fullHistory.length > 0 ? (countAll/fullHistory.length)*100 : 0;
    document.getElementById('probDisplay50').textContent = prob50.toFixed(1)+"%";
    document.getElementById('probDisplayAll').textContent = probAll.toFixed(1)+"%";
    var finalProb = (prob50 * 0.6) + (probAll * 0.4);
    document.getElementById('probDisplayFinal').textContent = finalProb.toFixed(1)+"%";
}
function analyzeSession() {
    var minutes = parseInt(document.getElementById('sessionRange').value) || 5;
    var now = Date.now();
    var cutoff = now - (minutes * 60 * 1000);
    var recent = [];
    for (var i=0; i<sessionHistory.length; i++) if (sessionHistory[i].time >= cutoff) recent.push(sessionHistory[i].value);
    if (recent.length < 3) { document.getElementById('avgSessionMultiplier').textContent = "داده کافی نیست"; document.getElementById('sessionRecommendation').textContent = "صبر کنید"; return; }
    var avg = 0; for (var j=0; j<recent.length; j++) avg += recent[j];
    avg = avg / recent.length;
    var rec = avg > 2.5 ? "🟢 بهترین زمان!" : (avg > 1.5 ? "🟡 زمان متوسط" : "🔴 زمان بد!");
    document.getElementById('avgSessionMultiplier').textContent = avg.toFixed(2) + "x";
    document.getElementById('sessionRecommendation').textContent = rec;
}
function updatePeakDisplay() {
    var peakDisplay = document.getElementById('peakValueDisplay');
    if (peakDisplay) peakDisplay.textContent = peakCapital;
}
function applyPreset(multiplier) {
    var sequence;
    if (multiplier === 1.10) sequence = OLD_SEQ_1_10;
    else if (multiplier === 1.20) sequence = OLD_SEQ_1_20;
    else if (multiplier === 1.30) sequence = OLD_SEQ_1_30;
    else if (multiplier === 1.50) sequence = OLD_SEQ_1_50;
    else if (multiplier === 1.80) sequence = OLD_SEQ_1_80;
    else if (multiplier === 2.00) sequence = [2,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215,33554431,67108863,134217727,268435455,536870911,1073741823];
    else if (multiplier === 3.00) sequence = FIBO_SEQ_3;
    else if (multiplier === 4.00) sequence = FIBO_SEQ_4;
    else sequence = [];
    intendedCashoutTarget = multiplier;
    customMartingaleSequence = sequence;
    lossCounter = 0; emergencyModeActive = false; emergencyStep = 0; emergencyHistory = [];
    damage = 0; currentLossTotal = 0; consecutiveLow179 = 0; currentProfit = 0; virtualProfit = 0; stopLossAccum = 0;
    isHitAndRunStopped = false; stopReason = "";
    var displayDiv = document.getElementById('seqDisplay');
    if (displayDiv) {
        var firstFour = sequence.slice(0, 4);
        displayDiv.textContent = firstFour.join(' → ') + " ...";
        displayDiv.style.fontWeight = '900'; displayDiv.style.fontSize = '15px'; displayDiv.style.color = '#ffffff';
        displayDiv.style.fontFamily = 'monospace'; displayDiv.style.letterSpacing = '1px'; displayDiv.style.background = '#1a1a1a';
        displayDiv.style.padding = '10px'; displayDiv.style.borderRadius = '5px'; displayDiv.style.border = '1px solid #555';
        displayDiv.style.boxShadow = 'inset 0 0 5px rgba(255,255,255,0.1)'; displayDiv.style.direction = 'rtl'; displayDiv.style.textAlign = 'right';
    }
    var multiplierDisplay = document.getElementById('currentMultiplierDisplay');
    if (multiplierDisplay) multiplierDisplay.textContent = intendedCashoutTarget.toFixed(2);
    updateHitAndRunDisplay(); getInformation();
    console.log("ضریب آماده " + multiplier + "x فعال شد. دنباله (" + sequence.length + " دور):", sequence);
}

function checkHitAndRun() {
    if (!takeProfitEnabled && !stopLossEnabled) { isHitAndRunStopped = false; stopReason = ""; return; }
    var targetProfit = Math.floor(initialCapital * takeProfitPercent / 100);
    var targetLoss = Math.floor(initialCapital * stopLossPercent / 100);
    if (takeProfitEnabled && virtualProfit >= targetProfit) {
        allowBetting = false; isTemporarilyPaused = true; isHitAndRunStopped = true; stopReason = "profit";
        console.log("حد سود (" + takeProfitPercent + "% = " + targetProfit + " واحد) رسید!"); return;
    }
    if (stopLossEnabled && stopLossAccum >= targetLoss) {
        allowBetting = false; isTemporarilyPaused = true; isHitAndRunStopped = true; stopReason = "loss";
        console.log("حد ضرر (" + stopLossPercent + "% = " + targetLoss + " واحد) رسید! مجموع باخت‌های متوالی: " + stopLossAccum); return;
    }
    isHitAndRunStopped = false; stopReason = "";
}
function checkTrailingStop() {
    if (!trailingStopEnabled || isPeakStopped) return;
    var currentBalance = initialCapital + currentProfit;
    if (currentBalance > peakCapital) { peakCapital = currentBalance; console.log("قله جدید: " + peakCapital); }
    var threshold = Math.floor(peakCapital * (1 - trailingStopPercent / 100));
    if (currentBalance < threshold) {
        allowBetting = false; isTemporarilyPaused = true; isPeakStopped = true;
        console.log("حد ضرر شناور: موجودی " + currentBalance + " از قله " + peakCapital + " بیش از " + trailingStopPercent + "% افت کرد. آستانه: " + threshold);
    }
}
function checkBettingCondition(historyData) {
    if (!historyData || historyData.length === 0) { allowBetting = false; isTemporarilyPaused = true; return; }
    checkTrailingStop(); if (isPeakStopped) return;
    checkHitAndRun(); if (isHitAndRunStopped) return;
    if (manualPause) { allowBetting = false; isTemporarilyPaused = true; return; }
    if (longTermDetectionEnabled && fullHistory.length >= 50) {
        var countBelow2Long = 0; for (var i = 0; i < fullHistory.length; i++) { if (fullHistory[i] < 2.00) countBelow2Long++; }
        var percLong = (countBelow2Long / fullHistory.length) * 100;
        if (percLong > longTermThreshold) { allowBetting = false; isTemporarilyPaused = true; return; }
    }
    if (streakDetectionEnabled && consecutiveLow179 >= streakThreshold) { allowBetting = false; isTemporarilyPaused = true; return; }
    var total = historyData.length; var countBelow2 = 0; var countBelow180 = 0;
    for (var j = 0; j < total; j++) { var v = historyData[j]; if (v < 2.00) countBelow2++; if (v < 1.80) countBelow180++; }
    var percentBelow2 = (countBelow2 / total) * 100; var percentBelow180 = (countBelow180 / total) * 100;
    if (low180DetectionEnabled && percentBelow180 > low180Threshold) { allowBetting = false; isTemporarilyPaused = true; return; }
    if (below2DetectionEnabled && percentBelow2 > maxAllowedBelow2) { allowBetting = false; isTemporarilyPaused = true; return; }
    allowBetting = true; isTemporarilyPaused = false;
}
function getOptimizedAmount() {
    if (customMartingaleSequence.length > 0 && lossCounter < customMartingaleSequence.length) return customMartingaleSequence[lossCounter];
    var baseSequence = [2,3,7,15,31,63,127,255,511,1023];
    if (lossCounter < baseSequence.length) return baseSequence[lossCounter];
    if (emergencyModeActive) {
        if (emergencyHistory.length === 0) emergencyHistory = baseSequence.slice();
        var lastBet = emergencyHistory[emergencyHistory.length - 1];
        var secondLastBet = emergencyHistory[emergencyHistory.length - 2];
        var newBet = lastBet + secondLastBet;
        if (emergencyStep < 15) return newBet; else return 1;
    }
    return 1;
}
function increaseBetAfterLoss() { lossCounter++; if (lossCounter === 10 && !emergencyModeActive) { emergencyModeActive = true; emergencyStep = 0; emergencyHistory = []; } }
function resetBetAfterWin() { if (!emergencyModeActive) lossCounter = 0; else { emergencyModeActive = false; emergencyStep = 0; emergencyHistory = []; } }

// ============================================================
//  تابع getPrice (نسخه اصلاح‌شده برای پشتیبانی از استراتژی‌های ویژه)
// ============================================================
function getPrice() {
    var baseAmount = getOptimizedAmount();

    // الگوهای واکنش‌گرا (od10-14) - این‌ها مبلغ را تغییر می‌دهند
    if (od14_active) return 1;
    if (od13_active) return Math.max(1, Math.floor(baseAmount * 0.5));
    if (od11_active) return Math.max(1, Math.floor(baseAmount * 1.2));

    // od20 - حجم شرط بر اساس درصد سرمایه
    if (positionSizingEnabled) {
        var totalCapital = initialCapital + currentProfit;
        var bet = totalCapital * (riskPercent / 100);
        return Math.max(1, Math.floor(bet));
    }

    // od33 - استراتژی Kelly
    if (od33Enabled && fullHistory.length >= 50) {
        var winRate = 0;
        for (var i = 0; i < 50; i++) {
            if (fullHistory[i] >= 2.0) winRate++;
        }
        winRate = (winRate / 50) * 100;
        var kellyFraction = (winRate - (100 - winRate)) / 100;
        if (kellyFraction > 0) {
            var totalCapital = initialCapital + currentProfit;
            return Math.max(1, Math.floor(totalCapital * kellyFraction));
        }
    }

    // od45 - درصد ثابت
    if (od45Enabled) {
        var totalCapital = initialCapital + currentProfit;
        return Math.max(1, Math.floor(totalCapital * (od45Percentage / 100)));
    }

    // od34 - حالت محافظه‌کار
    if (conservativeEnabled && lossCounter >= 3) {
        return Math.max(1, Math.floor(baseAmount * 0.5));
    }

    // od35 - سپر نقدینگی
    if (liquidityEnabled && (initialCapital + currentProfit) < (initialCapital * 0.5)) {
        return 0.5;
    }

    // od32 - بازگشت به پایه
    if (resetModeTriggered) {
        return 2;
    }

    // بازگشت به مارتینگل پایه
    return baseAmount;
}

// ============================================================
//  تابع getCondition (نسخه نهایی با اولویت‌بندی دقیق و return)
// ============================================================
function getCondition() {
    if (bustHistory.length < 50) {
        if (t_cashoutProduct) {
            t_cashoutProduct.value = "0.00";
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        intendedCashoutTarget = 0;
        if (t_priceAmount) t_priceAmount.value = 0;
        isBetActive = false;
        console.log("در انتظار تکمیل ۵۰ ضریب... (" + bustHistory.length + "/50)");
        return;
    }

    if (isHitAndRunStopped || isPeakStopped || manualPause || isTemporarilyPaused || !allowBetting) {
        if (t_priceAmount) t_priceAmount.value = 0;
        isBetActive = false;
        return;
    }

    // ============================================
    //  اولویت 1: od46 - جبران اجباری
    // ============================================
    if (od46Enabled && od46RecoveryActive && !od46Pause) {
        var totalLossForCalc = currentLossTotal > 0 ? currentLossTotal : od46LossAtStart;
        var calculatedBet = (totalLossForCalc + 1) / (od46Multiplier - 1);
        lastBetAmount = Math.max(1, Math.ceil(calculatedBet));
        intendedCashoutTarget = od46Multiplier;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }

        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // ============================================
    //  اولویت 2: الگوهای واکنش‌گرا (od10-14) - ضریب متغیر
    // ============================================
    if (od14_active) {
        intendedCashoutTarget = 1.10;
    } else if (redRepeatActive && redRepeatAction !== "2.00") {
        intendedCashoutTarget = parseFloat(redRepeatAction);
    } else if (patternActive) {
        intendedCashoutTarget = patternTargetMultiplier;
    } else if (od15Enabled && bustHistory.length >= 50) {
        // استراتژی نوسان‌یاب تطبیقی
        var last10 = bustHistory.slice(0, 10);
        var last50 = bustHistory.slice(0, 50);
        var sum10 = 0, sum50 = 0;
        for (var i = 0; i < 10; i++) sum10 += last10[i];
        for (var i = 0; i < 50; i++) sum50 += last50[i];
        var mean10 = sum10 / 10;
        var mean50 = sum50 / 50;

        var variance10 = 0, variance50 = 0;
        for (var i = 0; i < 10; i++) variance10 += Math.pow(last10[i] - mean10, 2);
        for (var i = 0; i < 50; i++) variance50 += Math.pow(last50[i] - mean50, 2);
        variance10 /= 10;
        variance50 /= 50;
        var std10 = Math.sqrt(variance10);
        var std50 = Math.sqrt(variance50);

        var cv = std50 / mean50;
        var k = Math.max(0.5, Math.min(1.5, cv + 0.1));
        var exitRaw = Math.max(1.01, mean10 - k * std10);

        var multipliers = [1.10, 1.20, 1.30, 1.50, 1.80, 2.00];
        var selectedMultiplier = multipliers.reduce(function(prev, curr) {
            return (Math.abs(curr - exitRaw) < Math.abs(prev - exitRaw) ? curr : prev);
        });
        intendedCashoutTarget = selectedMultiplier;
        od15Multiplier = selectedMultiplier;
    } else if (od44Enabled) {
        if (currentProfit >= od44Threshold) {
            intendedCashoutTarget = od44Layer2Target;
        } else {
            intendedCashoutTarget = od44Layer1Target;
        }
    } else if (od19Enabled && bustHistory.length >= 50) {
        // جدول آماری - منطق کامل
        var targetRow = null;
        var targetValue = (od19Mode === 'lowest') ? Infinity : -Infinity;
        var isLowest = (od19Mode === 'lowest');

        for (var i = 0; i < STATS_DATA.length; i++) {
            var row = STATS_DATA[i];
            var coeff = row.coeff;
            var fair = row.fair;

            var count50 = 0;
            for (var j = 0; j < 50; j++) {
                if (bustHistory[j] >= coeff) count50++;
            }
            var cVal = (count50 / 50) * 100;
            var dVal = 100 - cVal;

            var countAll = 0;
            for (var k = 0; k < fullHistory.length; k++) {
                if (fullHistory[k] >= coeff) countAll++;
            }
            var eVal = fullHistory.length > 0 ? (countAll / fullHistory.length) * 100 : 0;

            var colValue = 0;
            if (od19Column === 3) colValue = fair;
            else if (od19Column === 4) colValue = cVal;
            else if (od19Column === 5) colValue = dVal;
            else if (od19Column === 6) colValue = eVal;

            if (isLowest) {
                if (colValue < targetValue) {
                    targetValue = colValue;
                    targetRow = row;
                }
            } else {
                if (colValue > targetValue) {
                    targetValue = colValue;
                    targetRow = row;
                }
            }
        }

        if (targetRow) {
            intendedCashoutTarget = targetRow.coeff;
            if (intendedCashoutTarget > 4.00) intendedCashoutTarget = 4.00;
            if (intendedCashoutTarget < 1.10) intendedCashoutTarget = 1.10;
        }
    } else if (od9Enabled && bustHistory.length >= od9AvgPeriod) {
        var sum = 0;
        for (var i = 0; i < od9AvgPeriod; i++) {
            sum += bustHistory[i];
        }
        var avgMultiplier = sum / od9AvgPeriod;
        if (avgMultiplier < 1.10) avgMultiplier = 1.10;
        if (avgMultiplier > 4.00) avgMultiplier = 4.00;
        intendedCashoutTarget = parseFloat(avgMultiplier.toFixed(2));
    }

    // ============================================
    //  اولویت 3: استراتژی‌های با ضریب ۲.۰۰ (با return اجباری)
    // ============================================

    // 1. od38 - لابوشر
    if (od38Enabled && od38Sequence.length > 0) {
        var first = od38Sequence[0];
        var last = od38Sequence[od38Sequence.length - 1];
        lastBetAmount = first + last;
        intendedCashoutTarget = 2.00;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 2. od39 - آسیاب اسکار
    if (od39Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od39CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 3. od40 - آنتی-مارتینگل
    if (od40Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od40CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 4. od41 - پاراچوت
    if (od41Enabled && !od41Pause) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od41CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 5. od42 - پوشش ضرر
    if (od42Enabled) {
        if (od42TotalLoss > 0) {
            var calculatedBet = (od42TotalLoss + od42Unit) / (od42Target - 1);
            lastBetAmount = Math.max(1, Math.ceil(calculatedBet));
        } else {
            lastBetAmount = Math.max(od42Unit, 1);
        }
        intendedCashoutTarget = od42Target;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 6. od45 - درصد ثابت
    if (od45Enabled) {
        var totalCapital = initialCapital + currentProfit;
        lastBetAmount = Math.max(1, Math.floor(totalCapital * (od45Percentage / 100)));
        intendedCashoutTarget = 2.00;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 7. od24 - دالامبر
    if (od24Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od24CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // 8. od36 - شرط ثابت
    if (fixedBetEnabled) {
        if (fixedBetAmount <= 0 || fixedBetMultiplier <= 0) return;
        lastBetAmount = fixedBetAmount;
        intendedCashoutTarget = fixedBetMultiplier;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        if (t_cashoutProduct) {
            t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
            t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        if (t_priceAmount) {
            t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
            t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
        }
        setTimeout(function() {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);
        return;
    }

    // ============================================
    //  اولویت 4: od37 - شروع بعد از باخت (با مارتینگل عادی)
    // ============================================
    if (betAfterStreakEnabled) {
        if (currentStreakSinceLastBet < betAfterStreakThreshold) {
            if (t_priceAmount) t_priceAmount.value = 0;
            isBetActive = false;
            return;
        }
        // اگر به آستانه رسیده، به خط بعدی برود (از مارتینگل پایه استفاده کند)
    }

    // ============================================
    //  اولویت 5: مارتینگل عادی (پایه یا سفارشی)
    // ============================================
    lastBetAmount = getPrice();

    if (emergencyModeActive) {
        intendedCashoutTarget = emergencyTargetMultiplier;
        t_cashoutProduct.value = emergencyTargetMultiplier.toFixed(2);
        emergencyStep++;
    } else {
        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
    }

    t_priceAmount.value = lastBetAmount;

    if (t_cashoutProduct) {
        t_cashoutProduct.dispatchEvent(new Event('input', { bubbles: true }));
        t_cashoutProduct.dispatchEvent(new Event('change', { bubbles: true }));
        t_cashoutProduct.dispatchEvent(new Event('blur', { bubbles: true }));
    }
    if (t_priceAmount) {
        t_priceAmount.dispatchEvent(new Event('input', { bubbles: true }));
        t_priceAmount.dispatchEvent(new Event('change', { bubbles: true }));
        t_priceAmount.dispatchEvent(new Event('blur', { bubbles: true }));
    }

    setTimeout(function() {
        t_setCashBtn.click();
        isBetActive = true;
        console.log("شرط بسته شد: مبلغ " + lastBetAmount + " و ضریب " + intendedCashoutTarget.toFixed(2) + "x");
    }, 400);
}

// ============================================================
//  تابع game_busted (نسخه اصلاح‌شده برای پشتیبانی از استراتژی‌های ویژه)
// ============================================================
game_busted = (function () {
    return function (str) {
        var currentValue = 0;
        if (str && str.amount) currentValue = str.amount / 100;

        if (currentValue > 0) {
            bustHistory.unshift(currentValue);
            if (bustHistory.length > 50) bustHistory.pop();
            fullHistory.push(currentValue);

            if (lastBetAmount > 0) {
                var isWin = (justCashedOut || currentValue >= intendedCashoutTarget);

                if (isWin) {
                    var profitGain = lastBetAmount * (currentValue - 1);
                    currentProfit += profitGain;
                    stopLossAccum = 0;
                    virtualProfit += getBaseBet();

                    // به‌روزرسانی استراتژی‌های ویژه در حالت برد

                    // od37 - شروع بعد از باخت
                    if (betAfterStreakEnabled) currentStreakSinceLastBet = 0;

                    // od24 - دالامبر
                    if (od24Enabled) {
                        od24CurrentBet = Math.max(od24BaseBet, od24CurrentBet - od24BaseBet);
                    }

                    // od38 - لابوشر
                    if (od38Enabled && od38Sequence.length > 0) {
                        od38Sequence.shift();
                        if (od38Sequence.length > 0) od38Sequence.pop();
                    }

                    // od39 - آسیاب اسکار
                    if (od39Enabled) {
                        od39SessionProfit += profitGain;
                        if (od39SessionProfit >= od39BaseUnit) {
                            od39SessionProfit = 0;
                            od39CurrentBet = Math.max(od39BaseUnit, 1);
                        } else {
                            od39CurrentBet = od39CurrentBet + od39BaseUnit;
                        }
                    }

                    // od40 - آنتی-مارتینگل
                    if (od40Enabled) {
                        od40CurrentBet = od40CurrentBet * 2;
                        od40WinStreak++;
                        if (od40WinStreak >= od40MaxStreak) {
                            od40CurrentBet = Math.max(od40BaseBet, 1);
                            od40WinStreak = 0;
                        }
                    }

                    // od41 - پاراچوت
                    if (od41Enabled) {
                        od41SessionProfit += profitGain;
                        if (od41SessionProfit >= 0) {
                            od41CurrentBet = Math.max(od41BaseBet, 1);
                            od41SessionProfit = 0;
                        }
                    }

                    // od42 - پوشش ضرر
                    if (od42Enabled) {
                        od42TotalLoss = 0;
                    }

                    // od46 - جبران اجباری
                    if (od46Enabled && od46RecoveryActive) {
                        od46CurrentRound++;
                        if (currentLossTotal <= 0) {
                            od46RecoveryActive = false;
                            od46Pause = false;
                            od46CurrentRound = 0;
                        } else if (od46CurrentRound >= od46MaxRounds) {
                            od46RecoveryActive = false;
                            od46Pause = true;
                            od46CurrentRound = 0;
                        }
                    }

                } else {
                    // حالت باخت
                    currentProfit -= lastBetAmount;
                    stopLossAccum += lastBetAmount;

                    // od37
                    if (betAfterStreakEnabled) currentStreakSinceLastBet++;

                    // od24 - دالامبر
                    if (od24Enabled) od24CurrentBet += od24BaseBet;

                    // od38 - لابوشر
                    if (od38Enabled) od38Sequence.push(lastBetAmount);

                    // od40 - آنتی-مارتینگل (ریست به پایه در باخت)
                    if (od40Enabled) {
                        od40CurrentBet = Math.max(od40BaseBet, 1);
                        od40WinStreak = 0;
                    }

                    // od41 - پاراچوت
                    if (od41Enabled) {
                        od41SessionProfit -= lastBetAmount;
                        if (od41SessionProfit <= -od41ParachuteLimit) {
                            od41Pause = true;
                            od41CurrentBet = Math.max(od41BaseBet, 1);
                            od41SessionProfit = 0;
                        } else {
                            od41CurrentBet += od41BaseBet;
                        }
                    }

                    // od42 - پوشش ضرر
                    if (od42Enabled) od42TotalLoss += lastBetAmount;

                    // od46 - جبران اجباری
                    if (od46Enabled && od46RecoveryActive) {
                        od46CurrentRound++;
                        if (od46CurrentRound >= od46MaxRounds) {
                            od46RecoveryActive = false;
                            od46Pause = true;
                            od46CurrentRound = 0;
                        }
                    }
                }

                // شروع حالت جبران اجباری (اگر هنوز فعال نشده و ضرر به هدف رسید)
                if (od46Enabled && !od46RecoveryActive && currentLossTotal >= od46Target) {
                    od46RecoveryActive = true;
                    od46CurrentRound = 0;
                    od46LossAtStart = currentLossTotal;
                    od46Pause = false;
                }

                // غیرفعال کردن مارتینگل معمولی وقتی استراتژی‌های ویژه فعال هستند
                if (!fixedBetEnabled && !od24Enabled && !od33Enabled && !od38Enabled && !od39Enabled && !od40Enabled && !od41Enabled && !od42Enabled && !od45Enabled && !od46Enabled) {
                    if (isWin) {
                        resetBetAfterWin();
                    } else {
                        if (emergencyModeActive) emergencyHistory.push(lastBetAmount);
                        increaseBetAfterLoss();
                        damage++;
                        currentLossTotal += lastBetAmount;
                        if (currentValue < intendedCashoutTarget) numberOneCount++;
                    }
                }

            } else {
                // اگر شرطی بسته نشده است
                if (betAfterStreakEnabled && currentValue > 0) {
                    currentStreakSinceLastBet++;
                }
            }
        }

        // استخراج MD5 و HASH از DOM (اگر نیاز باشد)
        if (initialLoadDone) {
            var rows = document.querySelectorAll('div.crash-row');
            if (rows.length > 0) {
                var lastRow = rows[0];
                var md5Elem = lastRow.querySelector(md5Selector);
                if (md5Elem) {
                    var md5Text = md5Elem.innerText.trim();
                    if (md5Text.length === 32 && /^[0-9a-fA-F]{32}$/.test(md5Text)) {
                        md5History.unshift(md5Text);
                        if (md5History.length > 50) md5History.pop();
                    }
                }
                var hashElem = lastRow.querySelector(hashSelector);
                if (hashElem) {
                    var hashText = hashElem.innerText.trim();
                    if (hashText.length === 64 && /^[0-9a-fA-F]{64}$/.test(hashText)) {
                        hashHistory.unshift(hashText);
                        if (hashHistory.length > 50) hashHistory.pop();
                    }
                }
                // اینجا updateMD5List و updateHashList حذف شده‌اند
            }
        }

        if (currentValue > 0 && currentValue < 1.80) { consecutiveLow179++; } else if (currentValue >= 1.80) { consecutiveLow179 = 0; }
        checkBettingCondition(bustHistory);
        getInformation();
        updateStatsTable();

        if (adaptiveLearningEnabled) {
            var isWin = (justCashedOut || currentValue >= intendedCashoutTarget);
            updateHourlyStats(isWin, currentValue);
            updateAdaptiveDisplay();
        }

        sessionHistory.push({ time: Date.now(), value: currentValue });
        if (sessionHistory.length > 200) sessionHistory.shift();
        updateFormulaAnalysis();

        if (isBetActive) {
            var isEmergencyTargetHit = emergencyModeActive && currentValue >= emergencyTargetMultiplier;
            var isNormalWin = justCashedOut || (currentValue >= intendedCashoutTarget);
            if (isNormalWin || isEmergencyTargetHit) {
                t_times--; counter++;
                resetBetAfterWin();
                justCashedOut = false;
                numberOneCount = 0;
                damage = 0;
                currentLossTotal = 0;
            } else {
                if (emergencyModeActive) emergencyHistory.push(lastBetAmount);
                increaseBetAfterLoss();
                damage++;
                currentLossTotal += lastBetAmount;
                if (currentValue < intendedCashoutTarget) numberOneCount++;
            }
        }

        isBetActive = false;
        f_game_busted.apply(this, arguments);
    };
}());

// ============================================================
//  توابع باقی‌مانده (game_waiting, game_update, game_cash_out, getInformation, clickGameHistory)
// ============================================================

var justCashedOut = false;

game_waiting = (function () {
    return function (str) {
        if (od41Pause) {
            od41Pause = false;
            allowBetting = true;
            isTemporarilyPaused = false;
        }
        if (od43Enabled) {
            od43StartTime = Date.now();
        }
        justCashedOut = false;
        isBetActive = false;
        getInformation();
        getCondition();
        f_game_waiting.apply(this, arguments);
    };
}());

game_update = (function () {
    return function (str) {
        try {
            // od43 - نقد کردن در زمان‌های خاص
            if (od43Enabled && isBetActive && !justCashedOut && od43StartTime > 0) {
                var elapsed = (Date.now() - od43StartTime) / 1000;
                if (elapsed >= od43Time) {
                    var cashoutBtn = document.getElementsByClassName("place-bet-cashout")[0];
                    if (cashoutBtn) {
                        cashoutBtn.click();
                        justCashedOut = true;
                    }
                }
            }
        } catch (e) {}
        f_game_update.apply(this, arguments);
    };
}());

game_cash_out = (function () {
    return function (str) {
        f_game_cash_out.apply(this, arguments);
    };
}());

function getInformation() {
    var lines = [];
    var securityHeader = ""; var securityColor = "";
    if (manualPause) { securityHeader = "خطر لایه های امنیتی غیرفعال هستند J1"; securityColor = "red"; }
    else { securityHeader = "ربات بدون تنظیم مدیریت ریسک فعال شد J2"; securityColor = "green"; }
    lines.push("<b style='color:" + securityColor + "; font-size:14px;'>" + securityHeader + "</b>");
    if (isHitAndRunStopped) {
        if (stopReason === "profit") lines.push("<b style='color:purple'>حد سود J3</b>");
        else if (stopReason === "loss") lines.push("<b style='color:red'>حد ضرر (باخت‌های متوالی: " + stopLossAccum + ") J4</b>");
    }
    if (isPeakStopped) lines.push("<b style='color:darkred'>سقوط از قله J5</b>");
    if (trailingStopEnabled) {
        var currentBal = initialCapital + currentProfit;
        var threshold = Math.floor(peakCapital * (1 - trailingStopPercent / 100));
        lines.push("<b style='color:blue'>قله: " + peakCapital + " | آستانه: " + threshold + " | موجودی: " + currentBal + " J6</b>");
    }
    if (bustHistory.length < 50) {
        lines.push("<b style='color:orange'>ربات منتظر ضرایب تاریخچه بازی است J7</b>");
    } else {
        var paused = false;
        var isAnySecurityLayerEnabled = longTermDetectionEnabled || streakDetectionEnabled || low180DetectionEnabled || below2DetectionEnabled;
        if (longTermDetectionEnabled && fullHistory.length >= 50) {
            var cntLT = 0; for (var i = 0; i < fullHistory.length; i++) { if (fullHistory[i] < 2.00) cntLT++; }
            var percLT = (cntLT / fullHistory.length) * 100;
            if (percLT > longTermThreshold) { lines.push("<b style='color:purple'>ضریب 2 کمتر از " + longTermThreshold + " درصد است در کل تاریخچه تا این دور J8</b>"); paused = true; }
        }
        if (!paused && streakDetectionEnabled && consecutiveLow179 >= streakThreshold) { lines.push("<b style='color:red'>توقف به دلیل باخت مداوم J9</b>"); paused = true; }
        if (!paused && low180DetectionEnabled) {
            var cnt180 = 0; for (var j = 0; j < bustHistory.length; j++) { if (bustHistory[j] < 1.80) cnt180++; }
            var perc180 = (cnt180 / bustHistory.length) * 100;
            if (perc180 > low180Threshold) { lines.push("<b style='color:red'>ضریب 1.80 کمتر از " + low180Threshold + " درصد در 50 دور اخیر J10</b>"); paused = true; }
        }
        if (!paused && below2DetectionEnabled) {
            var cntB2 = 0; for (var k = 0; k < bustHistory.length; k++) { if (bustHistory[k] < 2.00) cntB2++; }
            var percB2 = (cntB2 / bustHistory.length) * 100;
            if (percB2 > maxAllowedBelow2) { lines.push("<b style='color:blue'>ضریب 2 کمتر از " + maxAllowedBelow2 + " درصد در 50 دور اخیر J11</b>"); paused = true; }
        }
        if (isAnySecurityLayerEnabled && !paused && !isHitAndRunStopped && !isPeakStopped) {
            lines.push("<b style='color:green'>امنیت شرطبندی برقرار است J12</b>");
        }
    }
    if (manualPause) lines.push("<b style='color:orange'>درانتظار تنظیم و فعال کردن ربات J13</b>");
    if (emergencyModeActive) lines.push("<b style='color:#d63384'>ضریب 3 اورژانسی فعال شد J14</b>");
    var normalText = intendedCashoutTarget.toFixed(2) + 'x';
    lines.push("<b style='color:red'>ضریب برداشت: " + normalText + " J15</b>");

    // اطلاعات استراتژی‌های ویژه (اختیاری)
    if (od36Enabled) lines.push("<b style='color:#00ffaa'>od36 شرط ثابت: مبلغ " + fixedBetAmount + " ضریب " + fixedBetMultiplier.toFixed(2) + " J36</b>");
    if (od38Enabled) lines.push("<b style='color:#ffaa00'>od38 لابوشر: رشته [" + od38Sequence.join(', ') + "] J38</b>");
    if (od39Enabled) lines.push("<b style='color:#00ffaa'>od39 آسیاب اسکار: مبلغ " + od39CurrentBet + " J39</b>");
    if (od40Enabled) lines.push("<b style='color:#ffaa00'>od40 آنتی-مارتینگل: مبلغ " + od40CurrentBet + " J40</b>");
    if (od41Enabled) lines.push("<b style='color:#00ffaa'>od41 پاراچوت: مبلغ " + od41CurrentBet + (od41Pause ? " (استراحت)" : "") + " J41</b>");
    if (od42Enabled) lines.push("<b style='color:#00ffaa'>od42 پوشش ضرر: ضریب " + od42Target.toFixed(2) + " J42</b>");
    if (od43Enabled) {
        var currentTime = (od43StartTime > 0) ? ((Date.now() - od43StartTime) / 1000).toFixed(1) : "0.0";
        lines.push("<b style='color:#ffaa00'>od43 زمان‌بندی: زمان " + currentTime + " ثانیه J43</b>");
    }
    if (od44Enabled) {
        var currentLayer = (currentProfit >= od44Threshold) ? "پیشرفته" : "پایه";
        lines.push("<b style='color:#00ccff'>od44 لایه‌بندی: لایه " + currentLayer + " J44</b>");
    }
    if (od45Enabled) {
        var totalCapital = initialCapital + currentProfit;
        var currentBet = Math.max(1, Math.floor(totalCapital * (od45Percentage / 100)));
        lines.push("<b style='color:#00ffaa'>od45 درصد ثابت: مبلغ " + currentBet + " J45</b>");
    }
    if (od46Enabled) {
        if (od46Pause) lines.push("<b style='color:red'>od46 جبران اجباری: استراحت اجباری! J46</b>");
        else if (od46RecoveryActive) lines.push("<b style='color:#ffaa00'>od46 جبران اجباری: دور " + od46CurrentRound + "/" + od46MaxRounds + " J46</b>");
        else lines.push("<b style='color:#00ffaa'>od46 جبران اجباری: فعال (منتظر ضرر " + od46Target + ") J46</b>");
    }

    var str = lines.join("<br>");
    $("h4#hadi-box").html(str);
}

var historyClickedOnce = false;
function clickGameHistory() {
    if (historyClickedOnce) return;
    var element = document.evaluate("//*[contains(text(), 'تاریخچه بازی')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
        element.click(); historyClickedOnce = true;
        console.log("روی تاریخچه بازی کلیک شد!");
        createManualInputBox();
        console.log("در حال انتظار برای بارگذاری جدول تاریخچه (2.5 ثانیه)...");
        setTimeout(autoFetchHistoryFromDOM, 2500);
    } else {
        setTimeout(clickGameHistory, 1000);
    }
}

setTimeout(clickGameHistory, 500);
