function test() {
    let ip = document.getElementById("ip").value;
    let mascara = document.getElementById("mascara").value;
    iparray = ip.split(".");
    maskarray = mascara.split(".")

    let netip = getNetIp(maskarray, iparray);
    document.getElementById("salida").innerHTML = "La ip de xarxa es: " + netip;

    document.getElementById("broadcast").innerHTML = "La ip de broadcast es: " + getBroadcastIp(maskarray, netip);
    
    document.getElementById("subnet").innerHTML = subneting(netip, maskarray);
}



function getNetIp(maskarray, iparray) {
    let netip = "";

    for (let i = 0; i < 4; i++) {
        netip += maskarray[i] & iparray[i]

        if (i < 3) netip += ".";
    }

    return netip;
}

function getBroadcastIp(maskarray, netip) {
    broadcastarray = netip.split(".")
    let broadcast = ""; 

    for (let i = 0; i < 4; i++) {
        let n = ~maskarray[i];
        n = ((n << 1) >>> 1) & 255;
        broadcast += n | broadcastarray[i]
        
        if (i < 3) broadcast += ".";
    }

    return broadcast;
}

function subneting(netip, maskarray) {
    newIpArray = netip.split(".");       
    newNetIp = ((newIpArray[0] << 23) * 2) + (newIpArray[1] << 16) + (newIpArray[2] << 8) + (newIpArray[3] * 1);   

    let nSubNets = document.getElementById("subredes").value;
    if (nSubNets < 2) return "";

    let bits = Math.ceil(Math.log2(nSubNets));
    let mask = ((maskarray[0] << 23) * 2) + (maskarray[1] << 16) + (maskarray[2] << 8) + (maskarray[3] * 1);

    newMaskArray = getNewMask(mask, bits);
    let nHosts = getHostNumber(newMaskArray);

    let exit = "";

    for (let i = 0; i < nSubNets; i++) {
        exit += "Subxarxa " + i + ":";
        exit += "<ul><li>Ip de Xarxa: " + getNetIp(newMaskArray, getNewNetIp(newNetIp).split(".")) + "</li>";
        exit += "<li>Ip de Broadcast: " + getBroadcastIp(newMaskArray, getNewNetIp(newNetIp)) + "</li>";
        exit += "</ul>";

        newNetIp += nHosts;
    }

    return exit;
}

function getHostNumber(maskarray) {
    let count = 0;
    let mask = 0 + ((maskarray[0] << 23) * 2) + (maskarray[1] << 16) + (maskarray[2] << 8) + (maskarray[3] * 1);

    console.log(Number(255) << 23)

    while (mask != 0 && count < 40) {
        mask = mask << 1;
        count++;
    }

    return Math.pow(2, 32 - count);
}

function getNewNetIp(newNetIp) {
    return (newNetIp >>> 24) + "." + ((newNetIp >>> 16) & 255) + "." + ((newNetIp >>> 8) & 255) + "." + (newNetIp & 255);
}

function getNewMask(mask, bits) {
    invertedmask = ~mask;

    let extrabits = 0;

    for (let i = 0; i < bits; i++) {
        extrabits = extrabits << 1;
        extrabits += 1;
    }

    while (extrabits < invertedmask) {
        extrabits = extrabits << 1;
    }

    extrabits = extrabits >>> 1;

    mask += extrabits;

    let result = (mask >>> 24) + "." + ((mask >>> 16) & 255) + "." + ((mask >>> 8) & 255) + "." + (mask & 255);

    return result.split(".");
}