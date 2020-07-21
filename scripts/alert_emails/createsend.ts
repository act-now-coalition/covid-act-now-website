import axios from 'axios';

class CreateSend {
  req: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('The createsend API key is invalid.');
    }

    this.req = axios.create({
      baseURL: '',
      auth: {
        username: apiKey,
        password: '',
      },
    });
  }

  sendClassicEmail() {}
}

export default CreateSend;
