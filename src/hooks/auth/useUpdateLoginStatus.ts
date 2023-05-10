import React from 'react';
import { useDispatch } from 'react-redux';

import { userSliceActions } from '@features/user/userSlice';

import { LOCAL_KEY } from '@constants/local-key';
import { getLocalStorage } from '@utils/localStorage/helper';
import { deleteToken, getToken } from '@utils/localStorage/token';

export function useUpdateLoginStatus() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const isSaveLogin = getLocalStorage(LOCAL_KEY.IS_SAVE_LOGIN);
    if (!isSaveLogin || isSaveLogin === 'false') {
      deleteToken();
    }
    dispatch(userSliceActions.setIsLogin(!!getToken()?.access));
  }, [dispatch]);
}
