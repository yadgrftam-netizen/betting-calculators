var robotRunning = false;

// متغیرهای اصلی
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

// ---------- متغیرهای od1 تا od4 ----------
var od1Enabled = false;
var od1Threshold = 7;
var od1Multiplier = 2.00;
var od1ConsecutiveLosses = 0;

var od2Enabled = false;
var od2Threshold = 60;
var od2Multiplier = 2.00;

var od4Enabled = false;
var od4Threshold = 55;
var od4Multiplier = 2.00;

// ---------- متغیرهای od5 تا od9 ----------
var customMartingaleSequence = [];
var trendFilterEnabled = false;          // od6
var od7Enabled = false;                 // od7
var od7Threshold = 1000000;             // od7
var od8Enabled = false;                 // od8
var od8ConsecutiveLosses = 0;           // od8
var od9Enabled = false;                 // od9
var od9AvgPeriod = 2;                   // od9

// ---------- متغیرهای od10 تا od14 ----------
var patternDetectionEnabled = false;
var patternRedStreakThreshold = 4;
var patternActive = false;
var patternTargetMultiplier = 1.20;

var patternAllDetectionEnabled = false;
var specificPatternActive = false;
var specificTargetMultiplier = 1.50;
var od11_active = false;

var redRepeatDetectionEnabled = false;
var redRepeatThreshold = 4;
var redRepeatActive = false;
var redRepeatAction = "3.00";

var percentPattern50Enabled = false;
var percentPatternAction = "2.00";
var percentPatternActive = false;
var od13_active = false;

var percentPatternAllEnabled = false;
var od14_active = false;

// ---------- متغیرهای od15 ----------
var od15Enabled = false;
var od15Multiplier = 2.00;

// ---------- متغیرهای od16 تا od18 ----------
var takeProfitEnabled = false;
var takeProfitPercent = 10;
var stopLossEnabled = false;
var stopLossPercent = 20;
var trailingStopEnabled = false;
var trailingStopPercent = 10;
var peakCapital = 0;
var isPeakStopped = false;

// ---------- متغیرهای od19 ----------
var od19Enabled = false;
var od19Mode = 'highest';
var od19Column = 3;

// ---------- متغیرهای od20 تا od24 ----------
var positionSizingEnabled = false;
var riskPercent = 1;
var scalingEnabled = false;
var scalingLevel1 = 1.5;
var scalingPercent1 = 50;
var scalingPartialDone = false;
var breakevenEnabled = false;
var breakevenThreshold = 1.3;
var trailingTPEnabled = false;
var trailingTPTarget = 2.0;
var trailingTPPeak = 0;
var trailingTPPeakSet = false;
var od24Enabled = false;
var od24BaseBet = 1;
var od24CurrentBet = 1;

// ---------- متغیرهای od25 تا od31 ----------
var comboModeEnabled = false;
var comboTrailingActivated = false;
var comboTrailingTargetProfit = 0;
var comboMartingaleEnabled = false;
var comboVolatilityEnabled = false;
var comboShieldEnabled = false;
var comboFastEnabled = false;
var comboSqueezeEnabled = false;
var comboDiversifyEnabled = false;

// ---------- متغیرهای od32 تا od35 ----------
var resetModeEnabled = false;
var resetDropThreshold = 15;
var resetModeTriggered = false;
var od33Enabled = false;
var conservativeEnabled = false;
var liquidityEnabled = false;

// ---------- متغیرهای od36 تا od46 ----------
var fixedBetEnabled = false;
var fixedBetAmount = 2;
var fixedBetMultiplier = 2.00;

var betAfterStreakEnabled = false;
var betAfterStreakThreshold = 3;
var currentStreakSinceLastBet = 0;

var od38Enabled = false;
var od38Sequence = [1, 2, 3];
var od38CurrentBet = 0;

var od39Enabled = false;
var od39BaseUnit = 1;
var od39CurrentBet = 1;
var od39SessionProfit = 0;

var od40Enabled = false;
var od40BaseBet = 1;
var od40MaxStreak = 3;
var od40CurrentBet = 1;
var od40WinStreak = 0;
var od40Multiplier = 2.00;

var od41Enabled = false;
var od41BaseBet = 1;
var od41ParachuteLimit = 10;
var od41CurrentBet = 1;
var od41SessionProfit = 0;
var od41Pause = false;

var od42Enabled = false;
var od42Target = 2.00;
var od42Unit = 1;
var od42TotalLoss = 0;

var od43Enabled = false;
var od43Time = 5;
var od43StartTime = 0;

var od44Enabled = false;
var od44Layer1Target = 1.50;
var od44Layer2Target = 3.00;
var od44Threshold = 10;

var od45Enabled = false;
var od45Percentage = 2;

var od46Enabled = false;
var od46Target = 10;
var od46MaxRounds = 3;
var od46Multiplier = 2.00;
var od46RecoveryActive = false;
var od46CurrentRound = 0;
var od46LossAtStart = 0;
var od46Pause = false;

// ---------- متغیرهای دیگر ----------
var currentProfit = 0;
var isHitAndRunStopped = false;
var stopReason = "";
var virtualProfit = 0;
var stopLossAccum = 0;
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
var statsTableCreated = false;
// ============================================================
//  ثابت‌ها (ضرایب و دنباله‌ها)
// ============================================================
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

// ============================================================
//  ارجاع به المان‌های DOM (با idهای استاندارد حالت A)
// ============================================================

var f_game_waiting = game_waiting;
var f_game_busted = game_busted;
var f_game_update = game_update;
var f_game_cash_out = game_cash_out;

var box = document.getElementsByClassName('game-controls')[0];
var t_cashoutProduct = document.getElementsByClassName('cashout-amount')[0];
var t_priceAmount = document.getElementsByClassName('game-amount')[0];
var t_setCashBtn = document.getElementsByClassName("place-bet")[0];
var t_setCashCancelBtn = document.getElementsByClassName("place-bet-cancel")[0];

var h_information = document.getElementById('robotInfoBox');   // اصلاح‌شده

// ============================================================
//  توابع اصلی
// ============================================================

