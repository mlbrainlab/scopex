module.exports = function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send('API is working!');
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
