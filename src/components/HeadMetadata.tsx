import Head from "next/head";
import { useRouter } from "next/router";

type HeadMetaDataProps = {
  pageTitle?: string;
};

const HeadMetaData = ({ pageTitle }: HeadMetaDataProps) => {
  const router = useRouter();
  const title = pageTitle ? `${pageTitle}` : "Better call paul";
  const ogUrl = router.pathname ? `${router.pathname}` : "";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Better call paul, One touch for all service"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />

        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Better call paul, One touch for all service"
        />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.svg" />
      </Head>
    </>
  );
};

export default HeadMetaData;
