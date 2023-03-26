import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { createGlobalStyle } from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GlobalStyle = createGlobalStyle(({ theme }: { theme: any }) => ({
  html: { backgroundColor: theme.sanity.color.base.bg },
}));

const Index = () => (
  <>
    <Head>
      <NextStudioHead favicons={false} />
    </Head>

    <NextStudio config={config}>
      <StudioProvider config={config}>
        <GlobalStyle />
        <StudioLayout />
      </StudioProvider>
    </NextStudio>
  </>
);

export default Index;
