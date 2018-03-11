import {post} from './axios';

export default function logger(message) {
  return post('/api/log', {
    timestamp: new Date(),
    message
  });
}