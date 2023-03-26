/**
 * All the shared stuff that goes into <head> on page routes, can be be imported
 * by `head.tsx` files in the /app dir or wrapped in a <Head> component in the
 * /pages dir.
 */

const Meta = () => (
  <>
    <meta content="width=device-width,initial-scale=1.0" name="viewport" />
    <link href="/favicon/site.webmanifest" rel="manifest" />
    <link href="/favicon/favicon.ico" rel="shortcut icon" />
    <meta content="#000" name="theme-color" />
  </>
);
export default Meta;
