import { IStory } from '@app/interfaces';

export type Create = Omit<IStory, 'id' | 'createdAt'>;
