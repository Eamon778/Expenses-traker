const testData = (req, res) => {
    res.status(200).json({ message: 'Test data' });
}

module.exports = { testData };