function createStatsTable() {
    if (statsTableCreated) return "";
    statsTableCreated = true;

    var tableHTML = `
    <div id="statsTableBox" style="border:1px solid #555; padding:10px; margin:10px 0; border-radius:5px; background:black; color:white; direction:rtl; text-align:right;">
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

        var fVal = fair > 0 ? ((fair - cVal) / fair) * 100 : 0;

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
function createManualInputBox() {

    var HR = '<div style="border-bottom: 1px solid #888; margin: 8px 0;"></div>';

    var robotSettingsHTML = `
    <details id="robotSettingsMenu"
             style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:10px 0; border-radius:5px; direction:rtl; text-align:right;">
        
        <summary style="font-weight:bold; font-size:16px; cursor:pointer; color:black;">
            تنظیمات جامع ربات C
        </summary>

        <div style="padding:10px; margin-top:10px; border-top:1px solid #ccc;">

            <!-- ========================= -->
            <!-- بخش دکمه‌های اصلی ربات   -->
            <!-- ========================= -->
            <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin-bottom:15px; border-radius:5px; direction:rtl; text-align:right;">

                <!-- دکمه کپی تاریخچه کامل -->
                <button id="copyFullHistoryBtn"
                        style="margin-left:10px; background:#6f42c1; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer;">
                    [od59] کپی کل ضرایب تاریخچه B1
                </button>

                <!-- دکمه کپی ۵۰ ضریب آخر -->
                <button id="copyLast50Btn"
                        style="background:#007bff; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer;">
                    [od60] کپی ۵۰ ضریب آخر B2
                </button>

                <!-- دکمه اصلی ربات -->
                <button id="robotStartBtn"
                        style="background:#28a745; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer; margin-right:10px;">
                    فعال کردن ربات
                </button>

            </div>
            <!-- ========================================= -->
<!-- بخش 2 فایل 2 — od1 تا od4 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="font-weight:bold; cursor:pointer;">A. مدیریت ریسک</summary>

    <div style="padding:10px; direction:rtl; text-align:right;">

        <!-- ======================= -->
        <!-- od1 — توقف باخت پیاپی -->
        <!-- ======================= -->
        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                    <input type="checkbox" id="od1_toggle">
                    <b>[od1]</b> توقف پس از باخت پیاپی زیر ضریب انتخابی
                    <input type="number" id="od1_threshold" value="7" style="width:50px;">
                </label>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:5px; padding-left:20px; margin-bottom:10px;">
                <label>ضریب انتخابی od1:</label>

                <button class="od1-preset" data-mult="1.10">1.10</button>
                <button class="od1-preset" data-mult="1.20">1.20</button>
                <button class="od1-preset" data-mult="1.30">1.30</button>
                <button class="od1-preset" data-mult="1.50">1.50</button>
                <button class="od1-preset" data-mult="1.80">1.80</button>
                <button class="od1-preset" data-mult="2.00">2.00</button>
                <button class="od1-preset" data-mult="3.00">3.00</button>
                <button class="od1-preset" data-mult="4.00">4.00</button>

                <span style="color:white; font-weight:bold; margin-left:10px;">
                    ضریب فعلی: <span id="od1_multiplier">2.00</span>
                </span>
            </div>

            ${HR}

            <!-- ======================= -->
            <!-- od2 — توقف درصدی ۵۰ دور -->
            <!-- ======================= -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                    <input type="checkbox" id="od2_toggle">
                    <b>[od2]</b> توقف درصدی ضریب انتخابی ۵۰ دور اخیر
                    <input type="number" id="od2_threshold" value="60" style="width:50px;">%
                </label>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:5px; padding-left:20px; margin-bottom:10px;">
                <label>ضریب انتخابی od2:</label>

                <button class="od2-preset" data-mult="1.10">1.10</button>
                <button class="od2-preset" data-mult="1.20">1.20</button>
                <button class="od2-preset" data-mult="1.30">1.30</button>
                <button class="od2-preset" data-mult="1.50">1.50</button>
                <button class="od2-preset" data-mult="1.80">1.80</button>
                <button class="od2-preset" data-mult="2.00">2.00</button>
                <button class="od2-preset" data-mult="3.00">3.00</button>
                <button class="od2-preset" data-mult="4.00">4.00</button>

                <span style="color:white; font-weight:bold; margin-left:10px;">
                    ضریب فعلی: <span id="od2_multiplier">2.00</span>
                </span>
            </div>

            ${HR}

            <!-- ======================= -->
            <!-- od4 — توقف درصدی بلندمدت -->
            <!-- ======================= -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                    <input type="checkbox" id="od4_toggle">
                    <b>[od4]</b> توقف درصدی بلندمدت ضریب انتخابی
                    <input type="number" id="od4_threshold" value="55" style="width:50px;">%
                </label>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:5px; padding-left:20px; margin-bottom:10px;">
                <label>ضریب انتخابی od4:</label>

                <button class="od4-preset" data-mult="1.10">1.10</button>
                <button class="od4-preset" data-mult="1.20">1.20</button>
                <button class="od4-preset" data-mult="1.30">1.30</button>
                <button class="od4-preset" data-mult="1.50">1.50</button>
                <button class="od4-preset" data-mult="1.80">1.80</button>
                <button class="od4-preset" data-mult="2.00">2.00</button>
                <button class="od4-preset" data-mult="3.00">3.00</button>
                <button class="od4-preset" data-mult="4.00">4.00</button>

                <span style="color:white; font-weight:bold; margin-left:10px;">
                    ضریب فعلی: <span id="od4_multiplier">2.00</span>
                </span>
            </div>

            ${HR}

            <!-- ======================= -->
            <!-- od5 — مارتینگل سفارشی -->
            <!-- ======================= -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:5px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; flex-wrap:wrap; gap:5px;">
                    <b>[od5]</b> مارتینگل سفارشی
                    <input type="text" id="od5_sequence" placeholder="مثلاً: 5,10,20" style="width:120px;">
                </label>
            </div>

        </div>
    </div>
</details>
<!-- ========================================= -->
<!-- بخش 3 فایل 2 — od6 تا od9 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od6-9. لایه‌های پیشرفته</summary>

    <div style="padding:10px;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od6 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od6_toggle">
                    <b>[od6]</b> فیلتر روند نزولی
                </label>
            </div>

            ${HR}

            <!-- od7 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od7_toggle">
                    <b>[od7]</b> شرط‌بندی بعد از بازیکنان
                    <input type="number" id="od7_threshold" placeholder="مثلاً 1000000" style="width:100px;">
                </label>
            </div>

            ${HR}

            <!-- od8 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od8_toggle">
                    <b>[od8]</b> تشخیص باخت‌های پیاپی
                </label>
            </div>

            ${HR}

            <!-- od9 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od9_toggle">
                    <b>[od9]</b> تنظیم خودکار ضریب با میانگین
                    <input type="number" id="od9_avg" placeholder="پیش‌فرض 2" style="width:60px;">
                </label>
            </div>

        </div>
    </div>
</details>
<!-- ========================================= -->
<!-- بخش 4 فایل 2 — od10 تا od14 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od10-14. الگوهای واکنش‌گرا</summary>

    <div style="padding:10px;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od10 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od10_toggle">
                    <b>[od10]</b> سیگنال فرار زودهنگام
                    <input type="number" id="od10_threshold" value="4" style="width:50px;">
                </label>
            </div>

            ${HR}

            <!-- od11 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od11_toggle">
                    <b>[od11]</b> سیگنال افزایش ریسک
                </label>
            </div>

            ${HR}

            <!-- od12 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od12_toggle">
                    <b>[od12]</b> سیگنال روند صعودی
                    <input type="number" id="od12_threshold" value="4" style="width:50px;">
                </label>
            </div>

            ${HR}

            <!-- od13 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od13_toggle">
                    <b>[od13]</b> سیگنال فشرده‌سازی سرمایه
                </label>
            </div>

            ${HR}

            <!-- od14 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od14_toggle">
                    <b>[od14]</b> سیگنال پناهگاه ایمن
                </label>
            </div>

        </div>
    </div>
</details>
<!-- ========================================= -->
<!-- بخش 5 فایل 2 — od15 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od15. نوسان‌یاب تطبیقی</summary>

    <div style="padding:10px;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od15 -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od15_toggle">
                    <b>[od15]</b> نوسان‌یاب تطبیقی
                </label>
            </div>

            <div style="font-size:13px; background:#222; color:#e0e0e0; border:1px solid #555; border-radius:4px; padding:8px; margin-top:5px;">
                این استراتژی میانگین ۱۰ ضریب اخیر و ۵۰ ضریب اخیر را مقایسه می‌کند و با یک ضریب پویا (k)
                مقدار برداشت را بین ۱.۱۰ تا ۲.۰۰ تنظیم می‌کند.
            </div>

        </div>

    </div>
</details>
<!-- ========================================= -->
<!-- بخش 6 فایل 2 — od16 تا od18 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="font-weight:bold; cursor:pointer;">B. مدیریت سرمایه</summary>

    <div style="padding:10px; direction:rtl; text-align:right;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od16 — حد سود -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od16_toggle">
                    <b>[od16]</b> حد سود (Take Profit)
                    <input type="number" id="od16_percent" value="10" style="width:60px;">%
                </label>
            </div>

            ${HR}

            <!-- od17 — حد ضرر -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od17_toggle">
                    <b>[od17]</b> حد ضرر (Stop Loss)
                    <input type="number" id="od17_percent" value="20" style="width:60px;">%
                </label>
            </div>

            ${HR}

            <!-- od18 — تریلینگ استاپ -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:10px; gap:5px;">
                <label style="flex:1; min-width:150px; display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="od18_toggle">
                    <b>[od18]</b> تریلینگ استاپ (Trailing Stop)
                    <input type="number" id="od18_percent" value="10" style="width:60px;">%
                </label>
            </div>

        </div>

    </div>
</details>
<!-- ========================================= -->
<!-- بخش 7 فایل 2 — od32 تا od46 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="font-weight:bold; cursor:pointer;">C. لایه‌های پیشرفته و ترکیبی</summary>

    <div style="padding:10px; direction:rtl; text-align:right;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od32 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od32_toggle">
                <b>[od32]</b> ریست خودکار پس از افت سرمایه
                <input type="number" id="od32_threshold" value="15" style="width:60px;">%
            </div>

            ${HR}

            <!-- od33 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od33_toggle">
                <b>[od33]</b> حالت محافظه‌کارانه
            </div>

            ${HR}

            <!-- od34 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od34_toggle">
                <b>[od34]</b> حالت نقدینگی
            </div>

            ${HR}

            <!-- od35 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od35_toggle">
                <b>[od35]</b> حالت ترکیبی سریع
            </div>

            ${HR}

            <!-- od36 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od36_toggle">
                <b>[od36]</b> شرط ثابت
                <input type="number" id="od36_amount" value="2" style="width:60px;">
                ضریب:
                <input type="number" id="od36_multiplier" value="2.00" style="width:60px;">
            </div>

            ${HR}

            <!-- od37 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od37_toggle">
                <b>[od37]</b> شرط بعد از استریک
                <input type="number" id="od37_threshold" value="3" style="width:60px;">
            </div>

            ${HR}

            <!-- od38 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od38_toggle">
                <b>[od38]</b> دنباله شرطی
                <input type="text" id="od38_sequence" value="1,2,3" style="width:120px;">
            </div>

            ${HR}

            <!-- od39 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od39_toggle">
                <b>[od39]</b> واحد پایه پویا
                <input type="number" id="od39_base" value="1" style="width:60px;">
            </div>

            ${HR}

            <!-- od40 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od40_toggle">
                <b>[od40]</b> استریک برد
                <input type="number" id="od40_max" value="3" style="width:60px;">
                ضریب:
                <input type="number" id="od40_multiplier" value="2.00" style="width:60px;">
            </div>

            ${HR}

            <!-- od41 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od41_toggle">
                <b>[od41]</b> چتر نجات سرمایه
                <input type="number" id="od41_limit" value="10" style="width:60px;">
            </div>

            ${HR}

            <!-- od42 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od42_toggle">
                <b>[od42]</b> هدف ضرایب
                <input type="number" id="od42_target" value="2.00" style="width:60px;">
                واحد:
                <input type="number" id="od42_unit" value="1" style="width:60px;">
            </div>

            ${HR}

            <!-- od43 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od43_toggle">
                <b>[od43]</b> توقف زمانی
                <input type="number" id="od43_time" value="5" style="width:60px;"> ثانیه
            </div>

            ${HR}

            <!-- od44 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od44_toggle">
                <b>[od44]</b> لایه دوگانه
                <input type="number" id="od44_layer1" value="1.50" style="width:60px;">
                <input type="number" id="od44_layer2" value="3.00" style="width:60px;">
                آستانه:
                <input type="number" id="od44_threshold" value="10" style="width:60px;">
            </div>

            ${HR}

            <!-- od45 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od45_toggle">
                <b>[od45]</b> درصد پویا
                <input type="number" id="od45_percent" value="2" style="width:60px;">%
            </div>

            ${HR}

            <!-- od46 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od46_toggle">
                <b>[od46]</b> بازیابی چندمرحله‌ای
                هدف:
                <input type="number" id="od46_target" value="10" style="width:60px;">
                مراحل:
                <input type="number" id="od46_rounds" value="3" style="width:60px;">
                ضریب:
                <input type="number" id="od46_multiplier" value="2.00" style="width:60px;">
            </div>

        </div>

    </div>
</details>

</div> <!-- پایان محتوای داخلی -->
</details> <!-- پایان تنظیمات جامع ربات -->
<!-- ========================================= -->
<!-- بخش 1 فایل 3 — od32 تا od35 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od32-35. مدیریت پیشرفته</summary>

    <div style="padding:10px;">

        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <!-- od32 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od32_toggle">
                <b>[od32]</b> بازگشت به پایه
                <input type="number" id="od32_threshold" value="15" style="width:60px;">%
            </div>

            ${HR}

            <!-- od33 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od33_toggle">
                <b>[od33]</b> استراتژی Kelly
            </div>

            ${HR}

            <!-- od34 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od34_toggle">
                <b>[od34]</b> حالت محافظه‌کار
            </div>

            ${HR}

            <!-- od35 -->
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od35_toggle">
                <b>[od35]</b> سپر نقدینگی
            </div>

        </div>

    </div>
</details>
<!-- ========================================= -->
<!-- بخش 2 فایل 3 — od36 تا od38 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<details style="margin-bottom:10px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="font-weight:bold; cursor:pointer;">C. استراتژی‌های ویژه</summary>

    <div style="padding:10px; direction:rtl; text-align:right;">

        <!-- od36 -->
        <details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
            <summary style="cursor:pointer;">od36. شرطبندی با مبلغ و ضریب ثابت</summary>
            <div style="padding:10px;">
                <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <input type="checkbox" id="od36_toggle">
                        <b>[od36]</b> مبلغ:
                        <input type="number" id="od36_amount" value="2" style="width:70px;">
                        ضریب:
                        <input type="number" id="od36_multiplier" step="0.01" min="1.01" value="2.00" style="width:70px;">
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

                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <input type="checkbox" id="od37_toggle">
                        <b>[od37]</b> تعداد باخت:
                        <input type="number" id="od37_threshold" value="3" style="width:60px;">
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

                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <input type="checkbox" id="od38_toggle">
                        <b>[od38]</b> رشته:
                        <input type="text" id="od38_sequence" placeholder="مثلاً: 1,2,3" style="width:120px;">
                    </div>

                </div>
            </div>
        </details>

    </div>
</details>
<!-- ========================================= -->
<!-- بخش 3 فایل 3 — od39 تا od41 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<!-- od39 -->
<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od39. استراتژی آسیاب اسکار</summary>
    <div style="padding:10px;">
        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od39_toggle">
                <b>[od39]</b> مبلغ پایه:
                <input type="number" id="od39_base" placeholder="1" style="width:80px;">
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

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od40_toggle">
                <b>[od40]</b> مبلغ پایه:
                <input type="number" id="od40_base" placeholder="1" style="width:80px;">
                سقف برد:
                <input type="number" id="od40_max" placeholder="3" style="width:60px;">
            </div>

        </div>
    </div>
</details>

${HR}

<!-- od41 -->
<!-- ========================================= -->
<!-- بخش 4 فایل 3 — od42 تا od46 (نسخه اصلاح‌شده) -->
<!-- ========================================= -->

<!-- od42 -->
<details style="margin-bottom:5px; border:1px solid #eee; padding:5px; border-radius:4px;">
    <summary style="cursor:pointer;">od42. استراتژی پوشش ضرر (Loss Coverage)</summary>
    <div style="padding:10px;">
        <div style="border:1px solid #ddd; background:#f0f8ff; padding:10px; margin:5px 0; border-radius:5px;">

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od42_toggle">
                <b>[od42]</b> ضریب:
                <input type="number" id="od42_target" step="0.01" min="1.01" value="2.00" style="width:70px;">
                واحد پایه:
                <input type="number" id="od42_unit" value="1" style="width:70px;">
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

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od43_toggle">
                <b>[od43]</b> زمان خروج:
                <input type="number" id="od43_time" step="0.5" min="0.5" value="2.0" style="width:70px;"> ثانیه
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

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od44_toggle">
                <b>[od44]</b> لایه ۱:
                <input type="number" id="od44_layer1" step="0.01" min="1.01" value="1.50" style="width:70px;">
                لایه ۲:
                <input type="number" id="od44_layer2" step="0.01" min="1.01" value="3.00" style="width:70px;">
                آستانه:
                <input type="number" id="od44_threshold" value="10" style="width:70px;">
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

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od45_toggle">
                <b>[od45]</b> درصد:
                <input type="number" id="od45_percent" value="2" style="width:60px;">%
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

            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <input type="checkbox" id="od46_toggle">
                <b>[od46]</b> هدف:
                <input type="number" id="od46_target" value="10" style="width:70px;">
                حداکثر دور:
                <input type="number" id="od46_rounds" value="3" style="width:70px;">
                ضریب:
                <input type="number" id="od46_multiplier" step="0.01" value="2.00" style="width:70px;">
            </div>

        </div>
    </div>
</details>
/* ============================================
   بخش 1 فایل 4 — نمایش‌ها و مقداردهی اولیه
   ============================================ */

function updateHitAndRunDisplay() {
    const el = document.getElementById('hitAndRunStatusDisplay');
    if (!el) return;

    if (isHitAndRunStopped) {
        el.textContent = stopReason === "profit"
            ? "⛔ توقف: حد سود فعال شد"
            : "⛔ توقف: حد ضرر فعال شد";
        el.style.color = "#e74c3c";
    } else {
        el.textContent = "فعال";
        el.style.color = "#2ecc71";
    }
}

function updatePeakDisplay() {
    const peakDisplay = document.getElementById('peakValueDisplay');
    if (peakDisplay) peakDisplay.textContent = peakCapital;
}

function syncInitialCapitalFromSite() {
    try {
        const balanceEl = document.querySelector(".balance-value");
        if (!balanceEl) return;

        const raw = balanceEl.textContent.replace(/,/g, "").trim();
        const val = parseFloat(raw);

        if (!isNaN(val)) {
            initialCapital = val;
            peakCapital = val;
            updatePeakDisplay();
        }
    } catch (e) {
        console.log("خطا در همگام‌سازی سرمایه اولیه:", e);
    }
}

function updateFormulaAnalysis() {
    // نسخه کامل این تابع در فایل اصلی موجود است
    // اینجا فقط ساختار حفظ شده است
}
/* ============================================
   بخش 2 فایل 4 — مدیریت لیست‌های MD5 و HASH
   ============================================ */

function updateMD5List() {
    const container = document.getElementById('md5ListContainer');
    if (!container) return;

    if (md5History.length === 0) {
        container.innerHTML = '<div style="color:#888; text-align:center;">هیچ MD5 یافت نشد.</div>';
        return;
    }

    let html = "";
    md5History.forEach((md5, i) => {
        const id = `copy_md5_${i}`;
        html += `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding:3px 0;">
                <span style="color:#0f0;">#${i+1}: ${md5}</span>
                <button id="${id}" style="background:#555; border:none; color:white; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:10px;">کپی</button>
            </div>
        `;
    });

    container.innerHTML = html;

    md5History.forEach((md5, i) => {
        const btn = document.getElementById(`copy_md5_${i}`);
        if (!btn) return;

        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(md5)
                .then(() => {
                    btn.textContent = "✅";
                    btn.style.background = "#28a745";
                    setTimeout(() => {
                        btn.textContent = "کپی";
                        btn.style.background = "#555";
                    }, 1500);
                })
                .catch(() => alert("خطا در کپی"));
        });
    });
}

