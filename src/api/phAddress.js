const allRegion = require('./region.json');
const allProvince = require('./province.json');
const allCity = require('./city.json');
const allBarangay = require('./barangay.json');

const fetch = (jsonName) => {
    switch (jsonName) {
        case "region":
            return allRegion;

        case "province":
            return allProvince

        case "city":
            return allCity;

        case "barangay":
            return allBarangay;

        default:
            break;
    }
}

const regions = () => {
    try {
        const regs = fetch("region");
        return regs.map((region) => {
            return {
                id: region.id,
                psgc_code: region.psgc_code,
                region_name: region.region_name,
                region_code: region.region_code,
            }
        })
    } catch (error) {
        return error;
    }
}

const barangays = async (code = "0314") => {
    try {
        const brgy = fetch("barangay");
        return brgy.filter(barangay => barangay.city_code === code).map((filtered) => {
            return {
                id: filtered.brgy_code,
                brgy_name: filtered.brgy_name,
                city_code: filtered.city_code,
                province_code: filtered.province_code,
                region_code: filtered.region_code
            }
        })
    } catch (error) {
        return error;
    }
}

module.exports = { regions, barangays };