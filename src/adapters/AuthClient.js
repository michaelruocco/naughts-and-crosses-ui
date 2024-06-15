import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

class AuthClient {
  constructor() {
    this.cognito = new CognitoIdentityProviderClient({
      region: APP_COGNITO_REGION_NAME,
      endpoint: APP_COGNITO_ENDPOINT_URL,
      accessKeyId: APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: APP_AWS_SECRET_ACCESS_KEY,
    });
  }

  async signIn(username, password) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: APP_COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
    const command = new InitiateAuthCommand(params);
    return await this.cognito.send(command);
  }
}

export default AuthClient;