function updateHashList() {
    const container = document.getElementById('hashListContainer');
    if (!container) return;

    if (hashHistory.length === 0) {
        container.innerHTML = '<div style="color:#888; text-align:center;">هیچ HASH یافت نشد.</div>';
        return;
    }

    let html = "";
    hashHistory.forEach((hash, i) => {
        const id = `copy_hash_${i}`;
        const shortHash = `${hash.substring(0,10)}...${hash.substring(hash.length-10)}`;

        html += `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding:3px 0;">
                <span style="color:#0f0;">#${i+1}: ${shortHash}</span>
                <button id="${id}" style="background:#555; border:none; color:white; padding:2px 8px; border-radius:3px; cursor:pointer; font-size:10px;">کپی</button>
            </div>
        `;
    });

    container.innerHTML = html;

    hashHistory.forEach((hash, i) => {
        const btn = document.getElementById(`copy_hash_${i}`);
        if (!btn) return;

        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(hash)
                .then(() => {
                    btn.textContent = "✅";
                    btn.style.background = "#28a745";
                    setTimeout(() => {
                        btn.textContent = "کپی";
                        btn.style.background = "#555";
                    }, 1500);
                })
                .catch(() => alert("خطا در کپی"));
        });
    });
}

function checkDuplicates() {
    const display = document.getElementById('duplicateResultDisplay');
    if (!display) return;

    display.style.color = "#ffd700";
    display.innerHTML = "در حال بررسی...";

    const duplicateResults = [];

    // بررسی MD5
    const md5Map = {};
    md5History.forEach((md5, i) => {
        if (!md5Map[md5]) md5Map[md5] = [];
        md5Map[md5].push(i);
    });

    Object.keys(md5Map).forEach(key => {
        if (md5Map[key].length > 1) {
            const indices = md5Map[key];
            const coefs = indices.map(idx => bustHistory[idx]?.toFixed(2) || "نامشخص");
            duplicateResults.push(`🔴 MD5 تکراری: <b>${key}</b> (ضریب‌ها: ${coefs.join(", ")})`);
        }
    });

    // بررسی HASH
    const hashMap = {};
    hashHistory.forEach((hash, i) => {
        if (!hashMap[hash]) hashMap[hash] = [];
        hashMap[hash].push(i);
    });

    Object.keys(hashMap).forEach(key => {
        if (hashMap[key].length > 1) {
            const indices = hashMap[key];
            const coefs = indices.map(idx => bustHistory[idx]?.toFixed(2) || "نامشخص");
            duplicateResults.push(`🔴 HASH تکراری: <b>${key.substring(0,15)}...</b> (ضریب‌ها: ${coefs.join(", ")})`);
        }
    });

    if (duplicateResults.length === 0) {
        display.innerHTML = "✅ هیچ MD5 یا HASH تکراری در ۵۰ دور اخیر یافت نشد.";
        display.style.color = "#2ecc71";
    } else {
        display.innerHTML = duplicateResults.join("<br>");
        display.style.color = "#e74c3c";
    }
}
/* ============================================
   بخش 3 فایل 4 — ذخیره‌سازی و یادگیری تطبیقی
   ============================================ */

