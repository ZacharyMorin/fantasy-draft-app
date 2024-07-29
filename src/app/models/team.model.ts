import { Player } from "./player.model";

export interface Team {
  id: number;
  name: string;
  belongsToCurrentUser: boolean;
  players: Player[];
}
