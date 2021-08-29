import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./Transaction.model";
import { User } from "./User.model";

@Entity("periods")
export class Period {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  payed: number;

  @Column({ nullable: true })
  payed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ name: "user_id" })
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.period)
  transactions: Transaction[];
}
