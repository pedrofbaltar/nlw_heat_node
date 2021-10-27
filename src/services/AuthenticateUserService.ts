import axios from "axios";

interface IAccessTokenReponse {
  access_token: string;
}

interface IUserReponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
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

    const response = await axios.get<IUserReponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${AccessTokenReponse.access_token}`,
        },
      }
    );

    return response.data;
  }
}

export { AuthenticateUserService };
