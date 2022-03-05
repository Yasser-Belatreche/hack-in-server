import {v4 as generateRandomId} from 'uuid';

import {NonFunctionProperties} from './Student';

export interface IActivity {
  activityId: string;
  ownerId: string;
  title: string;
  desc: string;
  createdAt: string;
  info(): NonFunctionProperties<IActivity>;
}

interface Args {
  ownerId: string;
  title: string;
  desc: string;
}

class Activity implements IActivity {
  activityId: string;
  ownerId: string;
  title: string;
  desc: string;
  createdAt: string;

  constructor(args: Args) {
    this.activityId = generateRandomId();
    this.ownerId = args.ownerId;
    this.title = args.title;
    this.desc = args.desc;
    this.createdAt = new Date().toJSON();
  }

  info(): NonFunctionProperties<IActivity> {
    return {
      activityId: this.activityId,
      ownerId: this.ownerId,
      title: this.title,
      desc: this.desc,
      createdAt: this.createdAt,
    };
  }
}

export {Activity};