function saveDataToLocal() {
    try {
        const keyInput = document.getElementById('localStorageKeyInput');
        const key = keyInput?.value.trim() || localStorageKey;
        localStorage.setItem(key, JSON.stringify(hourlyStats));
    } catch (e) {
        console.log("خطا در ذخیره‌سازی:", e);
    }
}

function loadDataFromLocal() {
    try {
        const keyInput = document.getElementById('localStorageKeyInput');
        const key = keyInput?.value.trim() || localStorageKey;

        const stored = localStorage.getItem(key);
        if (!stored) {
            alert("هیچ داده‌ای یافت نشد.");
            return;
        }

        hourlyStats = JSON.parse(stored);
        ensureHourlyStatsStructure();
        updateAdaptiveDisplay();

    } catch (e) {
        console.log("خطا در بارگذاری:", e);
    }
}

function ensureHourlyStatsStructure() {
    Object.keys(hourlyStats).forEach(slot => {
        const s = hourlyStats[slot];
        if (!s.games) s.games = 0;
        if (!s.wins) s.wins = 0;
        if (!s.totalMultiplier) s.totalMultiplier = 0;
    });
}

function startAutoSave() {
    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);

    autoSaveIntervalId = setInterval(() => {
        if (adaptiveLearningEnabled && autoSaveEnabled) {
            saveDataToLocal();
        }
    }, 300000); // هر 5 دقیقه
}

function updateHourlyStats(win, multiplier) {
    if (!adaptiveLearningEnabled) return;

    const slot = getCurrentSlotKey();
    if (!hourlyStats[slot]) {
        hourlyStats[slot] = { games: 0, wins: 0, totalMultiplier: 0 };
    }

    hourlyStats[slot].games += 1;
    hourlyStats[slot].totalMultiplier += multiplier;
    if (win) hourlyStats[slot].wins += 1;

    if (!autoSaveEnabled && hourlyStats[slot].games % 10 === 0) {
        saveDataToLocal();
    }

    updateAdaptiveDisplay();
}

function getAdaptiveRecommendation() {
    if (!adaptiveLearningEnabled) {
        return { action: "normal", reason: "غیرفعال" };
    }

    const slot = getCurrentSlotKey();
    const stats = hourlyStats[slot];

    if (!stats || stats.games < 5) {
        return { action: "normal", reason: "داده کافی نیست" };
    }

    const winRate = (stats.wins / stats.games) * 100;
    const avg = stats.totalMultiplier / stats.games;

    if (autoActionEnabled) {
        if (aggressiveEnabled && winRate > 60 && avg > 1.8) {
            return {
                action: "aggressive",
                reason: `ساعت طلایی! برد ${winRate.toFixed(1)}% و میانگین ${avg.toFixed(2)}x`
            };
        }

        if (defensiveEnabled && winRate < 40) {
            return {
                action: "defensive",
                reason: `ساعت پرخطر! برد فقط ${winRate.toFixed(1)}%`
            };
        }
    }

    return {
        action: "neutral",
        reason: `حالت متعادل. برد ${winRate.toFixed(1)}%`
    };
}

function updateAdaptiveDisplay() {
    const slotEl = document.getElementById('currentSlotDisplay');
    const totalEl = document.getElementById('totalLearnedData');
    const winRateEl = document.getElementById('hourlyWinRate');
    const avgEl = document.getElementById('hourlyAvgMultiplier');
    const decisionEl = document.getElementById('aiDecisionDisplay');

    if (!slotEl || !totalEl || !winRateEl || !avgEl || !decisionEl) return;

    const slot = getCurrentSlotKey();
    slotEl.textContent = slot;

    let totalGames = 0;
    Object.keys(hourlyStats).forEach(k => totalGames += hourlyStats[k].games);
    totalEl.textContent = totalGames;

    const stats = hourlyStats[slot];

    if (stats && stats.games > 0) {
        const wr = (stats.wins / stats.games) * 100;
        const avg = stats.totalMultiplier / stats.games;

        winRateEl.textContent = wr.toFixed(1) + "%";
        avgEl.textContent = avg.toFixed(2) + "x";
    } else {
        winRateEl.textContent = "بدون داده";
        avgEl.textContent = "بدون داده";
    }

    const dec = getAdaptiveRecommendation();

    if (dec.action === "aggressive") {
        decisionEl.innerHTML = "🚀 حالت تهاجمی - " + dec.reason;
        decisionEl.style.color = "#2ecc71";
    } else if (dec.action === "defensive") {
        decisionEl.innerHTML = "🛡️ حالت دفاعی - " + dec.reason;
        decisionEl.style.color = "#e74c3c";
    } else {
        decisionEl.innerHTML = "⚖️ حالت متعادل - " + dec.reason;
        decisionEl.style.color = "#f1c40f";
    }
}
/* ============================================
   بخش 4 فایل 4 — تحلیل هش و محاسبه ضریب
   ============================================ */

