import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Period } from "./Period.model";
import { Transaction } from "./Transaction.model";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Period, (period) => period.user_id)
  periods: Period[];
}
