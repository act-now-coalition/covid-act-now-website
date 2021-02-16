// hack to easily replace useParams which isn't available with next.js
import { useRouter } from 'next/router';

export default function useParams<T>() {
  const router = useRouter();
  // FIXME: these are string | string[] types, need a better way to deal with
  // than just coercing to string
  return router.query as { [index: string]: string };
}
