import IProject from 'app/interfaces/IProject';

type FormType = Omit<IProject, 'id'>;

export default FormType;
