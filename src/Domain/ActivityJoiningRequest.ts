import {v4 as generateRandomId} from 'uuid';
import {NonFunctionProperties} from './Student';

export interface IActivityJoiningRequest {
  requestId: string;
  activityId: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined';
  info(): NonFunctionProperties<IActivityJoiningRequest>;
}

class ActivityJoiningRequest implements IActivityJoiningRequest {
  requestId: string;
  activityId: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';

  constructor(activityId: string, senderId: string, receiverId: string) {
    this.requestId = generateRandomId();
    this.activityId = activityId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.status = 'pending';
    this.createdAt = new Date().toJSON();
  }

  info(): NonFunctionProperties<IActivityJoiningRequest> {
    return {
      activityId: this.activityId,
      senderId: this.senderId,
      receiverId: this.receiverId,
      createdAt: this.createdAt,
      requestId: this.requestId,
      status: this.status,
    };
  }
}

export {ActivityJoiningRequest};
