import { NavigationWithParams } from "@open-cells/core/types";
//@ts-ignore
export function interceptor(navigation: NavigationWithParams, ctx) {
  let intercept = false;
  let redirect;

  // Recuperar el valor de autenticación desde localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated && navigation?.to?.page !== 'login') {
    intercept = true;
    redirect = {page: 'login',  params: {}};
  }

  return { intercept, redirect };
}
