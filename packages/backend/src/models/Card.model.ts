import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction.model";

@Entity("cards")
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  image?: string;

  @Column()
  color: string;

  @Column()
  limit: number;

  @OneToMany(() => Transaction, (transaction) => transaction.card)
  transactions: Transaction[];
}
