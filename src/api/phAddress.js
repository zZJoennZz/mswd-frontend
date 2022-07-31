const allBarangay = require('./barangay.json');

const fetch = () => {
    return allBarangay;
}

export const barangays = async (code = "0314") => {
    try {
        const brgy = fetch();
        return brgy.filter(barangay => barangay.city_code === code).map((filtered) => {
            return {
                brgy_code: filtered.brgy_code,
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
