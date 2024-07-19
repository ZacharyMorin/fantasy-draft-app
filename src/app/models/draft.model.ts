import { Team } from "./team.model";

export interface Draft {
    teams: Team[];
    draftOrder: { teamID: number | null; teamName: string | null }[];
}