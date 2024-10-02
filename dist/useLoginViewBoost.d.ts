interface UseLoginViewBoostProps {
    onSuccess: (code: string) => void;
    onFailed: (error: string) => void;
}
declare const useLoginViewBoost: ({ onSuccess, onFailed }: UseLoginViewBoostProps) => {
    login: ({ redirectUrl, clientKey, scope, }: {
        redirectUrl: string;
        clientKey: string;
        scope: string;
    }) => void;
};
export default useLoginViewBoost;
