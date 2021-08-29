import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Card } from "./Card.model";
import { Period } from "./Period.model";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  period_id: string;

  @Column()
  card_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Card, (card) => card.transactions)
  @JoinColumn({ name: "card_id" })
  card: Card;

  @ManyToOne(() => Period, (period) => period.transactions)
  @JoinColumn({ name: "period_id" })
  period: Period;
}
