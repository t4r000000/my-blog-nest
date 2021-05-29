import request, { Response } from 'request';

type tokenExchangeResult = {
  access_token: string;
  expires_in: string;
  id_token: string;
  scope: string;
  token_type: string;
  refresh_token: string;
};

const tokenExchange = (
  grant_type: string,
  code: string,
  code_verifier: string,
  redirect_uri: string,
  client_id: string,
): Promise<tokenExchangeResult> => {
  return new Promise((resolve, reject) => {
    if (!process.env.TOKEN_ENDPOINT) {
      reject(new Error('環境変数:TOKEN_ENDPOINTが設定されていません'));
      return;
    }
    if (!process.env.OIDC_CLIENT_SECRET) {
      reject(new Error('環境変数:OIDC_CLIENT_SECRETが設定されていません'));
      return;
    }
    const options = {
      url: `${process.env.TOKEN_ENDPOINT}/token`,
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      form: {
        grant_type: grant_type,
        code: code,
        code_verifier: code_verifier,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: process.env.OIDC_CLIENT_SECRET,
      },
    };
    request(
      options,
      (err: Error, response: Response, body: tokenExchangeResult) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
        return;
      },
    );
  });
};

export default tokenExchange;