function calculateMultiplierFromHash(hash) {
    if (!hash || hash.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(hash)) {
        throw new Error("هش نامعتبر");
    }

    const parts = [];
    for (let i = 0; i < hash.length; i += 4) {
        parts.push(hash.substring(i, i + 4));
    }

    let sum = 0;
    for (let j = 0; j < parts.length; j++) {
        sum += parseInt(parts[j], 16);
    }

    if (sum % 5 === 0) return 0.00;

    const X = parseInt(hash.substring(0, 13), 16);
    const Y = 4503599627370496;

    let mult = (100 * ((Y - X) / X)) / (X - (Y * 100));
    if (mult < 0) mult = Math.abs(mult);

    return parseFloat(mult.toFixed(2));
}

function verifyHash() {
    // نسخه کامل این تابع در فایل اصلی موجود است
    // اینجا فقط ساختار حفظ شده است
}

function autoVerifyLastHash() {
    const statusEl = document.getElementById('autoVerifyStatus');
    const fakeContainer = document.getElementById('fakeHashRecordContainer');

    fakeContainer.style.display = 'none';

    if (md5History.length === 0 || bustHistory.length === 0) {
        statusEl.textContent = "⚠️ داده کافی نیست";
        statusEl.style.color = "#f1c40f";
        return;
    }

    const lastMD5 = md5History[0];
    const actualMultiplier = bustHistory[0];

    try {
        const calculated = calculateMultiplierFromHash(lastMD5);
        const tolerance = 0.01;

        if (Math.abs(calculated - actualMultiplier) <= tolerance) {
            statusEl.textContent = "✅ کد هش صحیح بود! (ضریب تطابق دارد)";
            statusEl.style.color = "#2ecc71";

            fakeHashRecord = null;
            fakeContainer.style.display = 'none';

        } else {
            statusEl.textContent = "❌ کد هش جعلی بود! (عدم تطابق ضریب)";
            statusEl.style.color = "#e74c3c";

            fakeHashRecord = {
                hash: lastMD5,
                calculated,
                actual: actualMultiplier
            };

            document.getElementById('fakeCalculatedMultiplier').textContent = calculated.toFixed(2);
            document.getElementById('fakeActualMultiplier').textContent = actualMultiplier.toFixed(2);
            document.getElementById('fakeHashValue').textContent = lastMD5;

            fakeContainer.style.display = 'block';
        }

    } catch (e) {
        statusEl.textContent = "❌ خطا: " + e.message;
        statusEl.style.color = "#e74c3c";
    }
}
/* ============================================
   بخش 5 فایل 4 — تحلیل احتمالات و تحلیل جلسه
   ============================================ */

function calculateProbability() {
    const targetInput = document.getElementById('probTargetInput');
    const display50 = document.getElementById('probDisplay50');
    const displayAll = document.getElementById('probDisplayAll');
    const displayFinal = document.getElementById('probDisplayFinal');

    if (!targetInput || !display50 || !displayAll || !displayFinal) return;

    const target = parseFloat(targetInput.value);

    if (isNaN(target) || target <= 0) {
        display50.textContent = "نامعتبر";
        displayAll.textContent = "نامعتبر";
        displayFinal.textContent = "نامعتبر";
        return;
    }

    let count50 = 0;
    let countAll = 0;

    for (let i = 0; i < bustHistory.length; i++) {
        if (bustHistory[i] >= target) count50++;
    }

    for (let j = 0; j < fullHistory.length; j++) {
        if (fullHistory[j] >= target) countAll++;
    }

    const prob50 = bustHistory.length > 0 ? (count50 / bustHistory.length) * 100 : 0;
    const probAll = fullHistory.length > 0 ? (countAll / fullHistory.length) * 100 : 0;

    display50.textContent = prob50.toFixed(1) + "%";
    displayAll.textContent = probAll.toFixed(1) + "%";

    const finalProb = (prob50 * 0.6) + (probAll * 0.4);
    displayFinal.textContent = finalProb.toFixed(1) + "%";
}

function analyzeSession() {
    const rangeInput = document.getElementById('sessionRange');
    const avgDisplay = document.getElementById('avgSessionMultiplier');
    const recDisplay = document.getElementById('sessionRecommendation');

    if (!rangeInput || !avgDisplay || !recDisplay) return;

    const minutes = parseInt(rangeInput.value) || 5;
    const now = Date.now();
    const cutoff = now - (minutes * 60 * 1000);

    const recent = [];

    for (let i = 0; i < sessionHistory.length; i++) {
        if (sessionHistory[i].time >= cutoff) {
            recent.push(sessionHistory[i].value);
        }
    }

    if (recent.length < 3) {
        avgDisplay.textContent = "داده کافی نیست";
        recDisplay.textContent = "صبر کنید";
        return;
    }

    let avg = 0;
    for (let j = 0; j < recent.length; j++) {
        avg += recent[j];
    }

    avg = avg / recent.length;

    avgDisplay.textContent = avg.toFixed(2) + "x";

    let recommendation = "🔴 زمان بد!";
    if (avg > 2.5) recommendation = "🟢 بهترین زمان!";
    else if (avg > 1.5) recommendation = "🟡 زمان متوسط";

    recDisplay.textContent = recommendation;
}
/* ============================================
   بخش 6 فایل 4 — منطق اصلی شرط‌بندی و مدیریت سرمایه
   ============================================ */

function applyPreset(multiplier) {
    let sequence;

    switch (multiplier) {
        case 1.10: sequence = OLD_SEQ_1_10; break;
        case 1.20: sequence = OLD_SEQ_1_20; break;
        case 1.30: sequence = OLD_SEQ_1_30; break;
        case 1.50: sequence = OLD_SEQ_1_50; break;
        case 1.80: sequence = OLD_SEQ_1_80; break;
        case 2.00:
            sequence = [
                2,3,7,15,31,63,127,255,511,1023,2047,4095,8191,
                16383,32767,65535,131071,262143,524287,1048575,
                2097151,4194303,8388607,16777215,33554431,
                67108863,134217727,268435455,536870911,1073741823
            ];
            break;
        case 3.00: sequence = FIBO_SEQ_3; break;
        case 4.00: sequence = FIBO_SEQ_4; break;
        default: sequence = [];
    }

    intendedCashoutTarget = multiplier;
    customMartingaleSequence = sequence;

    lossCounter = 0;
    emergencyModeActive = false;
    emergencyStep = 0;
    emergencyHistory = [];

    damage = 0;
    currentLossTotal = 0;
    consecutiveLow179 = 0;
    currentProfit = 0;
    virtualProfit = 0;
    stopLossAccum = 0;

    isHitAndRunStopped = false;
    stopReason = "";

    const displayDiv = document.getElementById('seqDisplay');
    if (displayDiv) {
        const firstFour = sequence.slice(0, 4);
        displayDiv.textContent = firstFour.join(' → ') + " ...";
        displayDiv.style.cssText = `
            font-weight:900; font-size:15px; color:#fff;
            font-family:monospace; letter-spacing:1px;
            background:#1a1a1a; padding:10px; border-radius:5px;
            border:1px solid #555; box-shadow:inset 0 0 5px rgba(255,255,255,0.1);
            direction:rtl; text-align:right;
        `;
    }

    const multiplierDisplay = document.getElementById('currentMultiplierDisplay');
    if (multiplierDisplay) multiplierDisplay.textContent = intendedCashoutTarget.toFixed(2);

    updateHitAndRunDisplay();
    getInformation();

    console.log(`ضریب آماده ${multiplier}x فعال شد. دنباله (${sequence.length} دور):`, sequence);
}

