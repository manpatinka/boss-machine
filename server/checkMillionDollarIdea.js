const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
    if (numWeeks * weeklyRevenue >= 1000000000) {
        return true;
    } else {
        return false;
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
