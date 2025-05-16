require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');

const pathToPrivKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '2h';

  const payload = {
    sub: _id,
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

module.exports = {
  issueJWT,
};