function checkHitAndRun() {
    if (!takeProfitEnabled && !stopLossEnabled) {
        isHitAndRunStopped = false;
        stopReason = "";
        return;
    }

    const targetProfit = Math.floor(initialCapital * takeProfitPercent / 100);
    const targetLoss = Math.floor(initialCapital * stopLossPercent / 100);

    if (takeProfitEnabled && virtualProfit >= targetProfit) {
        allowBetting = false;
        isTemporarilyPaused = true;
        isHitAndRunStopped = true;
        stopReason = "profit";
        console.log(`حد سود (${takeProfitPercent}% = ${targetProfit} واحد) رسید!`);
        return;
    }

    if (stopLossEnabled && stopLossAccum >= targetLoss) {
        allowBetting = false;
        isTemporarilyPaused = true;
        isHitAndRunStopped = true;
        stopReason = "loss";
        console.log(`حد ضرر (${stopLossPercent}% = ${targetLoss} واحد) رسید! مجموع باخت‌های متوالی: ${stopLossAccum}`);
        return;
    }

    isHitAndRunStopped = false;
    stopReason = "";
}

function checkTrailingStop() {
    if (!trailingStopEnabled || isPeakStopped) return;

    const currentBalance = initialCapital + currentProfit;

    if (currentBalance > peakCapital) {
        peakCapital = currentBalance;
        console.log("قله جدید:", peakCapital);
    }

    const threshold = Math.floor(peakCapital * (1 - trailingStopPercent / 100));

    if (currentBalance < threshold) {
        allowBetting = false;
        isTemporarilyPaused = true;
        isPeakStopped = true;

        console.log(
            `حد ضرر شناور: موجودی ${currentBalance} از قله ${peakCapital} بیش از ${trailingStopPercent}% افت کرد. آستانه: ${threshold}`
        );
    }
}

function checkBettingCondition(historyData) {
    if (!historyData || historyData.length === 0) {
        allowBetting = false;
        isTemporarilyPaused = true;
        return;
    }

    checkTrailingStop();
    if (isPeakStopped) return;

    checkHitAndRun();
    if (isHitAndRunStopped) return;

    if (manualPause) {
        allowBetting = false;
        isTemporarilyPaused = true;
        return;
    }

    // od1
    if (od1Enabled && od1ConsecutiveLosses >= od1Threshold) {
        allowBetting = false;
        isTemporarilyPaused = true;
        return;
    }

    // od2
    if (od2Enabled && historyData.length >= 50) {
        let count = 0;
        for (let i = 0; i < 50; i++) {
            if (historyData[i] >= od2Multiplier) count++;
        }
        const actualPercent = (count / 50) * 100;
        if (od2Threshold > actualPercent) {
            allowBetting = false;
            isTemporarilyPaused = true;
            return;
        }
    }

    // od4
    if (od4Enabled && fullHistory.length >= 50) {
        let count = 0;
        for (let i = 0; i < fullHistory.length; i++) {
            if (fullHistory[i] >= od4Multiplier) count++;
        }
        const actualPercent = (count / fullHistory.length) * 100;
        if (od4Threshold > actualPercent) {
            allowBetting = false;
            isTemporarilyPaused = true;
            return;
        }
    }

    // od6
    if (trendFilterEnabled && historyData.length >= 50) {
        let last10Avg = 0, last50Avg = 0;
        for (let i = 0; i < 10; i++) last10Avg += historyData[i];
        for (let i = 0; i < 50; i++) last50Avg += historyData[i];
        last10Avg /= 10;
        last50Avg /= 50;

        if (last10Avg < last50Avg) {
            allowBetting = false;
            isTemporarilyPaused = true;
            return;
        }
    }

    // od8
    if (od8Enabled && od8ConsecutiveLosses >= 3) {
        allowBetting = false;
        isTemporarilyPaused = true;
        return;
    }

    // od32
    if (resetModeEnabled && !resetModeTriggered) {
        const currentBalance = initialCapital + currentProfit;
        if (peakCapital > 0 && currentBalance < peakCapital * (1 - resetDropThreshold / 100)) {
            resetModeTriggered = true;
        }
    }

    // od41 / od46 Pause
    if (od41Pause || od46Pause) {
        allowBetting = false;
        isTemporarilyPaused = true;
        return;
    }

    allowBetting = true;
    isTemporarilyPaused = false;
}

function getOptimizedAmount() {
    if (customMartingaleSequence.length > 0 && lossCounter < customMartingaleSequence.length) {
        return customMartingaleSequence[lossCounter];
    }

    const baseSequence = [2,3,7,15,31,63,127,255,511,1023];

    if (lossCounter < baseSequence.length) {
        return baseSequence[lossCounter];
    }

    if (emergencyModeActive) {
        if (emergencyHistory.length === 0) emergencyHistory = baseSequence.slice();

        const lastBet = emergencyHistory[emergencyHistory.length - 1];
        const secondLastBet = emergencyHistory[emergencyHistory.length - 2];
        const newBet = lastBet + secondLastBet;

        return emergencyStep < 15 ? newBet : 1;
    }

    return 1;
}

function increaseBetAfterLoss() {
    lossCounter++;
    if (lossCounter === 10 && !emergencyModeActive) {
        emergencyModeActive = true;
        emergencyStep = 0;
        emergencyHistory = [];
    }
}

function resetBetAfterWin() {
    if (!emergencyModeActive) {
        lossCounter = 0;
    } else {
        emergencyModeActive = false;
        emergencyStep = 0;
        emergencyHistory = [];
    }
}

function getPrice() {
    const baseAmount = getOptimizedAmount();

    if (od14_active) return 1;
    if (od13_active) return Math.max(1, Math.floor(baseAmount * 0.5));
    if (od11_active) return Math.max(1, Math.floor(baseAmount * 1.2));

    if (positionSizingEnabled) {
        const totalCapital = initialCapital + currentProfit;
        const bet = totalCapital * (riskPercent / 100);
        return Math.max(1, Math.floor(bet));
    }

    if (od33Enabled && fullHistory.length >= 50) {
        let winRate = 0;
        for (let i = 0; i < 50; i++) {
            if (fullHistory[i] >= 2.0) winRate++;
        }
        winRate = (winRate / 50) * 100;

        const kellyFraction = (winRate - (100 - winRate)) / 100;

        if (kellyFraction > 0) {
            const totalCapital = initialCapital + currentProfit;
            return Math.max(1, Math.floor(totalCapital * kellyFraction));
        }
    }

    if (od45Enabled) {
        const totalCapital = initialCapital + currentProfit;
        return Math.max(1, Math.floor(totalCapital * (od45Percentage / 100)));
    }

    if (conservativeEnabled && lossCounter >= 3) {
        return Math.max(1, Math.floor(baseAmount * 0.5));
    }

    if (liquidityEnabled && (initialCapital + currentProfit) < (initialCapital * 0.5)) {
        return 0.5;
    }

    if (resetModeTriggered) {
        return 2;
    }

    return baseAmount;
}

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
        return;
    }

    if (isHitAndRunStopped || isPeakStopped || manualPause || isTemporarilyPaused || !allowBetting) {
        if (t_priceAmount) t_priceAmount.value = 0;
        isBetActive = false;
        return;
    }

    // ------------------ اولویت 1: od46 ------------------
    if (od46Enabled && od46RecoveryActive && !od46Pause) {
        const totalLossForCalc = currentLossTotal > 0 ? currentLossTotal : od46LossAtStart;
        const calculatedBet = (totalLossForCalc + 1) / (od46Multiplier - 1);

        lastBetAmount = Math.max(1, Math.ceil(calculatedBet));
        intendedCashoutTarget = od46Multiplier;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }
}
/* ============================================
   بخش 1 فایل 5 — اولویت 2 (الگوهای واکنش‌گرا)
   ============================================ */

