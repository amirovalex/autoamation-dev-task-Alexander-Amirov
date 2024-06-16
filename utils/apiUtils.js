// tests/pages/apiUtils.js
const axios = require('axios');
const FormData = require('form-data');

exports.ApiUtils = class ApiUtils {
  constructor(baseURL, cookie) {
    this.cookie = `${cookie[0].name}=${cookie[0].value}`; // cookie
    this.publisherId
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
  }

  async login(cookie) {
    console.log(cookie)
    // const response = await this.client.post('/admin/login', { email: email, password: password }, {withCredentials: true});
    // console.log('login credentials: ',email, password)
    // console.log('email length: ',email.length)
    // console.log('email typeof: ', typeof email)
    // console.log('password length: ', typeof password)
    // console.log('password length: ',password.length)
    // console.log('login response: ',response)
    // console.log('response.headers: ',response.headers['set-cookie'])
    // this.cookie = await response.headers['set-cookie'][0].split(';')[0];
    // return this.cookie;
  }

//   async createPublisherInsomnia(name, email) {
//     const options = {
//         method: 'POST',
//         url: 'http://localhost:3000/admin/api/resources/Publisher/actions/new',
//         headers: {
//           cookie: 'adminjs=s%253Aa25d37Zr3Bhlkm3JK8uxoohIjd0SJY6V.OP3xq1WJroLmfkzjIyh04Wl%252F4Ay3%252FHEdzsnyaXN4A%252FM',
//           'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
//           'User-Agent': 'insomnia/9.2.0'
//         },
//         data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="name"\r\n\r\nTest Publisher 2\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="email"\r\n\r\ntestemail2@example.com\r\n-----011000010111000001101001--\r\n'
//       };
      
//       const response = await axios.request(options)
//       console.log(response.data)
//   }

  async createPublisher(name, email) {
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    console.log('form: ',form)
    // console.log({ ...form.getHeaders()})
    console.log(typeof this.cookie)
    console.log(this.cookie)
    console.log(form.getHeaders())
    const response = await this.client.post('/admin/api/resources/Publisher/actions/new', form, { headers: {...form.getHeaders(), 'Cookie':this.cookie }, withCredentials: true });
    // console.log('response.data: ',response)
    this.publisherId = response.data.record.id
    return response.data;
  }

  async createPost({ title, content, someJsonNumber, someJsonString, someJsonBoolean, status, published }) { 
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('someJson.0.number', someJsonNumber);
    form.append('someJson.0.string', someJsonString);
    form.append('someJson.0.boolean', someJsonBoolean);
    form.append('status', status);
    form.append('published', published);
    form.append('publisher', this.publisherId);
    console.log(this.cookie)

    const response = await this.client.post('/admin/api/resources/Post/actions/new', form, { headers: {...form.getHeaders(), 'Cookie':this.cookie }, withCredentials: true });
    return response.data;
  }
};