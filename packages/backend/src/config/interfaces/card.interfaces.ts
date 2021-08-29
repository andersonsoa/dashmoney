export interface ICard {
  id: string;
  title: string;
}

export type ITagData = Omit<ICard, "id">;