function applyReactivePatterns() {

    // od14 — پناهگاه ایمن
    if (od14_active) {
        intendedCashoutTarget = 1.10;
        return;
    }

    // الگوی تکرار قرمز (redRepeat)
    if (redRepeatActive && redRepeatAction !== "2.00") {
        intendedCashoutTarget = parseFloat(redRepeatAction);
        return;
    }

    // الگوی تشخیص الگو (pattern)
    if (patternActive) {
        intendedCashoutTarget = patternTargetMultiplier;
        return;
    }

    // od15 — نوسان‌یاب تطبیقی
    if (od15Enabled && bustHistory.length >= 50) {

        const last10 = bustHistory.slice(0, 10);
        const last50 = bustHistory.slice(0, 50);

        const mean10 = last10.reduce((a, b) => a + b, 0) / 10;
        const mean50 = last50.reduce((a, b) => a + b, 0) / 50;

        const std10 = Math.sqrt(last10.reduce((s, v) => s + Math.pow(v - mean10, 2), 0) / 10);
        const std50 = Math.sqrt(last50.reduce((s, v) => s + Math.pow(v - mean50, 2), 0) / 50);

        let cv = std50 / mean50;
        let k = Math.max(0.5, Math.min(1.5, cv + 0.1));

        let exitRaw = Math.max(1.01, mean10 - k * std10);

        const multipliers = [1.10, 1.20, 1.30, 1.50, 1.80, 2.00];
        const selected = multipliers.reduce((prev, curr) =>
            Math.abs(curr - exitRaw) < Math.abs(prev - exitRaw) ? curr : prev
        );

        intendedCashoutTarget = selected;
        od15Multiplier = selected;
        return;
    }

    // od44 — لایه‌بندی پیش‌رونده
    if (od44Enabled) {
        intendedCashoutTarget =
            currentProfit >= od44Threshold ? od44Layer2Target : od44Layer1Target;
        return;
    }

    // od19 — جدول آماری
    if (od19Enabled && bustHistory.length >= 50) {

        let targetRow = null;
        let targetValue = (od19Mode === "lowest") ? Infinity : -Infinity;
        const isLowest = (od19Mode === "lowest");

        for (let i = 0; i < STATS_DATA.length; i++) {

            const row = STATS_DATA[i];
            const coeff = row.coeff;
            const fair = row.fair;

            let count50 = 0;
            for (let j = 0; j < 50; j++) {
                if (bustHistory[j] >= coeff) count50++;
            }
            const cVal = (count50 / 50) * 100;
            const dVal = 100 - cVal;

            let countAll = 0;
            for (let k = 0; k < fullHistory.length; k++) {
                if (fullHistory[k] >= coeff) countAll++;
            }
            const eVal = fullHistory.length > 0 ? (countAll / fullHistory.length) * 100 : 0;

            let colValue = 0;
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
            intendedCashoutTarget = Math.max(1.10, Math.min(4.00, targetRow.coeff));
        }

        return;
    }

    // od9 — میانگین‌گیری
    if (od9Enabled && bustHistory.length >= od9AvgPeriod) {

        const sum = bustHistory.slice(0, od9AvgPeriod).reduce((a, b) => a + b, 0);
        let avg = sum / od9AvgPeriod;

        avg = Math.max(1.10, Math.min(4.00, avg));

        intendedCashoutTarget = parseFloat(avg.toFixed(2));
        return;
    }
}
/* ============================================
   بخش 2 فایل 5 — اولویت 3 (استراتژی‌های ضریب 2.00)
   ============================================ */

