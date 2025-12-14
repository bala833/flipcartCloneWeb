import React, { createContext, useState } from 'react';

// creating Context for Auth
export const AuthContext = createContext();

// creating Auth Provider for Auth
export const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState('');
    const [userName, setUserName] = useState('');
    const [loggedOut, setLoggedOut] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(false);
    const [authDetail, setAuthDetail] = useState(null);
    const [loginAuth, setLoginAuth] = useState(authDetail);
    const [isForceReset, setIsForceReset] = useState(authDetail);
    const [defaultPage, setDefaultPage] = useState(null);
    const [showOTPComponent, setShowOTPComponent] = useState(false);
    const [refreshTime, setRefreshTime] = useState(840000);

console.log(authToken, 'authToken')
    const handleLogout = async (history) => {
        if (authToken) {
            history.push('/');
            setDefaultPage('/');
            setAuthToken(null);
            setAuthDetail(null);
            setLoginAuth(null);
            setShowOTPComponent(false);
            // await logout();
        }
        setAuthToken(null);
    };
    function redirectToLogin() {
        setAuthToken(null);
        setAuthDetail(null);
        setLoggedOut(true);
        setDefaultPage('/');
        setLoggedOut(false);
        setLoginAuth(null);
        setUserName(null);
        setShowOTPComponent(false);
    }
    // const handleSessionTimeout = async () => {
    //     if (!loggedOut) {
    //         toast.error('Your session has expired, please login to continue.');
    //         setTimeout(async () => {
    //             setAuthDetail(null);
    //             setLoginAuth(null);
    //             setAuthToken(null);
    //             setDefaultPage('/');
    //             // setSessionTimeout(true);
    //             setLoggedOut(true);
    //             setTableEdited(false);
    //             setTemplateFormChanged(false);
    //             await logout();
    //         }, 1000);
    //     }
    // };

    // const loginAuthentication = async (payload) => {
    //     const response = await authenticate(payload);
    //     if (response?.data && response?.status === 200) {
    //         setSessionTimeout(false);
    //         setLoggedOut(false);
    //         // setIsForceReset(JSON.stringify(response.data));
    //         // setUserName(response?.data.username);
    //         // setShowOTPComponent(true);
    //         return 'success';
    //     }

    //     return response?.data;
    // };

    // const verifyOTP = async (otp) => {
    //     const params = new URLSearchParams();
    //     params.append('username', userName);
    //     params.append('otp', otp);

    //     const response = await validateOTP(params);
    //     if (response?.data && response.status === 200) {
    //         return 'OTP Authenticated';
    //     }
    //     if (response?.data && response.status === 401) {
    //         if (response.data?.locked) {
    //             return 'Locked';
    //         }
    //         return 'Invalid OTP';
    //     }
    //     return response;
    // };

    const returnToLogin = () => {
        setDefaultPage('/');
        setAuthToken(null);
        setAuthDetail(null);
        setLoginAuth(null);
        setShowOTPComponent(false);
    };

    // const handleChangePassword = async (
    //     currentpassword,
    //     newpassword,
    //     confirmnewpassword
    // ) => {
    //     const localdata = authDetail;
    //     const emailaddress = localdata?.username;
    //     const payload = {
    //         confirmnewpassword,
    //         newpassword,
    //         emailaddress,
    //         currentpassword
    //     };
    //     const response = await changePassword(payload);
    //     if (response?.data && response?.status === 200) {
    //         return 'Successful';
    //     }
    //     return response?.data.message;
    // };

    // const handleResetExpirePassword = async (
    //     newpassword,
    //     confirmnewpassword
    // ) => {
    //     const localdata = authDetail;
    //     const emailaddress = localdata?.username;

    //     const payload = {
    //         confirmnewpassword,
    //         newpassword,
    //         emailaddress
    //     };

    //     const response = await resetPasswordOnExpire(payload);

    //     if (response?.data && response?.status === 200) {
    //         return 'Successful';
    //     }
    //     return response?.data?.message;
    // };

    // const handleResendOTP = async (email, token) => {
    //     const response = await resendOTP(email, token);
    //     return response;
    // };

    return (
        <AuthContext.Provider
            value={{
                loginAuth,
                setLoginAuth,
                userName,
                // handleChangePassword,
                loggedOut,
                sessionTimeout,
                // loginAuthentication,
                // verifyOTP,
                returnToLogin,
                handleLogout,
                setSessionTimeout,
                setLoggedOut,
                // handleResetExpirePassword,
                // handleResendOTP,
                authToken,
                setAuthToken,
                authDetail,
                setAuthDetail,
                // menuDetail,
                // setMenuDetail,
                defaultPage,
                setDefaultPage,
                setUserName,
                // showFlyoutContainer,
                // setShowFlyoutContainer,
                // handleFlyoutContainer,
                // handleSessionTimeout,
                // showOTPComponent,
                // setShowOTPComponent,
                // setIsForceReset,
                // isForceReset,
                // setRefreshTime,
                // refreshTime,
                // uuidValidate,
                // setUuidValidate,
                // fadedBackground,
                // setFadedBackground,
                // staticHomeLayout,
                // setStaticHomeLayout,
                // flyoutFormUpdated,
                // setFlyoutFormUpdated,
                // redirectToLogin,
                // selectedMerchant,
                // setSelectedMerchant,
                // selectedIREMerchant,
                // setSelectedIREMerchant,
                // selectedIREDisplay,
                // setSelectedIREDisplay,
                // showEdit,
                // setShowEdit,
                // tableEdited,
                // setTableEdited,
                // discardChange,
                // setDiscardChange,
                // addClick,
                // setAddClick,
                // setIsRefreshTransaction,
                // isRefreshTransaction,
                // faviconURL,
                // setFaviconURL,
                // roleHeaders,
                // setRoleHeaders,
                // addBtn,
                // setAddBtn,
                // cancelButton,
                // setCancelButton,
                // clickedNo,
                // setClickedNo,
                // showToggleOnClickEditRole,
                // setShowToggleOnClickEditRole,
                // noRoleDataFromMerchant,
                // setNoRoleDataFromMerchant,
                // addButtonEnable,
                // setAddButtonEnable,
                // apexxDefaultPayload,
                // setapexxDefaultPayload,
                // rolePrivPayload,
                // setRolePrivPayload,
                // showNotificationAlert,
                // setShowNotificationAlert,
                // message,
                // setMessage,
                // hasErrors,
                // setHasErrors,
                // selectedEmailTemplate,
                // setSelectedEmailTemplate,
                // roleManagementUrlChange,
                // setRoleManagementUrlChange,
                // holdComponentRedirect,
                // setholdComponentRedirect,
                // templateInfo,
                // setTemplateInfo,
                // paymentTemplateInfo,
                // setPaymentTemplateInfo,
                // templateFormChanged,
                // setTemplateFormChanged,
                // templateFormUrlChange,
                // setTemplateFormUrlChange,
                // paymentFormChanged,
                // setPaymentFormChanged,
                // errors,
                // setErrors,
                // selectedParty,
                // setSelectedParty,
                // fieldMapFormChanged,
                // setFieldMapFormChanged,
                // fieldMapFormUrlChange,
                // setFieldMapFormUrlChange,
                // customFieldFormChanged,
                // setCustomFieldFormChanged,
                // customFieldFormUrlChange,
                // setCustomFieldFormUrlChange,
                // showModalConfirmOnVT,
                // setShowModalConfirmOnVT,
                // VTToken,
                // setVTToken,
                // showHover,
                // setShowHover,
                // selectedCustomFields,
                // setSelectedCustomFields
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
