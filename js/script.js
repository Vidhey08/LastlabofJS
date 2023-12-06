// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    let batteryPercentage = Math.round(battery.level * 100);
    chargeLevel.textContent = batteryPercentage + "%";
    chargeMeter.value = batteryPercentage;

    // Fetch and display image from RoboHash
    let imageUrl = `https://robohash.org/${batteryPercentage}.png`;
    let imageElement = document.querySelector('#batteryImage');
    if (!imageElement) {
        imageElement = document.createElement('img');
        imageElement.id = 'batteryImage';
        document.querySelector('#battery').appendChild(imageElement);
    }
    imageElement.src = imageUrl;
}

navigator.getBattery().then(battery => {
    console.log(battery);
    updateBatteryStatus(battery);
    battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));
    battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
});
