import axios from "axios";
import prismaClient from "../prisma";

interface IAccessTokenReponse {
  access_token: string;
}

interface IUserReponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
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

    const { id, login, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          name,
          avatar_url,
        },
      });
    }

    return response.data;
  }
}

export { AuthenticateUserService };