function applyFixedStrategies() {

    // 1. od38 — لابوشر
    if (od38Enabled && od38Sequence.length > 0) {
        const first = od38Sequence[0];
        const last = od38Sequence[od38Sequence.length - 1];

        lastBetAmount = first + last;
        intendedCashoutTarget = 2.00;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 2. od39 — آسیاب اسکار
    if (od39Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od39CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 3. od40 — آنتی‌مارتینگل
    if (od40Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od40CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 4. od41 — پاراچوت
    if (od41Enabled && !od41Pause) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od41CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 5. od42 — پوشش ضرر
    if (od42Enabled) {
        if (od42TotalLoss > 0) {
            const calc = (od42TotalLoss + od42Unit) / (od42Target - 1);
            lastBetAmount = Math.max(1, Math.ceil(calc));
        } else {
            lastBetAmount = Math.max(od42Unit, 1);
        }

        intendedCashoutTarget = od42Target;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 6. od45 — درصد ثابت
    if (od45Enabled) {
        const totalCapital = initialCapital + currentProfit;
        lastBetAmount = Math.max(1, Math.floor(totalCapital * (od45Percentage / 100)));

        intendedCashoutTarget = 2.00;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 7. od24 — دالامبر
    if (od24Enabled) {
        intendedCashoutTarget = 2.00;
        lastBetAmount = od24CurrentBet;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 8. od36 — شرط ثابت
    if (fixedBetEnabled) {
        if (fixedBetAmount <= 0 || fixedBetMultiplier <= 0) return;

        lastBetAmount = fixedBetAmount;
        intendedCashoutTarget = fixedBetMultiplier;

        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
        t_priceAmount.value = lastBetAmount;

        setTimeout(() => {
            t_setCashBtn.click();
            isBetActive = true;
        }, 400);

        return;
    }

    // 9. od37 — شروع بعد از باخت
    if (betAfterStreakEnabled) {
        if (currentStreakSinceLastBet < betAfterStreakThreshold) {
            if (t_priceAmount) t_priceAmount.value = 0;
            isBetActive = false;
            return;
        }
        // اگر به آستانه رسید، ادامه با منطق عادی
    }
}
/* ============================================
   بخش 3 فایل 5 — اولویت 4 (منطق عادی شرط‌بندی)
   ============================================ */

function applyNormalBettingLogic() {

    // مبلغ شرط بر اساس مارتینگل پایه، سفارشی یا حالت اورژانسی
    lastBetAmount = getPrice();

    // اگر حالت اورژانسی فعال باشد، ضریب خروج مخصوص اورژانسی استفاده می‌شود
    if (emergencyModeActive) {
        intendedCashoutTarget = emergencyTargetMultiplier;
        t_cashoutProduct.value = emergencyTargetMultiplier.toFixed(2);
        emergencyStep++;
    } else {
        // در حالت عادی، ضریب خروج همان intendedCashoutTarget است
        t_cashoutProduct.value = intendedCashoutTarget.toFixed(2);
    }

    // تنظیم مبلغ شرط
    t_priceAmount.value = lastBetAmount;

    // ارسال رویدادهای لازم برای سایت
    if (t_cashoutProduct) {
        t_cashoutProduct.dispatchEvent(new Event("input", { bubbles: true }));
        t_cashoutProduct.dispatchEvent(new Event("change", { bubbles: true }));
        t_cashoutProduct.dispatchEvent(new Event("blur", { bubbles: true }));
    }

    if (t_priceAmount) {
        t_priceAmount.dispatchEvent(new Event("input", { bubbles: true }));
        t_priceAmount.dispatchEvent(new Event("change", { bubbles: true }));
        t_priceAmount.dispatchEvent(new Event("blur", { bubbles: true }));
    }

    // فعال‌سازی شرط
    setTimeout(() => {
        t_setCashBtn.click();
        isBetActive = true;
    }, 400);
}
/* ============================================
   بخش 4 فایل 5 — رویدادهای بازی و مدیریت کامل چرخه
   ============================================ */

let justCashedOut = false;

/* ------------------------------
   توقف خودکار شرط در لحظه بازی
------------------------------ */
function fake_stop_algoritm(str) {
    const cashBtn = document.getElementsByClassName("place-bet-cashout")[0];
    if (!cashBtn) return;

    const liveMultiplier = str.current / 100;

    // شرط ثابت (od36)
    if (fixedBetEnabled) {
        if (liveMultiplier >= fixedBetMultiplier) {
            cashBtn.click();
            justCashedOut = true;
        }
        return;
    }

    // اسکالینگ
    if (scalingEnabled && liveMultiplier >= scalingLevel1 && !scalingPartialDone) {
        scalingPartialDone = true;
    }

    // نقطه سربه‌سر
    if (breakevenEnabled && liveMultiplier >= breakevenThreshold) {
        cashBtn.click();
        justCashedOut = true;
        return;
    }

    // حد سود شناور (Trailing TP)
    if (trailingTPEnabled) {
        if (liveMultiplier >= trailingTPTarget && !trailingTPPeakSet) {
            trailingTPPeak = liveMultiplier;
            trailingTPPeakSet = true;
        }
        if (trailingTPPeakSet && liveMultiplier < trailingTPPeak - 0.4) {
            cashBtn.click();
            justCashedOut = true;
            return;
        }
    }

    // حالت اورژانسی
    if (emergencyModeActive) {
        if (liveMultiplier >= emergencyTargetMultiplier) {
            cashBtn.click();
            justCashedOut = true;
            return;
        }
        if (emergencyStep >= 15 && liveMultiplier >= 2.5) {
            cashBtn.click();
            justCashedOut = true;
            return;
        }
        return;
    }

    // حالت عادی
    if (isBetActive && liveMultiplier >= intendedCashoutTarget) {
        cashBtn.click();
        justCashedOut = true;
    }
}

/* ------------------------------
   رویداد شروع دور جدید
------------------------------ */
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

/* ------------------------------
   رویداد آپدیت لحظه‌ای بازی
------------------------------ */
game_update = (function () {
    return function (str) {
        try {
            if (od43Enabled && isBetActive && !justCashedOut && od43StartTime > 0) {
                const elapsed = (Date.now() - od43StartTime) / 1000;
                if (elapsed >= od43Time) {
                    const cashBtn = document.getElementsByClassName("place-bet-cashout")[0];
                    if (cashBtn) {
                        cashBtn.click();
                        justCashedOut = true;
                    }
                }
            }
        } catch (e) {}

        f_game_update.apply(this, arguments);
    };
}());

/* ------------------------------
   رویداد پایان دور (بست شدن)
------------------------------ */
game_busted = (function () {
    return function (str) {

        let currentValue = 0;
        if (str && str.amount) {
            currentValue = str.amount / 100;
        }

        if (currentValue > 0) {

            /* --- ثبت ضریب --- */
            bustHistory.unshift(currentValue);
            if (bustHistory.length > 50) bustHistory.pop();
            fullHistory.push(currentValue);

            /* --- مدیریت od1 و od8 --- */
            if (od1Enabled) {
                if (currentValue < od1Multiplier) od1ConsecutiveLosses++;
                else od1ConsecutiveLosses = 0;
            }

            if (od8Enabled) {
                if (currentValue < 1.05) od8ConsecutiveLosses++;
                else od8ConsecutiveLosses = 0;
            }

            /* --- تشخیص الگوهای od10–od14 --- */
            if (patternDetectionEnabled && bustHistory.length >= 5) {
                let redCount = 0;
                for (let i = 0; i < 5; i++) {
                    if (bustHistory[i] < 1.80) redCount++;
                }
                patternActive = (redCount > patternRedStreakThreshold);
            }

            if (patternAllDetectionEnabled && bustHistory.length >= 50) {
                let countSpecific = 0;
                for (let i = 0; i < 50; i++) {
                    if (Math.abs(bustHistory[i] - 1.50) < 0.01) countSpecific++;
                }
                specificPatternActive = (countSpecific > 3);
                od11_active = specificPatternActive;
            }

            if (redRepeatDetectionEnabled && bustHistory.length >= 10) {
                let countRepeats = 0;
                for (let i = 0; i < 10; i++) {
                    if (bustHistory[i] < 1.79) countRepeats++;
                }
                redRepeatActive = (countRepeats >= redRepeatThreshold);
            }

            if (percentPattern50Enabled && bustHistory.length >= 50) {
                let below2 = bustHistory.slice(0, 50).filter(v => v < 2.00).length;
                od13_active = ((below2 / 50) * 100 > 60);
            }

            if (percentPatternAllEnabled && fullHistory.length >= 50) {
                let below2 = fullHistory.filter(v => v < 2.00).length;
                od14_active = ((below2 / fullHistory.length) * 100 > 70);
            }

            /* --- مدیریت سود/ضرر و استراتژی‌ها --- */
            if (lastBetAmount > 0) {

                const isWin = (justCashedOut || currentValue >= intendedCashoutTarget);

                if (isWin) {
                    const profitGain = lastBetAmount * (currentValue - 1);

                    currentProfit += profitGain;
                    stopLossAccum = 0;
                    virtualProfit += getBaseBet();

                    if (betAfterStreakEnabled) currentStreakSinceLastBet = 0;

                    /* --- od24 دالامبر --- */
                    if (od24Enabled) {
                        od24CurrentBet = Math.max(od24BaseBet, od24CurrentBet - od24BaseBet);
                    }

                    /* --- od38 لابوشر --- */
                    if (od38Enabled && od38Sequence.length > 0) {
                        od38Sequence.shift();
                        if (od38Sequence.length > 0) od38Sequence.pop();
                    }

                    /* --- od39 آسیاب اسکار --- */
                    if (od39Enabled) {
                        od39SessionProfit += profitGain;
                        if (od39SessionProfit >= od39BaseUnit) {
                            od39SessionProfit = 0;
                            od39CurrentBet = Math.max(od39BaseUnit, 1);
                        } else {
                            od39CurrentBet += od39BaseUnit;
                        }
                    }

                    /* --- od40 آنتی‌مارتینگل --- */
                    if (od40Enabled) {
                        od40CurrentBet *= 2;
                        od40WinStreak++;
                        if (od40WinStreak >= od40MaxStreak) {
                            od40CurrentBet = Math.max(od40BaseBet, 1);
                            od40WinStreak = 0;
                        }
                    }

                    /* --- od41 پاراچوت --- */
                    if (od41Enabled) {
                        od41SessionProfit += profitGain;
                        if (od41SessionProfit >= 0) {
                            od41CurrentBet = Math.max(od41BaseBet, 1);
                            od41SessionProfit = 0;
                        }
                    }

                    /* --- od42 پوشش ضرر --- */
                    if (od42Enabled) {
                        od42TotalLoss = 0;
                    }

                    /* --- od46 جبران اجباری --- */
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
                    /* --- باخت --- */
                    currentProfit -= lastBetAmount;
                    stopLossAccum += lastBetAmount;

                    if (betAfterStreakEnabled) currentStreakSinceLastBet++;

                    if (od24Enabled) od24CurrentBet += od24BaseBet;

                    if (od38Enabled) od38Sequence.push(lastBetAmount);

                    if (od40Enabled) {
                        od40CurrentBet = Math.max(od40BaseBet, 1);
                        od40WinStreak = 0;
                    }

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

                    if (od42Enabled) od42TotalLoss += lastBetAmount;

                    if (od46Enabled && od46RecoveryActive) {
                        od46CurrentRound++;
                        if (od46CurrentRound >= od46MaxRounds) {
                            od46RecoveryActive = false;
                            od46Pause = true;
                            od46CurrentRound = 0;
                        }
                    }
                }

                /* --- شروع حالت جبران اجباری --- */
                if (od46Enabled && !od46RecoveryActive && currentLossTotal >= od46Target) {
                    od46RecoveryActive = true;
                    od46CurrentRound = 0;
                    od46LossAtStart = currentLossTotal;
                    od46Pause = false;
                }

                /* --- مارتینگل معمولی --- */
                if (
                    !fixedBetEnabled &&
                    !od24Enabled &&
                    !od33Enabled &&
                    !od38Enabled &&
                    !od39Enabled &&
                    !od40Enabled &&
                    !od41Enabled &&
                    !od42Enabled &&
                    !od45Enabled &&
                    !od46Enabled
                ) {
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
                if (betAfterStreakEnabled && currentValue > 0) {
                    currentStreakSinceLastBet++;
                }
            }

            /* --- ریست od43 --- */
            if (od43Enabled) od43StartTime = 0;
        }

        /* --- استخراج MD5 و HASH از DOM --- */
        if (initialLoadDone) {
            const rows = document.querySelectorAll("div.crash-row");
            if (rows.length > 0) {
                const lastRow = rows[0];

                const md5Elem = lastRow.querySelector(md5Selector);
                if (md5Elem) {
                    const md5Text = md5Elem.innerText.trim();
                    if (/^[0-9a-fA-F]{32}$/.test(md5Text)) {
                        md5History.unshift(md5Text);
                        if (md5History.length > 50) md5History.pop();
                    }
                }

                const hashElem = lastRow.querySelector(hashSelector);
                if (hashElem) {
                    const hashText = hashElem.innerText.trim();
                    if (/^[0-9a-fA-F]{64}$/.test(hashText)) {
                        hashHistory.unshift(hashText);
                        if (hashHistory.length > 50) hashHistory.pop();
                    }
                }

                updateMD5List();
                updateHashList();
            }
        }

        /* --- آمار 1.79 --- */
        if (currentValue < 1.80) consecutiveLow179++;
        else consecutiveLow179 = 0;

        /* --- به‌روزرسانی وضعیت‌ها --- */
        checkBettingCondition(bustHistory);
        getInformation();
        updateStatsTable();

        /* --- یادگیری تطبیقی --- */
        if (adaptiveLearningEnabled) {
            const isWin = (justCashedOut || currentValue >= intendedCashoutTarget);
            updateHourlyStats(isWin, currentValue);
            updateAdaptiveDisplay();
        }

        /* --- تاریخچه جلسه --- */
        sessionHistory.push({ time: Date.now(), value: currentValue });
        if (sessionHistory.length > 200) sessionHistory.shift();

        updateFormulaAnalysis();

        /* --- مدیریت مارتینگل در پایان --- */
        if (isBetActive) {
            const emergencyHit = emergencyModeActive && currentValue >= emergencyTargetMultiplier;
            const normalWin = justCashedOut || currentValue >= intendedCashoutTarget;

            if (normalWin || emergencyHit) {
                t_times--;
                counter++;
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

/* ------------------------------
   رویداد cashout
------------------------------ */
game_cash_out = (function () {
    return function (str) {
        f_game_cash_out.apply(this, arguments);
    };
}());
