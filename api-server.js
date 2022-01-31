const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
var ManagementClient = require('auth0').ManagementClient;

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

var auth0 = new ManagementClient({
  domain: authConfig.domain,
  clientId: authConfig.backendClientId,
  clientSecret: authConfig.backendClientSecret,
  scope: 'read:users update:users',
});


app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, async (req, res) => {
  if (!req.user.sub) {
    res.sendStatus(401)
  }

  let updatedUser = await auth0.updateUser({
    id: req.user.sub
  },
  {
    app_metadata:{
      "mayo": "is superior to miracle whip"
    },
    user_metadata:{
      "likes":"mayo"
    }
  })
  res.send({
    msg: "Updated user successfully!",
    user: updatedUser,
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
