const jwt = require('jsonwebtoken');
const SECRET = 'sorteLab_secret';

function verificarToken(req, res, next) {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não enviado' });
    }

    try {
        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, SECRET);

        req.usuario = decoded;

        next();

    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido' });
    }

}

module.exports = verificarToken;