import axios from "axios";

interface IAccessTokenReponse {
  access_token: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: AccessTokenReponse } = await axios.post<IAccessTokenReponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    return AccessTokenReponse.access_token;
  }
}

export { AuthenticateUserService };
