import { CheckRepository } from "@/server/modules/check/check.repository";

export const CheckService = {
    async checkIsTheoryInterviewCompleted(workspaceId: string) {
        return CheckRepository.checkIsTheoryInterviewCompleted(workspaceId);
    },

    async checkIsCodingInterviewCompleted(workspaceId: string) {
        return CheckRepository.checkIsCodingInterviewCompleted(workspaceId)
    }
}