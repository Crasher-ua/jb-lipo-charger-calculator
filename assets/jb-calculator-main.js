angular.module('app', []).controller('calculatorController', [function() {
    const vm = this;
    Object.assign(vm, {
        batteryMah: 1500,
        batterySRating: 4,
        batteryVoltage: 4.2,
        chargerWattRating: 50,
        chargerAmpRating: 8,
        supplyOutput: 24,
        supplyWattRating: 400,
        supplyAmpRating: 30,
        supplyEfficiencyRating: 0.85,

        getBatteryMaxVoltage,
        getSupplyWattsNeeded,
        getSupplyMaxChargingAmps,
        getCRate,
        getSupplyLimitingLabel,
        getMaxChargingOutputWatt,
        getMaxChargingOutputAmps,
        getMaxChargingOutputCRate,
        getSupplyVoltageLimitingLabel,
        getMaxChargingAmps,
        getMaxChargeRate,
        getFastestChargeAmps,
        getFastestChargeCRate,
        getChargingTime
    });

    function roundToHundreds(value) {
        return Math.round(value * 100) / 100;
    }

    function getBatteryMaxVoltage() {
        return vm.batterySRating * vm.batteryVoltage;
    }

    function getSupplyWattsNeeded() {
        return roundToHundreds(getSupplyWattsNeededRaw());
    }

    function getSupplyWattsNeededRaw() {
        return vm.supplyAmpRating * vm.supplyOutput / vm.supplyEfficiencyRating;
    }

    function getSupplyMaxChargingAmps() {
        return roundToHundreds(getSupplyMaxChargingAmpsRaw());
    }

    function getSupplyMaxChargingAmpsRaw() {
        return vm.chargerWattRating * vm.supplyEfficiencyRating / getBatteryMaxVoltage();
    }

    function getCRate() {
        return roundToHundreds(getSupplyMaxChargingAmpsRaw() / vm.batteryMah * 1000);
    }

    function getSupplyLimitingLabel() {
        const isSupplyLimiting = getSupplyWattsNeededRaw() < vm.supplyWattRating
            || getSupplyMaxChargingAmpsRaw() < vm.chargerAmpRating;

        return isSupplyLimiting ? 'YES' : 'NO';
    }

    function getMaxChargingOutputWatt() {
        return roundToHundreds(getMaxChargingOutputWattRaw());
    }

    function getMaxChargingOutputWattRaw() {
        return vm.supplyOutput * vm.supplyAmpRating * vm.supplyEfficiencyRating;
    }

    function getMaxChargingOutputAmps() {
        return roundToHundreds(getMaxChargingOutputAmpsRaw());
    }

    function getMaxChargingOutputAmpsRaw() {
        return getMaxChargingOutputWattRaw() / getBatteryMaxVoltage();
    }

    function getMaxChargingOutputCRate() {
        return roundToHundreds(getMaxChargingOutputAmpsRaw() / vm.batteryMah * 1000);
    }

    function getSupplyVoltageLimitingLabel() {
        const isSupplyVoltageLimiting = getMaxChargingOutputWattRaw() < vm.supplyWattRating
            || getMaxChargingOutputAmpsRaw() < vm.chargerAmpRating;

        return isSupplyVoltageLimiting ? 'YES' : 'NO';
    }

    function getMaxChargingAmps() {
        return roundToHundreds(getMaxChargingAmpsRaw());
    }

    function getMaxChargingAmpsRaw() {
        return vm.chargerWattRating / getBatteryMaxVoltage();
    }

    function getMaxChargeRate() {
        return roundToHundreds(getMaxChargingAmpsRaw() / vm.batteryMah * 1000);
    }

    function getFastestChargeAmps() {
        return roundToHundreds(getFastestChargeAmpsRaw());
    }

    function getFastestChargeAmpsRaw() {
        return Math.min(getMaxChargingAmpsRaw(), getMaxChargingOutputAmpsRaw(), getSupplyMaxChargingAmpsRaw(), vm.chargerAmpRating);
    }

    function getFastestChargeCRate() {
        return roundToHundreds(getFastestChargeCRateRaw());
    }

    function getFastestChargeCRateRaw() {
        return getFastestChargeAmpsRaw() / vm.batteryMah * 1000;
    }

    function getChargingTime() {
        return roundToHundreds(60 / getFastestChargeCRateRaw());
    }
}]);
