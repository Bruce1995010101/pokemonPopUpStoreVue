import { useUserInfo } from "~/stores/userInfo";

export const useAuth = () => {
    const userInfo = useUserInfo();

    // 🔹 取得當前使用者
    const checkUserAuthority = async () => {
        const result = await useAsyncData(
            "checkUserAuthority",
            async () => {
                return await $fetch("http://localhost:3000/checkUserAuthority", {
                    credentials: "include",
                });
            }
        );
        // console.log('useAuth',result.data.value);
        if (result.data.value.accountAuthority !== undefined) {
            console.log('useAuthTrue',result.data.value);
            userInfo.changeUser(result.data.value)
            return true;
        }else{
            return false
        }
    };

    return { checkUserAuthority };
};
