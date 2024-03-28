const { CONFIG_PERMISSIONS } = require("../configs");
const fs = require("fs");
const BLACKLIST_FILE = "blacklist.json";
const dotenv = require("dotenv");
dotenv.config();

const validateRequiredInput = (data, arrRequired) => {
    const missingFields = arrRequired.filter(
        (field) => !JSON.stringify(data[field])
    );
    return missingFields;
};


const parseTimeToMilliseconds = (timeString) => {
    const timeUnit = timeString.slice(-1);
    const timeValue = parseInt(timeString.slice(0, -1), 10);

    switch (timeUnit) {
        case "d":
            return timeValue * 24 * 60 * 60 * 1000;
        case "h":
            return timeValue * 60 * 60 * 1000;
        case "m":
            return timeValue * 60 * 1000;
        case "s":
            return timeValue * 1000;
        default:
            return 0;
    }
};

const addToBlacklist = async (token) => {
    try {
        const blacklist = getBlacklist();
        blacklist.push({
            token,
            expiry:
                Date.now() + parseTimeToMilliseconds(process.env.ACCESS_TOKEN_EXPIRE),
        });

        await new Promise((resolve, reject) => {
            fs.writeFile(BLACKLIST_FILE, JSON.stringify(blacklist), "utf8", (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    } catch (error) {
        console.log("Error adding token to blacklist", error);
        throw error;
    }
};

const isAdminPermission = (permissions) => {
    if (permissions) {
        return permissions.includes(CONFIG_PERMISSIONS.ADMIN);
    }
    return false;
};

const validateDiscountDate = (discount, discountStartDate, discountEndDate) => {
    if (discount > 0) {
        if (!discountStartDate || !discountEndDate) {
            return {
                isValid: false,
                error: "Discount must have both start and end dates.",
            };
        }

        if (discountStartDate.getTime() < new Date().setHours(0, 0, 0, 0)) {
            return {
                isValid: false,
                error:
                    "Discount start date should be greater than or equal to the current date.",
            };
        }

        if (discountEndDate.getTime() <= discountStartDate.getTime()) {
            return {
                isValid: false,
                error: "Discount end date should be greater than the start date.",
            };
        }
    }

    return { isValid: true, error: null };
};

module.exports = {
    validateRequiredInput,

    addToBlacklist,
  
    isAdminPermission,
    validateDiscountDate,
};
