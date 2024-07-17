import { Player } from "./player.model";

export interface Team {
  id: number | null;
  name: string | null;
  belongsToCurrentUser: boolean;
  players: Player[];
}
