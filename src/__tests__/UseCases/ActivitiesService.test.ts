import {ActivitiesServiceFacade} from '../../UseCases/ActivitiesService/ActivitiesService';
import {AuthServiceFacade} from '../../UseCases/AuthService/AuthServiceFacade';
import {FakeActivitiesGateway} from '../__fakes__/Persistence/FakeActivitiesGateway';
import {FakeActivitiesJoiningRequestsGateway} from '../__fakes__/Persistence/FakeActivitiesJoiningRequestsGateway';
import {FakeStudentsGateway} from '../__fakes__/Persistence/FakeStudentsGateway';

describe('ActivitiesService', () => {
  const studentsGateway = new FakeStudentsGateway();
  const activitiesGateway = new FakeActivitiesGateway();
  const activitiesJoiningRequestsGateway =
    new FakeActivitiesJoiningRequestsGateway();
  const authService = new AuthServiceFacade(studentsGateway);
  const activitiesService = new ActivitiesServiceFacade(
    activitiesGateway,
    activitiesJoiningRequestsGateway,
    studentsGateway,
  );

  let authToken: string;

  beforeAll(async () => {
    authToken = await authService.register({
      name: 'John',
      email: 'email@gmail.com',
      password: 'myPassword',
      sex: 'male',
    });
  });

  beforeEach(() => {
    studentsGateway.deleteAll();
    activitiesGateway.deleteAll();
    activitiesJoiningRequestsGateway.deleteAll();
  });

  it('should add an activity, and get it', async () => {
    const activityInfo = {
      title: 'My Activity',
      desc: 'some desc hahahaha',
    };
    await activitiesService.addActivity({authToken, ...activityInfo});

    const activitiesList = await activitiesService.getActivities(authToken);
    expect(activitiesList.length).toEqual(1);
    expect(activitiesList[0].title).toEqual(activityInfo.title);
    expect(activitiesList[0].desc).toEqual(activityInfo.desc);
  });

  it('should get all the last activites', async () => {
    for (let i = 0; i < 5; i++) {
      await activitiesService.addActivity({
        authToken,
        title: `${i}`,
        desc: `${i}`,
      });
    }

    const activitiesList = await activitiesService.getActivities(authToken);
    for (let i = 4; i <= 0; i--) {
      expect(activitiesList[i].title).toEqual(i);
    }
  });

  it('should not be able to add or get activities using an a wrong token', async () => {
    await expect(
      activitiesService.addActivity({
        authToken: 'wrongToken',
        title: 'Title',
        desc: 'some desc',
      }),
    ).rejects.toBeTruthy();

    await expect(
      activitiesService.getActivities('wrongToken'),
    ).rejects.toBeTruthy();
  });

  it('should send a join activity request to the target user, and be able to accept it, or decline it', async () => {
    const {activityId} = await activitiesService.addActivity({
      authToken,
      title: 'title',
      desc: 'desc',
    });
    const antherToken = await authService.register({
      email: 'example@gmail.com',
      name: 'Smith',
      password: 'somePassword',
      sex: 'female',
    });

    const request = await activitiesService.sendActivityJoinRequest({
      activityId,
      authToken: antherToken,
    });
    const activitiesJoinRequests =
      await activitiesService.getActivityJoinRequests(authToken);

    expect(activitiesJoinRequests[0].request.activityId).toEqual(activityId);
    expect(activitiesJoinRequests[0].sender?.name).toEqual('Smith');

    await activitiesService.responseToJoiningRequest({
      authToken,
      requestId: request.requestId,
      response: 'accept',
    });
    const updatedRequests = await activitiesService.getActivityJoinRequests(
      authToken,
    );

    expect(updatedRequests[0].request.status).toEqual('accepted');

    await activitiesService.responseToJoiningRequest({
      authToken,
      requestId: request.requestId,
      response: 'decline',
    });
    const updatedRequests2 = await activitiesService.getActivityJoinRequests(
      authToken,
    );

    expect(updatedRequests2[0].request.status).toEqual('declined');
  });
});
