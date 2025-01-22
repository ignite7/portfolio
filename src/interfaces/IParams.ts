import IProject from 'app/interfaces/IProject';

interface IParams {
  params: Promise<{ id: IProject['id'] }>;
}

export default IParams;
