export interface createWorkspaceDTO {
    userId: number,
    workspace: string,
    target_company: string,
    target_role: string,
    years_of_experience: number,
}



export interface createWorkspaceSubjectWiseDTO {
    workspace: string,
    target_company: string,
    target_role: string,
    years_of_experience: number,
    userId: number,
    subject: string
}