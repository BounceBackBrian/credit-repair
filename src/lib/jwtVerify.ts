import jwt, { JwtHeader } from "jsonwebtoken";
import type { Algorithm } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

type VerifyOptions = {
  issuer: string;
  audience: string;
  jwksUri?: string; // if using JWKS
  sharedSecret?: string; // if using HS256
};

const opts: VerifyOptions = {
  issuer: process.env.MFSN_ISSUER || "",
  audience: process.env.MFSN_AUDIENCE || "",
  jwksUri: process.env.MFSN_JWKS_URL,
  sharedSecret: process.env.MFSN_JWT_SECRET,
};

const client = opts.jwksUri
  ? jwksClient({
      jwksUri: opts.jwksUri,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
    })
  : null;

function getKey(header: JwtHeader, cb: (err: any, key?: string) => void) {
  if (!client) return cb(new Error("JWKS not configured"));
  if (!header.kid) return cb(new Error("Missing kid"));
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return cb(err);
    if (!key) return cb(new Error("Signing key not found"));
    const pub = key.getPublicKey();
    return cb(null, pub);
  });
}

export async function verifyMfsnJwt(token: string): Promise<any> {
  const algorithms: Algorithm[] = opts.sharedSecret
    ? ["HS256"]
    : ["RS256", "ES256"];

  return new Promise((resolve, reject) => {
    const verifyKey: any = opts.sharedSecret
      ? opts.sharedSecret
      : (header: JwtHeader, cb: (err: any, key?: string) => void) => getKey(header, cb);

    jwt.verify(
      token,
      verifyKey,
      {
        issuer: opts.issuer || undefined,
        audience: opts.audience || undefined,
        algorithms,
        clockTolerance: 5,
      },
      (err: any, decoded: any) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
}
