
document.getElementById("maxC").style.display = "none";

function minConsole() {
    var consoleM = document.getElementById("console");
    var consoleTitle = document.getElementById("console-title");
    var consoleLogC = document.getElementById("console-log-container");
    var consoleLog = document.getElementById("console-log");
    var code = document.getElementById("code");

    consoleM.style.height = "3%";
    consoleM.style.display = "block";
    consoleTitle.style.height = "100%";
    consoleLogC.style.display = "none";
    consoleLog.style.display = "none";
    code.style.height = "92%";

    document.getElementById("minC").style.display = "none";
    document.getElementById("maxC").style.display = "inline-block";
}

function maxConsole() {
    var consoleM = document.getElementById("console");
    var consoleTitle = document.getElementById("console-title");
    var consoleLogC = document.getElementById("console-log-container");
    var consoleLog = document.getElementById("console-log");
    var code = document.getElementById("code");

    consoleM.style.height = "30%";
    consoleM.style.display = "grid";
    consoleTitle.style.height = "100%";
    consoleLogC.style.display = "block";
    consoleLog.style.display = "block";
    code.style.height = "65%";

    document.getElementById("minC").style.display = "inline-block";
    document.getElementById("maxC").style.display = "none";
}