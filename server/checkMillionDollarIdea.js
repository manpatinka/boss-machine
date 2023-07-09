const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalYield = numWeeks * weeklyRevenue;
    if ((totalYield >= 1000000) && String(numWeeks) && String(weeklyRevenue)) {
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
