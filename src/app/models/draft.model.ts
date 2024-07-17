import { Player } from "./player.model";
import { Team } from "./team.model";

export interface Draft {
    players: Player[];
    teams: Team[];
    draftOrder: number[];
    
    
}