import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function SSRAuth<T>(fn: GetServerSideProps<T>, options?: any) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["dash.money.auth"];

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (e) {
      console.log(e);

      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  };
}
