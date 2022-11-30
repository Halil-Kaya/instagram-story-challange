import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IStory} from "@app/interfaces";

@Entity()
export class Story implements IStory {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    content: string;

    @Column({
        type: 'date',
        default: new Date()
    })
    createdAt: Date;
}