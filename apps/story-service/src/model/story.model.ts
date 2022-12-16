import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IStory } from '@app/interfaces';

@Entity()
export class Story implements IStory {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: string;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    content: string;

    @Column({
        nullable: false
    })
    userId: string;

    @Column({
        type: 'date',
        default: new Date()
    })
    createdAt: Date;
}
