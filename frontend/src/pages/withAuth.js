import { checkAuth } from '@/apiRequests/authentication/checkAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const withAuth = (WrappedComponent) => {
  const WithAuthWrapper = (props) => {

    const router = useRouter();

    useEffect(() => {
      const getCheckAuthResponse = async () => {
        // Get encrypted email and password from local storage
        const encryptedEmail = localStorage.getItem('email');
        const encryptedPassword = localStorage.getItem('password');

        // Decrypt email and password using AES decryption
        const secretKey = 'your-secret-key'; // Replace this with your actual secret key

        try {

          const decryptedEmailBytes = CryptoJS.AES.decrypt(encryptedEmail, 'email');
          const decryptedEmail = decryptedEmailBytes.toString(CryptoJS.enc.Utf8);
          const decryptedPasswordBytes = CryptoJS.AES.decrypt(encryptedPassword, 'password');
          const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);

          if (!decryptedEmail || !decryptedPassword) {
            router.replace('/');
          } else {
            const data = await checkAuth({ email: decryptedEmail, password: decryptedPassword });
            console.log('-- CHECK AUTH --')
            console.log(data)

            if (!data[1].data) {
              router.replace('/');
            }
          }

        } catch {
          router.replace('/');
        }
      };

      getCheckAuthResponse();
    }, []);

    return <WrappedComponent {...props} />;
  };

  WithAuthWrapper.displayName = 'WithAuthWrapper';
  return WithAuthWrapper;
};

export default withAuth;