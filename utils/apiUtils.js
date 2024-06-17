// tests/pages/apiUtils.js
const axios = require('axios');
const FormData = require('form-data');

exports.ApiUtils = class ApiUtils {
  constructor(baseURL, cookie) {
    this.cookie = `${cookie[0].name}=${cookie[0].value}`; // cookie
    this.publisherId
    this.postId
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
  }

  async createPublisher(name, email) {
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    // console.log({ ...form.getHeaders()})
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

    const response = await this.client.post('/admin/api/resources/Post/actions/new', form, { headers: {...form.getHeaders(), 'Cookie':this.cookie }, withCredentials: true });
    this.postId =  response.data.record.id
    return response.data;
  }
};